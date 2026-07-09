/**
 * Wraps a localStorage-backed JSON loader so repeated calls return the same
 * object/array reference when the stored value hasn't actually changed.
 * Required when used as a useSyncExternalStore getSnapshot — returning a new
 * identity on every call (e.g. from JSON.parse) causes an infinite render loop.
 */
export function createCachedLoader<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
) {
  let cachedRaw: string | null | undefined;
  let cachedValue: T = fallback;

  return function load(): T {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    if (!raw) {
      cachedValue = fallback;
      return cachedValue;
    }
    try {
      const parsed: unknown = JSON.parse(raw);
      cachedValue = isValid(parsed) ? parsed : fallback;
    } catch {
      cachedValue = fallback;
    }
    return cachedValue;
  };
}
