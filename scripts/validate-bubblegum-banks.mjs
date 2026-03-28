import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import ts from "typescript";

const root = process.cwd();
const contentDir = path.join(root, "src", "content");
const bankFile = path.join(contentDir, "bubblegum-banks.ts");
const validLevels = new Set(["quiz", "midterm", "final"]);
const requiredLocalizedFields = [
  "prompt",
  "firstStep",
  "setup",
  "answer",
  "selfCheck",
];

function fail(message) {
  console.error(`Bubblegum bank validation failed: ${message}`);
  process.exitCode = 1;
}

function validateLocalizedText(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    fail(`${label} must be a localized object with en/es/zh strings.`);
    return;
  }

  for (const locale of ["en", "es", "zh"]) {
    if (typeof value[locale] !== "string" || value[locale].trim().length === 0) {
      fail(`${label}.${locale} must be a non-empty string.`);
    }
  }
}

function getKnownCardIds() {
  const ids = new Set();

  for (const entry of fs.readdirSync(contentDir)) {
    if (!entry.endsWith(".ts")) {
      continue;
    }

    if (["schema.ts", "localization.ts", "bubblegum-banks.ts"].includes(entry)) {
      continue;
    }

    const source = fs.readFileSync(path.join(contentDir, entry), "utf8");
    const matches = source.matchAll(/\bid:\s*"([^"]+)"/g);

    for (const match of matches) {
      ids.add(match[1]);
    }
  }

  return ids;
}

function loadBubblegumBanks() {
  const source = fs.readFileSync(bankFile, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: bankFile,
  });

  const cjsModule = { exports: {} };
  const context = {
    module: cjsModule,
    exports: cjsModule.exports,
  };

  vm.runInNewContext(compiled.outputText, context, { filename: bankFile });

  return cjsModule.exports.bubblegumBanks ?? {};
}

function validateSeed(seed, label) {
  if (!seed || typeof seed !== "object" || Array.isArray(seed)) {
    fail(`${label} must be an object.`);
    return;
  }

  for (const field of requiredLocalizedFields) {
    validateLocalizedText(seed[field], `${label}.${field}`);
  }

  if (!Array.isArray(seed.fullPath) || seed.fullPath.length === 0) {
    fail(`${label}.fullPath must be a non-empty array.`);
  } else {
    seed.fullPath.forEach((step, index) => {
      validateLocalizedText(step, `${label}.fullPath[${index}]`);
    });
  }

  if (seed.whyFits !== undefined) {
    validateLocalizedText(seed.whyFits, `${label}.whyFits`);
  }

  if (seed.notationHelp !== undefined) {
    if (!Array.isArray(seed.notationHelp) || seed.notationHelp.length === 0) {
      fail(`${label}.notationHelp must be a non-empty array when provided.`);
    } else {
      seed.notationHelp.forEach((item, index) => {
        validateLocalizedText(item, `${label}.notationHelp[${index}]`);
      });
    }
  }
}

const knownCardIds = getKnownCardIds();
const banks = loadBubblegumBanks();

for (const [cardId, levels] of Object.entries(banks)) {
  if (!knownCardIds.has(cardId)) {
    fail(`Unknown Bubble Card id "${cardId}" in bubblegum-banks.ts.`);
  }

  if (!levels || typeof levels !== "object" || Array.isArray(levels)) {
    fail(`Bank "${cardId}" must contain a level object.`);
    continue;
  }

  for (const [level, seeds] of Object.entries(levels)) {
    if (!validLevels.has(level)) {
      fail(`Bank "${cardId}" contains invalid level "${level}".`);
      continue;
    }

    if (!Array.isArray(seeds) || seeds.length === 0) {
      fail(`Bank "${cardId}" level "${level}" must be a non-empty array.`);
      continue;
    }

    seeds.forEach((seed, index) => {
      validateSeed(seed, `${cardId}.${level}[${index}]`);
    });
  }
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(
  `Bubblegum bank validation passed for ${Object.keys(banks).length} topic banks.`,
);
