export const insertId = (pathWithIdParam: string, id: string): string =>
  pathWithIdParam.replace(':id', id)
