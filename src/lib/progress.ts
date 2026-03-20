const BUBBLEGUM_MASTERED_KEY = "bubblegum-mastered-topics";
export const BUBBLE_PROGRESS_EVENT = "bubble-progress-updated";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readSet(key: string) {
  if (!canUseStorage()) {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return new Set<string>();
    }

    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set<string>();
  }
}

function writeSet(key: string, values: Set<string>) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify([...values].sort()));
  window.dispatchEvent(new CustomEvent(BUBBLE_PROGRESS_EVENT));
}

export function isBubblegumTopicMastered(id: string) {
  return readSet(BUBBLEGUM_MASTERED_KEY).has(id);
}

export function setBubblegumTopicMastered(id: string, mastered: boolean) {
  const values = readSet(BUBBLEGUM_MASTERED_KEY);

  if (mastered) {
    values.add(id);
  } else {
    values.delete(id);
  }

  writeSet(BUBBLEGUM_MASTERED_KEY, values);
}
