export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
}

export function paginate<T>(items: T[], page: number, perPage = 12): { items: T[]; meta: PaginationMeta } {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, totalItems);

  return {
    items: items.slice(startIndex, endIndex),
    meta: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage: perPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex,
    },
  };
}

/** Generate page number array with ellipsis gaps — e.g. [1, '...', 4,5,6, '...', 12] */
export function getPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "ellipsis")[] = [];
  pages.push(1);

  if (current > 3) pages.push("ellipsis");

  const start = Math.max(2, current - 1);
  const end   = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}

/** Build SEO-canonical page URL */
export function buildPageUrl(basePath: string, page: number): string {
  if (page <= 1) return basePath;
  return `${basePath}?page=${page}`;
}
