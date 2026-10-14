export const DEFAULT_OPENAI_MODEL = "gpt-5-mini";

export function getDefaultAiModel() {
  return process.env.NEXT_PUBLIC_OPENAI_MODEL?.trim()
    || process.env.OPENAI_MODEL?.trim()
    || DEFAULT_OPENAI_MODEL;
}

