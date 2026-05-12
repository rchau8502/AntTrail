const BUBBLEGUM_MASTERED_KEY = "bubblegum-mastered-topics";
const BUBBLEGUM_ATTEMPTS_KEY = "bubblegum-topic-attempts";
export const BUBBLE_PROGRESS_EVENT = "bubble-progress-updated";

export interface BubblegumTopicProgress {
  gotIt: number;
  missedIt: number;
  lastOutcome?: "gotIt" | "missedIt";
  lastAttemptedAt?: number;
  lastMissType?: BubblegumMissType;
  missTypeCounts?: Partial<Record<BubblegumMissType, number>>;
}

export type BubblegumStudyState = "new" | "review" | "repair" | "stable";
export type BubblegumMissType =
  | "recognition"
  | "setup"
  | "execution"
  | "proof";

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

function readMap<T>(key: string) {
  if (!canUseStorage()) {
    return {} as Record<string, T>;
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (!raw) {
      return {} as Record<string, T>;
    }

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, T>) : ({} as Record<string, T>);
  } catch {
    return {} as Record<string, T>;
  }
}

function writeMap<T>(key: string, value: Record<string, T>) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
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

export function recordBubblegumAttempt(
  id: string,
  outcome: "gotIt" | "missedIt",
  missType?: BubblegumMissType,
) {
  const attempts = readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY);
  const current = attempts[id] ?? { gotIt: 0, missedIt: 0 };
  const currentMissCounts = current.missTypeCounts ?? {};

  attempts[id] = {
    gotIt: current.gotIt + (outcome === "gotIt" ? 1 : 0),
    missedIt: current.missedIt + (outcome === "missedIt" ? 1 : 0),
    lastOutcome: outcome,
    lastAttemptedAt: Date.now(),
    lastMissType: outcome === "missedIt" ? missType : current.lastMissType,
    missTypeCounts:
      outcome === "missedIt" && missType
        ? {
            ...currentMissCounts,
            [missType]: (currentMissCounts[missType] ?? 0) + 1,
          }
        : currentMissCounts,
  };

  writeMap(BUBBLEGUM_ATTEMPTS_KEY, attempts);
}

export function getBubblegumTopicProgress(id: string): BubblegumTopicProgress {
  return readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY)[id] ?? {
    gotIt: 0,
    missedIt: 0,
  };
}

export function getBubblegumTopicProgressMap() {
  return readMap<BubblegumTopicProgress>(BUBBLEGUM_ATTEMPTS_KEY);
}

export function getBubblegumStudyState(
  progress: BubblegumTopicProgress,
): BubblegumStudyState {
  const total = progress.gotIt + progress.missedIt;

  if (total === 0) {
    return "new";
  }

  if (
    progress.lastOutcome === "missedIt" ||
    progress.missedIt > progress.gotIt
  ) {
    return "repair";
  }

  if (progress.gotIt >= 3 && progress.gotIt >= progress.missedIt + 2) {
    return "stable";
  }

  return "review";
}

export function getBubblegumPriorityScore(progress: BubblegumTopicProgress) {
  const total = progress.gotIt + progress.missedIt;
  const state = getBubblegumStudyState(progress);

  if (state === "repair") {
    return 400 + progress.missedIt * 20 - progress.gotIt * 5;
  }

  if (state === "review") {
    return 250 + total * 5 - progress.gotIt;
  }

  if (state === "new") {
    return 150;
  }

  return 50 + progress.gotIt - progress.missedIt;
}

export function getBubblegumPrimaryMissType(
  progress: BubblegumTopicProgress,
): BubblegumMissType | undefined {
  const counts = progress.missTypeCounts;

  if (!counts) {
    return progress.lastMissType;
  }

  const ranked = Object.entries(counts).sort(
    (left, right) => right[1] - left[1],
  ) as Array<[BubblegumMissType, number]>;

  return ranked[0]?.[0] ?? progress.lastMissType;
}
