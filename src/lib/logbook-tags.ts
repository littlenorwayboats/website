export const PINNED_TAG = "Pinned";

export function isPinned(tags: string[]) {
  return tags.includes(PINNED_TAG);
}

/** Tags shown on post teasers and notes (includes Pinned). */
export function visibleTags(tags: string[]) {
  return tags;
}

/** Tags in the filter bar; Pinned only affects default sort, not filtering. */
export function filterableTags(tags: string[]) {
  return tags.filter((tag) => tag !== PINNED_TAG);
}
