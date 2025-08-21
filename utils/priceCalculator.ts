export function calculateTotal(items: number[], taxRate: number): { itemTotal: number; tax: number; total: number } {
  const itemTotal = items.reduce((sum, price) => sum + price, 0);
  const tax = parseFloat((itemTotal * taxRate).toFixed(2));
  const total = parseFloat((itemTotal + tax).toFixed(2));
  return { itemTotal, tax, total };
}
