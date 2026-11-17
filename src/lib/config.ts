/**
 * Public site configuration. Safe to commit — no secrets belong here.
 *
 * Optional local overrides go in `.env.local` (gitignored). See `.env.example`.
 */
export const publicConfig = {
  siteUrl: "https://littlenorwayboats.com",
  /** Flip to true to remove Coming Soon gating and index every page. */
  launched: false,
} as const;
