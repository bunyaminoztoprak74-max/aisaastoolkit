# AI SaaS Toolkit — aisaastoolkit.com

A production-ready, programmatic SEO affiliate review site for AI tools. Built with **Next.js 15 App Router**, **TypeScript**, **Tailwind CSS**, **Shadcn UI**, and **MDX**, deployed on **Vercel**.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export, verify zero errors
npm run lint
```

Deploy: push to GitHub → connect to Vercel → zero-config deploy.

---

## Architecture Overview

### Route Map

| Route | Description | Static Params |
|---|---|---|
| `/` | Homepage — hero, categories, trending, comparisons | — |
| `/reviews/[slug]` | Individual AI tool review | all tool slugs |
| `/compare/[slug]` | Side-by-side comparison | all comparison slugs |
| `/best/[slug]` | "Best of" curated lists | all best-list slugs |
| `/category/[slug]` | Tools filtered by category | all category slugs |
| `/tag/[slug]` | Tools filtered by tag | all 30+ tag slugs |
| `/tools` | All-tools index with search + filter | — |
| `/search` | Full-text search with filter panel | — |
| `/tags` | Tag index grouped by type | — |
| `/about`, `/contact`, `/privacy`, `/terms`, `/affiliate-disclosure` | Legal / info pages | — |

Every dynamic route calls `generateStaticParams()` so all pages are pre-rendered at build time — zero server compute at runtime.

---

## Data Layer (`src/data/`)

All content lives as typed TypeScript modules — no database, no CMS.

| File | Exports | Contents |
|---|---|---|
| `tools.ts` | `allTools`, `getToolBySlug`, `getToolsByCategory`, `getFeaturedTools`, `getTrendingTools`, `getRelatedTools` | 8 full tool records with pricing tiers, pros/cons, FAQs, affiliate links |
| `categories.ts` | `allCategories`, `getCategoryBySlug` | 7 categories with icon, gradient, toolCount |
| `comparisons.ts` | `allComparisons`, `getComparisonBySlug` | 3 head-to-head comparisons with feature rows, verdicts, FAQs |
| `bestLists.ts` | `allBestLists`, `getBestListBySlug` | 4 curated "Best of" lists |
| `tags.ts` | `allTags`, `tagToolMap`, `getTagsForTool`, `getToolsForTag`, `getTagBySlug` | 30+ tags across 5 groups: pricing, feature, use-case, audience, integration |
| `searchIndex.ts` | `allSearchEntries`, `searchEntries` | Compile-time full-text index across all content types; scored term matching |

### Adding a New Tool

1. Append a `Tool` object to the `allTools` array in `tools.ts`.
2. Add the slug to `tagToolMap` entries in `tags.ts` as appropriate.
3. Add it to a `BestList` in `bestLists.ts` if relevant.
4. Run `npm run build` — the tool page, sitemap entry, and tag pages all generate automatically.

---

## Library Layer (`src/lib/`)

| File | Purpose |
|---|---|
| `utils.ts` | `cn()`, `formatPrice()`, `slugify()`, `truncate()` |
| `schema.ts` | Centralized JSON-LD builders: Review, SoftwareApplication, FAQ, BreadcrumbList, ItemList, Comparison, WebSite, Organization |
| `related.ts` | Weighted scoring engine for "Related Tools" — scores by shared categories (4), shared tags (3), listed as alternatives (5), same price band (1), rating bonus |
| `linking.ts` | Auto internal links — builds flat `linkableEntities[]` index; `getSuggestedLinks(currentUrl)` powers `InternalLinksWidget` |
| `pagination.ts` | `paginate<T>()`, `getPageRange()` with ellipsis, `buildPageUrl()` |
| `seo.ts` | `buildMetadata()`, keyword builders per page type |
| `breadcrumbs.ts` | `generateBreadcrumbs(pathname)` — converts any URL pathname to a typed `BreadcrumbItem[]` trail using data-layer slug lookups |

---

## Programmatic SEO Features

### 1. Tag Pages (`/tag/[slug]`)
30+ tag pages auto-generate from `allTags`. Each page includes:
- Filtered tool grid with pagination
- `ItemList` JSON-LD schema
- `BreadcrumbList` JSON-LD schema
- Canonical URL + OpenGraph metadata

### 2. Full-Text Search (`/search`)
- Compile-time search index (`searchIndex.ts`) — no runtime DB needed
- URL-state-driven filters (type, category, pricing, badge, rating, tags) — shareable/bookmarkable
- `FilterPanel` + `SearchResults` are Client Components; page shell is a Server Component
- All filter state lives in `searchParams` — SSR compatible

### 3. Related Tools Engine (`lib/related.ts`)
```
scoreTool(candidate, reference) → number

Weights:
  SAME_CATEGORY   : 4 pts per shared category
  SHARED_TAG      : 3 pts per shared tag
  IN_ALTERNATIVES : 5 pts (listed as alternative)
  SAME_PRICE_BAND : 1 pt
  RATING_BONUS    : 0.5 × candidate.rating
```
Used on every review page and comparison page to surface the most contextually relevant next destinations.

### 4. Auto Internal Linking (`lib/linking.ts`)
`linkableEntities[]` is a flat index of all tools, comparisons, best lists, and categories. `getSuggestedLinks(currentUrl, limit)` excludes the current page and returns prioritised link targets — rendered by `InternalLinksWidget` in review and comparison sidebars.

### 5. Dynamic Breadcrumbs (`lib/breadcrumbs.ts` + `Breadcrumb.tsx`)
```tsx
// Auto-generate from pathname:
<Breadcrumb pathname="/category/ai-writing" />

// Or pass items manually:
<Breadcrumb items={[{ label: "Reviews", href: "/reviews" }, { label: "Claude AI" }]} />
```
`generateBreadcrumbs()` resolves dynamic segments using data-layer slug lookups and a `STATIC_LABELS` map for fixed route segments.

### 6. Pagination
`paginate<T>(items, page, perPage)` + `getPageRange()` with ellipsis gaps. All paginated pages include `rel="prev"` / `rel="next"` link attributes for Google crawl sequencing.

### 7. Structured Data
Every page type has a dedicated JSON-LD builder in `lib/schema.ts`:
- Homepage → `WebSite` + `Organization`
- Review → `SoftwareApplication` + `Review` + `AggregateRating` + `FAQPage` + `BreadcrumbList`
- Comparison → custom `ItemList` + `FAQPage` + `BreadcrumbList`
- Best list → `ItemList` + `BreadcrumbList`
- Category / Tag → `ItemList` + `BreadcrumbList`
- Search → `WebSite` (search action)

### 8. Sitemap (`src/app/sitemap.ts`)
Auto-generated entries for:
- All tool review pages
- All comparison pages
- All best-list pages
- All category pages
- All tag pages (30+)
- Static pages (about, contact, privacy, terms, affiliate-disclosure)

---

## Component Guide

### Review Page Components (`src/components/reviews/`)
- `StickyAffiliateCTA` — scroll-triggered at 400px, dismissible; use on every review
- `RatingDisplay` — radial progress bars per rating category
- `ProsConsSection` — green/red styled lists
- `PricingSection` — tiered pricing cards, highlights recommended tier
- `FAQSection` — `<details>` accordion + FAQPage JSON-LD
- `RelatedTools` — grid of scored related tools

### Comparison Components (`src/components/comparisons/`)
- `ComparisonEngine` — full reusable comparison UI: hero cards, score summary, feature table with winner highlighting, pricing, verdict + CTA
- `ComparisonTable` — lightweight standalone table

### Search Components (`src/components/search/`)
- `SearchBar` — debounced 350ms, navigates to `/search?q=`, sizes sm/md/lg
- `FilterPanel` — URL-state filter panel; use inside `<Suspense>`
- `SearchResults` — highlighted matched terms, type badges

### Common Components (`src/components/common/`)
- `AffiliateDisclosure` — props: `compact?: boolean`, `className?: string`
- `StarRating` — partial star rendering
- `TableOfContents` — IntersectionObserver active tracking
- `TagList` — renders all tags for a tool slug
- `Pagination` — SEO-friendly with rel prev/next
- `InternalLinksWidget` — type-coloured link suggestions
- `Skeleton` — ToolCardSkeleton, SearchResultSkeleton, ReviewHeroSkeleton

### Layout Components (`src/components/layout/`)
- `Header` — SearchBar with expand toggle, active pathname highlighting
- `Footer` — SearchBar, all nav links
- `Breadcrumb` — accepts `items` or `pathname`, emits BreadcrumbList JSON-LD
- `CategorySidebar` — live tool counts, active slug, links to /tags + /search
- `ThemeProvider` — next-themes wrapper

---

## Scaling Content

### Add 100+ Tools
1. Expand `src/data/tools.ts` — each tool is a self-contained object.
2. The build system generates all pages automatically.
3. For very large sets, consider splitting `tools.ts` into per-category files and re-exporting from an index.

### Add New Tag Groups
Add entries to `allTags` in `src/data/tags.ts` and populate `tagToolMap`. New tag pages generate at build time.

### Add New Comparisons
Append to `allComparisons` in `src/data/comparisons.ts`. The comparison page, sitemap entry, and internal link suggestions all update automatically.

### Add New Categories
Append to `allCategories` in `src/data/categories.ts`. Update `toolCount` to match your data.

---

## Environment & Deployment

No environment variables are required for the base build.

Optional (for contact form / newsletter):
```env
NEXT_PUBLIC_SITE_URL=https://aisaastoolkit.com
RESEND_API_KEY=re_...        # contact form emails
CONVERTKIT_API_KEY=...       # newsletter signups
```

### Vercel Deployment
1. Push to GitHub.
2. Import repo in Vercel — framework auto-detected as Next.js.
3. Add any optional env vars in Project Settings → Environment Variables.
4. Deploy.

`vercel.json` already sets security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

---

## Performance Notes

- All pages are statically generated — Time to First Byte is CDN-fast.
- Inter font uses `display: swap` — no layout shift.
- Images use `next/image` with remote pattern allowlist in `next.config.ts`.
- Search index is a compiled JS array — no network request at search time.
- `tailwindcss-animate` and `lucide-react` are tree-shaken at build time.
- Dark mode via `.dark` CSS class (next-themes) — no flash of unstyled content with `suppressHydrationWarning`.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15.3 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + CSS custom properties |
| Components | Shadcn UI (Radix primitives) |
| Icons | Lucide React |
| Theming | next-themes |
| Animation | tailwindcss-animate |
| Hosting | Vercel |
