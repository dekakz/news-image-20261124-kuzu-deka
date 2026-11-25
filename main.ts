// main.ts — entry program for news-image-20261124.
// Copies the pre-rendered front page (entry.png) to $MAKEFUN_OUTPUT_DIR/entry.png.
// Node 22, stdlib only. No network, no randomness, no time dependence:
// the same bytes are written on every run.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = join(here, "entry.png");
const dst = join(outDir, "entry.png");
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);
// Determinism guard: the output must be a whole PNG within the 1 MiB gate.
const bytes = statSync(dst).size;
if (bytes > 1048576) throw new Error(`entry.png too large: ${bytes} bytes`);
console.log(`wrote ${dst} (${bytes} bytes)`);
