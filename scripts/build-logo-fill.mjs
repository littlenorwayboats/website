/**
 * Derives the colored ("hover") fill shapes for the Little Norway Boats mark.
 *
 * The line art in src/components/Logo.tsx is the source of truth for geometry.
 * This script renders it, finds the regions the strokes enclose, samples
 * assets/logo-color-reference.png to decide each region's color, and traces
 * the result back to vector paths in the same viewBox. Because both layers
 * come from one render, the fill registers exactly with the strokes.
 *
 * Needs potrace, which is not a project dependency:
 *   npm i --no-save potrace && node scripts/build-logo-fill.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import potrace from "potrace";

const ROOT = path.resolve(import.meta.dirname, "..");
const LOGO_TSX = path.join(ROOT, "src/components/Logo.tsx");
const REFERENCE = path.join(import.meta.dirname, "assets/logo-color-reference.png");
const OUT = path.join(ROOT, "src/components/logoFillPaths.ts");

const VIEW_BOX = { x: 159, y: 210, w: 435, h: 417 };
const SCALE = 4;
const W = VIEW_BOX.w * SCALE;
const H = VIEW_BOX.h * SCALE;

const PALETTE = {
  pink: [211, 96, 133],
  gold: [211, 196, 119],
  teal: [105, 168, 153],
};
const DRAW_ORDER = ["pink", "teal", "gold"];
const STROKE_ALPHA = 140;
const BLEED = 8; // grow fills under the strokes so no seam shows at the edges
const FALLBACK_RADIUS = 80;
// The strokes are drawn over the fill, so the traced outlines can be loose.
const TRACE_TOLERANCE = 1.2;
const TRACE_SPECK = 48;

function readMarkPaths() {
  const src = fs.readFileSync(LOGO_TSX, "utf8");
  const start = src.indexOf("const markPaths = [");
  const end = src.indexOf("\n];", start);
  if (start < 0 || end < 0) throw new Error("markPaths not found in Logo.tsx");
  const body = src.slice(start + "const markPaths = [".length, end).trim();
  return JSON.parse(`[${body.replace(/,$/, "")}]`);
}

async function renderStrokes(markPaths) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEW_BOX.x} ${VIEW_BOX.y} ${VIEW_BOX.w} ${VIEW_BOX.h}" width="${W}" height="${H}">${markPaths
    .map((d) => `<path d="${d}" fill="#000"/>`)
    .join("")}</svg>`;
  const { data } = await sharp(Buffer.from(svg))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const alpha = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) alpha[i] = data[i * 4 + 3];
  return alpha;
}

function boundsOf(width, height, test) {
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (!test(y * width + x)) continue;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return { x0, y0, x1, y1 };
}

function labelRegions(isStroke) {
  const label = new Int32Array(W * H).fill(-1);
  const regions = [];
  const stack = new Int32Array(W * H);
  for (let seed = 0; seed < W * H; seed++) {
    if (isStroke(seed) || label[seed] !== -1) continue;
    const id = regions.length;
    let size = 0;
    let touchesBorder = false;
    let sp = 0;
    stack[sp++] = seed;
    label[seed] = id;
    while (sp > 0) {
      const p = stack[--sp];
      size++;
      const x = p % W;
      const y = (p - x) / W;
      if (x === 0 || y === 0 || x === W - 1 || y === H - 1) touchesBorder = true;
      const push = (q) => {
        if (!isStroke(q) && label[q] === -1) {
          label[q] = id;
          stack[sp++] = q;
        }
      };
      if (x > 0) push(p - 1);
      if (x < W - 1) push(p + 1);
      if (y > 0) push(p - W);
      if (y < H - 1) push(p + W);
    }
    regions.push({ id, size, touchesBorder });
  }
  return { label, regions };
}

function nearestSwatch(r, g, b) {
  let best = null;
  let bestDist = Infinity;
  for (const [name, c] of Object.entries(PALETTE)) {
    const d = (r - c[0]) ** 2 + (g - c[1]) ** 2 + (b - c[2]) ** 2;
    if (d < bestDist) {
      bestDist = d;
      best = name;
    }
  }
  return best;
}

/** Regions the reference only covers with its own ink inherit the colour of
 *  whichever neighbour they are closest to. */
function inferFromNeighbours(id, label, decided, isStroke) {
  const seen = new Uint8Array(W * H);
  let frontier = [];
  for (let p = 0; p < W * H; p++) {
    if (label[p] === id) {
      seen[p] = 1;
      frontier.push(p);
    }
  }
  const tally = new Map();
  for (let step = 0; step < FALLBACK_RADIUS && frontier.length; step++) {
    const next = [];
    for (const p of frontier) {
      const x = p % W;
      const y = (p - x) / W;
      const visit = (q) => {
        if (seen[q]) return;
        seen[q] = 1;
        const other = label[q];
        if (other >= 0 && other !== id && decided.has(other)) {
          const color = decided.get(other);
          tally.set(color, (tally.get(color) || 0) + 1);
          return;
        }
        if (other === id || isStroke(q)) next.push(q);
      };
      if (x > 0) visit(p - 1);
      if (x < W - 1) visit(p + 1);
      if (y > 0) visit(p - W);
      if (y < H - 1) visit(p + W);
    }
    frontier = next;
  }
  let best = null;
  let bestCount = 0;
  for (const [color, count] of tally) {
    if (count > bestCount) {
      bestCount = count;
      best = color;
    }
  }
  return best;
}

function dilate(mask, radius, allowed) {
  const dist = new Int32Array(W * H).fill(-1);
  let frontier = [];
  for (let p = 0; p < W * H; p++) {
    if (mask[p]) {
      dist[p] = 0;
      frontier.push(p);
    }
  }
  const out = Uint8Array.from(mask);
  for (let step = 1; step <= radius && frontier.length; step++) {
    const next = [];
    for (const p of frontier) {
      const x = p % W;
      const y = (p - x) / W;
      const visit = (q) => {
        if (dist[q] !== -1 || !allowed[q]) return;
        dist[q] = step;
        out[q] = 1;
        next.push(q);
      };
      if (x > 0) visit(p - 1);
      if (x < W - 1) visit(p + 1);
      if (y > 0) visit(p - W);
      if (y < H - 1) visit(p + W);
    }
    frontier = next;
  }
  return out;
}

/** Rounds to whole raster pixels (a quarter of a viewBox unit) and drops the
 *  separators SVG does not need. */
function compactPath(d) {
  const tokens = d.match(/[A-Za-z]|-?\d*\.?\d+/g) ?? [];
  let out = "";
  let needsSeparator = false;
  for (const token of tokens) {
    if (/[A-Za-z]/.test(token)) {
      out += token;
      needsSeparator = false;
      continue;
    }
    const value = String(Math.round(Number(token)));
    if (needsSeparator && !value.startsWith("-")) out += " ";
    out += value;
    needsSeparator = true;
  }
  return out;
}

function traceMask(mask) {
  const gray = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) gray[i] = mask[i] ? 0 : 255;
  return sharp(gray, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer()
    .then(
      (png) =>
        new Promise((resolve, reject) => {
          const tracer = new potrace.Potrace({
            threshold: 128,
            turdSize: TRACE_SPECK,
            alphaMax: 1,
            optCurve: true,
            optTolerance: TRACE_TOLERANCE,
          });
          tracer.loadImage(png, (err) => {
            if (err) return reject(err);
            const svg = tracer.getSVG();
            const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(" ");
            resolve(compactPath(d));
          });
        }),
    );
}

const markPaths = readMarkPaths();
const strokeAlpha = await renderStrokes(markPaths);
const isStroke = (i) => strokeAlpha[i] >= STROKE_ALPHA;
const strokeBounds = boundsOf(W, H, (i) => strokeAlpha[i] > 8);

const reference = await sharp(REFERENCE)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: RW, height: RH } = reference.info;
const ref = reference.data;
const refBounds = boundsOf(RW, RH, (i) => {
  if (ref[i * 4 + 3] < 60) return false;
  return !(ref[i * 4] > 243 && ref[i * 4 + 1] > 243 && ref[i * 4 + 2] > 243);
});

const sx = (refBounds.x1 - refBounds.x0 + 1) / (strokeBounds.x1 - strokeBounds.x0 + 1);
const sy = (refBounds.y1 - refBounds.y0 + 1) / (strokeBounds.y1 - strokeBounds.y0 + 1);

const { label, regions } = labelRegions(isStroke);
const votes = new Map();
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const id = label[y * W + x];
    if (id < 0) continue;
    const rx = Math.round(refBounds.x0 + (x - strokeBounds.x0) * sx);
    const ry = Math.round(refBounds.y0 + (y - strokeBounds.y0) * sy);
    if (rx < 0 || ry < 0 || rx >= RW || ry >= RH) continue;
    let tally = votes.get(id);
    if (!tally) {
      tally = { clear: 0, ink: 0, pink: 0, gold: 0, teal: 0 };
      votes.set(id, tally);
    }
    const i = (ry * RW + rx) * 4;
    if (ref[i + 3] < 60) {
      tally.clear++;
      continue;
    }
    const [r, g, b] = [ref[i], ref[i + 1], ref[i + 2]];
    if (0.299 * r + 0.587 * g + 0.114 * b < 95) {
      tally.ink++;
      continue;
    }
    tally[nearestSwatch(r, g, b)]++;
  }
}

const decided = new Map();
const undecided = [];
for (const region of regions) {
  if (region.touchesBorder) continue;
  const tally = votes.get(region.id) || { clear: 0, pink: 0, gold: 0, teal: 0 };
  const colored = tally.pink + tally.gold + tally.teal;
  if (colored > tally.clear) {
    const winner = DRAW_ORDER.slice().sort((a, b) => tally[b] - tally[a])[0];
    decided.set(region.id, winner);
  } else if (tally.clear === 0) {
    undecided.push(region);
  }
}
for (const region of undecided) {
  const inferred = inferFromNeighbours(region.id, label, decided, isStroke);
  if (inferred) decided.set(region.id, inferred);
}

const strokeMask = new Uint8Array(W * H);
for (let i = 0; i < W * H; i++) strokeMask[i] = isStroke(i) ? 1 : 0;

const fills = [];
for (const color of DRAW_ORDER) {
  const mask = new Uint8Array(W * H);
  let any = false;
  for (let i = 0; i < W * H; i++) {
    const id = label[i];
    if (id >= 0 && decided.get(id) === color) {
      mask[i] = 1;
      any = true;
    }
  }
  if (!any) continue;
  const grown = dilate(mask, BLEED, strokeMask);
  const d = await traceMask(grown);
  fills.push({ color, d });
  console.log(color, `${d.length} chars`);
}

const hex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
const body = fills
  .map(
    ({ color, d }) =>
      `  { fill: "${hex(PALETTE[color])}", d: ${JSON.stringify(d)} },`,
  )
  .join("\n");

fs.writeFileSync(
  OUT,
  `// Generated by scripts/build-logo-fill.mjs — do not edit by hand.
// Traced at ${SCALE}x the mark's viewBox, so these paths must be drawn inside
// <g transform="translate(${VIEW_BOX.x} ${VIEW_BOX.y}) scale(${1 / SCALE})">.
export const logoFillTransform = "translate(${VIEW_BOX.x} ${VIEW_BOX.y}) scale(${1 / SCALE})";

export const logoFillPaths: { fill: string; d: string }[] = [
${body}
];
`,
);
console.log("wrote", path.relative(ROOT, OUT));
