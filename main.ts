// Famous Last Words: The Funniest Epitaph
// make.fun bounty u-riidzhsn-famous-last-words-the-funniest-epitaph-ff177406
//
// A tiny Node 22 program (standard library only, no network) that writes one
// line of famous last words — a tombstone epitaph — to the output file the
// sealed scorer reads, and prints the same line to stdout.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: last words to the wife, then the twist — one everyday secret
// goes to the grave with him. 68 characters, well under the 150-char gate.
const ENTRY =
  "Tell my wife I loved her — and that the Wi-Fi password died with me.";

// The gate allows at most 150 characters, and the text must not be blank.
const MAX_CHARS = 150;

// Count characters as code points, so the em dash counts as one.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(`entry is ${charCount} characters, outside the 1-150 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// No trailing newline: the file must hold exactly the entry text.
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

process.stdout.write(ENTRY + "\n");
