export function calculateTotal(amounts: string): number {
  if (!amounts.trim()) return 0;
  
  return amounts
    .split(/[\n,]+/)
    .map(amt => amt.trim())
    .filter(amt => amt !== '')
    .reduce((sum, num) => sum + (parseFloat(num) || 0), 0);
}

