export function percentage(partialValue: number, totalValue: number) {
  const percentage = partialValue / totalValue * 100;
  return parseInt(percentage.toFixed(2));
}
