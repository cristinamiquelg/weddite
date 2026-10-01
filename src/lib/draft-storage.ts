// Read/written via sessionStorage (see use-wedding-draft.ts and
// PreviewClient.tsx) so a fresh visit — a new tab, or the same tab after
// it's closed — always starts the customization from scratch.
export function draftStorageKey(slug: string) {
  return `wedite:draft:${slug}`;
}
