/**
 * Copies the coloured Little Norway mark from scripts/assets/logo-color.svg
 * into src/components/logoFillPaths.ts, keeping Illustrator's paint order and
 * the original fill of every path. The round shields along the hull are then
 * unified to the same teal (#70b4a4); the source file paints some of them pink.
 * Those paths share the line-art viewBox (159 210 435 417), so the hover
 * artwork sits in the same box as the icon.
 *
 * Run with: node scripts/build-logo-fill.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(import.meta.dirname, "assets/logo-color.svg");
const OUT = path.join(ROOT, "src/components/logoFillPaths.ts");

const svg = fs.readFileSync(SOURCE, "utf8");
const styles = Object.fromEntries(
  [...svg.matchAll(/\.(st\d+)\s*\{\s*fill:\s*(#[0-9a-fA-F]+)/g)].map((match) => [
    match[1],
    match[2].toLowerCase(),
  ]),
);
const paths = [...svg.matchAll(/<path class="(st\d+)" d="([^"]+)"/g)].map((match) => ({
  fill: styles[match[1]],
  d: match[2],
}));
if (paths.length === 0 || paths.some((entry) => !entry.fill)) {
  throw new Error("Could not read coloured paths from logo-color.svg");
}

const SHIELD_TEAL = "#70b4a4";
const DARK_FILLS = new Set(["#1a1315", "#131515", "#131011", "#131112"]);

function pathBounds(d) {
  const tokens = [];
  for (const match of d.matchAll(/([MmLlHhVvCcSsQqTtAaZz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g)) {
    tokens.push(match[1] ?? Number(match[2]));
  }
  let i = 0;
  let cmd = null;
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const add = (px, py) => {
    minX = Math.min(minX, px);
    minY = Math.min(minY, py);
    maxX = Math.max(maxX, px);
    maxY = Math.max(maxY, py);
  };
  const read = () => tokens[i++];
  while (i < tokens.length) {
    if (typeof tokens[i] === "string") cmd = tokens[i++];
    if (!cmd) break;
    const relative = cmd === cmd.toLowerCase();
    const kind = cmd.toUpperCase();
    if (kind === "Z") {
      x = startX;
      y = startY;
      cmd = null;
      continue;
    }
    if (kind === "M") {
      x = (relative ? x : 0) + read();
      y = (relative ? y : 0) + read();
      startX = x;
      startY = y;
      add(x, y);
      cmd = relative ? "l" : "L";
      continue;
    }
    if (kind === "L") {
      x = (relative ? x : 0) + read();
      y = (relative ? y : 0) + read();
      add(x, y);
      continue;
    }
    if (kind === "H") {
      x = (relative ? x : 0) + read();
      add(x, y);
      continue;
    }
    if (kind === "V") {
      y = (relative ? y : 0) + read();
      add(x, y);
      continue;
    }
    if (kind === "C") {
      const x1 = (relative ? x : 0) + read();
      const y1 = (relative ? y : 0) + read();
      const x2 = (relative ? x : 0) + read();
      const y2 = (relative ? y : 0) + read();
      const nextX = (relative ? x : 0) + read();
      const nextY = (relative ? y : 0) + read();
      add(x1, y1);
      add(x2, y2);
      add(nextX, nextY);
      x = nextX;
      y = nextY;
      continue;
    }
    if (kind === "S" || kind === "Q") {
      const x1 = (relative ? x : 0) + read();
      const y1 = (relative ? y : 0) + read();
      const nextX = (relative ? x : 0) + read();
      const nextY = (relative ? y : 0) + read();
      add(x1, y1);
      add(nextX, nextY);
      x = nextX;
      y = nextY;
      continue;
    }
    if (kind === "T") {
      x = (relative ? x : 0) + read();
      y = (relative ? y : 0) + read();
      add(x, y);
      continue;
    }
    if (kind === "A") {
      read();
      read();
      read();
      read();
      read();
      x = (relative ? x : 0) + read();
      y = (relative ? y : 0) + read();
      add(x, y);
      continue;
    }
    throw new Error(`Unsupported path command ${cmd}`);
  }
  return {
    width: maxX - minX,
    height: maxY - minY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
  };
}

const measured = paths.map((entry) => ({ ...entry, ...pathBounds(entry.d) }));
const shieldCenters = measured
  .filter(
    (entry) =>
      entry.width >= 16 &&
      entry.width <= 36 &&
      entry.height >= 16 &&
      entry.height <= 36 &&
      entry.width / entry.height > 0.65 &&
      entry.width / entry.height < 1.4 &&
      entry.cx > 240 &&
      entry.cx < 510 &&
      entry.cy > 465 &&
      entry.cy < 500,
  )
  .map((entry) => ({ cx: entry.cx, cy: entry.cy }));

let recolored = 0;
for (const entry of measured) {
  if (DARK_FILLS.has(entry.fill) || entry.fill === SHIELD_TEAL) continue;
  if (entry.width >= 36 || entry.height >= 36) continue;
  const onShield = shieldCenters.some(
    (center) => Math.hypot(entry.cx - center.cx, entry.cy - center.cy) < 16,
  );
  if (!onShield) continue;
  entry.fill = SHIELD_TEAL;
  recolored += 1;
}

const body = measured
  .map((entry) => `  { fill: "${entry.fill}", d: ${JSON.stringify(entry.d)} },`)
  .join("\n");

fs.writeFileSync(
  OUT,
  `// Generated by scripts/build-logo-fill.mjs from scripts/assets/logo-color.svg.
// Paths stay in Illustrator's paint order. Shield fills are unified to #70b4a4.
// Coordinates match the line-art viewBox "159 210 435 417".
export const logoFillPaths: { fill: string; d: string }[] = [
${body}
];
`,
);
console.log(`wrote ${measured.length} paths to ${path.relative(ROOT, OUT)} (${recolored} shield fills set to ${SHIELD_TEAL})`);
