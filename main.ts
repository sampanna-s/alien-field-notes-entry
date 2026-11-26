import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const review =
  "Earth review: four stars. The locals press 'snooze' to negotiate with time, then blame the sun for refusing the treaty; I would revisit once their clocks learn mercy.";

function assertValidReview(text) {
  const characterCount = [...text].length;
  if (characterCount < 1 || characterCount > 200 || text.trim().length === 0 || /[\r\n]/.test(text)) {
    throw new Error("review must be one non-blank line of 1 to 200 characters");
  }
}

assertValidReview(review);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const temporaryPath = join(outputDir, ".entry.txt.tmp");
writeFileSync(temporaryPath, review, "utf8");
renameSync(temporaryPath, join(outputDir, "entry.txt"));
