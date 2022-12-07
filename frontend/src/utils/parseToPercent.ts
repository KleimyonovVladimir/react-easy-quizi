export const parseToPercent = (value: string): string => {
  return `${Number(value.slice(0, -1)).toFixed(2)}%`
}
