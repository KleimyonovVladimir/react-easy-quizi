import { Pagination } from "../types";

export const parsePagination = (pagination: Pagination) => {
  const { page, pageSize } = pagination;

  const parsedPage = parseInt(page || "1");
  const parsedSize = parseInt(pageSize || "-1");

  if (parsedSize !== -1) {
    return {
      offset: (parsedPage - 1) * parsedSize,
      limit: parsedSize,
    };
  }

  return {
    offset: 0,
  };
};
