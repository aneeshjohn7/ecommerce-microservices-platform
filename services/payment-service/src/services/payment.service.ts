interface OrderCreatedEvent {
  id: string;
  totalAmount: number;
}

export async function processMockPayment(order: OrderCreatedEvent) {
  console.log(`Processing mock payment for order: ${order.id}`);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Simulate successful payment
  return {
    orderId: order.id,
    status: 'SUCCESS',
    message: 'Payment processed successfully',
  };
}
