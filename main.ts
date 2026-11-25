// The Meeting That Should Have Been an Email — one line, at most 200
// characters, one joke about a meeting that should have been an email.
//
// The joke: a meeting held to discuss an email ends by producing another
// email that schedules another meeting about the email. The loop is the
// punchline — the meeting never escapes itself, and the turn lands on the
// final word, which is the very thing the meeting should have been.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_LINE =
  "Our meeting about the email ended with an email scheduling a meeting about the email.";

// Gate: the kit requires 1-200 UTF-8 chars, exactly one line, not blank.
// Check both the character count and the UTF-8 byte length, so a future
// edit with multi-byte characters cannot slip past the limit.
const charCount = [...ENTRY_LINE].length;
const byteCount = new TextEncoder().encode(ENTRY_LINE).length;
if (
  charCount < 1 ||
  charCount > 200 ||
  byteCount > 200 ||
  ENTRY_LINE.includes("\n") ||
  ENTRY_LINE.includes("\r") ||
  ENTRY_LINE.trim().length === 0
) {
  throw new Error(
    `entry must be 1-200 chars, single line (got ${charCount} chars, ${byteCount} bytes)`,
  );
}

// Second guard: the line must already be clean — no leading/trailing
// whitespace and it must end with a full stop, so the written line is
// exactly the intended single sentence with nothing trimmed away.
if (ENTRY_LINE !== ENTRY_LINE.trim() || !ENTRY_LINE.endsWith(".")) {
  throw new Error("entry must be trimmed and end with a full stop");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY_LINE, "utf8");
console.log(`wrote ${charCount} chars to ${join(outputDir, "entry.txt")}`);
