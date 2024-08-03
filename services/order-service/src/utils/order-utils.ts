interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

// Dummy tax calculation: 13% tax
export function calculateTax(subtotal: number): number {
  return Number((subtotal * 0.13).toFixed(2));
}

// Dummy shipping calculation: $10 per order
export function calculateShipping(orderItems: OrderItem[]): number {
  if (orderItems.length === 0) {
    return 0;
  }

  return 10;
}

// function to generate a unique order number (for simplicity, using timestamp)
export function generateOrderNumber(): string {
  return `ORD-${Date.now()}`;
} 