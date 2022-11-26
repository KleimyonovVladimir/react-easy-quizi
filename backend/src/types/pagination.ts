export interface Pagination {
  page?: string;
  pageSize?: string;
}

export interface SequelizePagination {
  offset: number;
  limit?: number;
}
