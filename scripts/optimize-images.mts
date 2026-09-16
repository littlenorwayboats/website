import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import {
  optimizedVariantPath,
  widthsForSource,
  type ImageManifest,
  type ImageManifestEntry,
} from "../src/lib/image-paths";

const CACHE_VERSION = 1;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 50;
const SOURCE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const optimizedDir = path.join(publicDir, "optimized");
const cachePath = path.join(rootDir, ".image-cache.json");
const manifestPath = path.join(rootDir, "src/lib/image-manifest.json");

type CacheEntry = {
  hash: string;
  widths: number[];
};

type CacheFile = {
  version: number;
  entries: Record<string, CacheEntry>;
};

async function main() {
  const sources = await findSourceImages(publicDir);
  const cache = await readCache();
  const nextCache: CacheFile = { version: CACHE_VERSION, entries: {} };
  const manifest: ImageManifest = {};
  const expectedOutputs = new Set<string>();
  let optimized = 0;
  let skipped = 0;

  for (const absPath of sources) {
    const src = toPublicUrl(absPath);
    const bytes = await fs.readFile(absPath);
    const image = sharp(bytes, { failOn: "none" });
    const meta = await image.metadata();

    if ((meta.pages ?? 1) > 1) {
      console.log(`skip animated image ${src}`);
      continue;
    }

    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    if (width < 1 || height < 1) {
      console.warn(`skip image with unknown dimensions ${src}`);
      continue;
    }

    const widths = widthsForSource(width);
    const hash = createHash("sha256").update(bytes).digest("hex");
    const entry: ImageManifestEntry = { width, height, widths };
    manifest[src] = entry;

    for (const targetWidth of widths) {
      expectedOutputs.add(outputAbsPath(src, targetWidth, "avif"));
      expectedOutputs.add(outputAbsPath(src, targetWidth, "webp"));
    }

    const cached = cache.entries[src];
    const canReuse =
      cached?.hash === hash &&
      sameWidths(cached.widths, widths) &&
      (await allFilesExist(widths, src));

    nextCache.entries[src] = { hash, widths };

    if (canReuse) {
      skipped += 1;
      continue;
    }

    await writeVariants(bytes, src, widths);
    optimized += 1;
  }

  await pruneStaleOutputs(expectedOutputs);
  await fs.writeFile(cachePath, `${JSON.stringify(nextCache, null, 2)}\n`);
  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(
    `Optimized ${optimized} image(s), reused ${skipped} cached, wrote ${Object.keys(manifest).length} manifest entries.`,
  );
}

function toPublicUrl(absPath: string): string {
  const rel = path.relative(publicDir, absPath);
  return `/${rel.split(path.sep).join("/")}`;
}

function outputAbsPath(
  src: string,
  width: number,
  format: "avif" | "webp",
): string {
  return path.join(publicDir, optimizedVariantPath(src, width, format).slice(1));
}

function sameWidths(left: number[], right: number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

async function allFilesExist(widths: number[], src: string): Promise<boolean> {
  for (const width of widths) {
    for (const format of ["avif", "webp"] as const) {
      try {
        await fs.access(outputAbsPath(src, width, format));
      } catch {
        return false;
      }
    }
  }
  return true;
}

async function writeVariants(
  bytes: Buffer,
  src: string,
  widths: number[],
): Promise<void> {
  for (const width of widths) {
    for (const format of ["avif", "webp"] as const) {
      const outFile = outputAbsPath(src, width, format);
      await fs.mkdir(path.dirname(outFile), { recursive: true });
      const pipeline = sharp(bytes, { failOn: "none" })
        .rotate()
        .resize({ width, withoutEnlargement: true });
      if (format === "avif") {
        await pipeline.avif({ quality: AVIF_QUALITY }).toFile(outFile);
      } else {
        await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outFile);
      }
    }
  }
}

async function findSourceImages(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files: string[] = [];
  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (path.resolve(absPath) === optimizedDir) {
        continue;
      }
      files.push(...(await findSourceImages(absPath)));
      continue;
    }
    if (SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(absPath);
    }
  }
  return files.sort();
}

async function readCache(): Promise<CacheFile> {
  try {
    const raw = JSON.parse(await fs.readFile(cachePath, "utf8")) as CacheFile;
    if (raw.version !== CACHE_VERSION || !raw.entries) {
      return { version: CACHE_VERSION, entries: {} };
    }
    return raw;
  } catch {
    return { version: CACHE_VERSION, entries: {} };
  }
}

async function pruneStaleOutputs(expected: Set<string>): Promise<void> {
  const existing = await listFiles(optimizedDir);
  await Promise.all(
    existing
      .filter((file) => !expected.has(file))
      .map((file) => fs.unlink(file)),
  );
  await removeEmptyDirs(optimizedDir);
}

async function listFiles(dir: string): Promise<string[]> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const files: string[] = [];
  for (const entry of entries) {
    const absPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(absPath)));
    } else {
      files.push(absPath);
    }
  }
  return files;
}

async function removeEmptyDirs(dir: string): Promise<void> {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return;
    }
    throw error;
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      await removeEmptyDirs(path.join(dir, entry.name));
    }
  }

  const remaining = await fs.readdir(dir);
  if (remaining.length === 0 && path.resolve(dir) !== optimizedDir) {
    await fs.rmdir(dir);
  }
}

await main();
