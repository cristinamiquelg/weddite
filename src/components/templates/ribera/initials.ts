// The monogram in the header. Until the couple has typed their names there
// is nothing to abbreviate, so it shows a bare "&" rather than someone
// else's initials (the template used to fall back to "L&J").
export function coupleInitials(partnerA: string, partnerB: string): string {
  const first = (name: string) => name.trim().charAt(0).toUpperCase();
  return `${first(partnerA)}&${first(partnerB)}`;
}
