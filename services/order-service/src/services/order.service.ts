import { OrderDto } from '../dto/order.dto';
import { AppError } from '../errors/AppError';
import { OrderRepository } from '../repositories/order.repository';
import { CatalogService } from '../services/catalog.service';
import {
  calculateTax,
  calculateShipping,
  generateOrderNumber,
} from '../utils/order-utils';

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private catalogService: CatalogService,
  ) {}
  async createOrder(orderData: OrderDto, userId: string) {
    const products = await this.catalogService.getProducts(
      orderData.items.map((item) => item.productId),
    );
    // 2. Validate products and calculate totals
    const orderItems = orderData.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product || product.status !== 'ACTIVE') {
        throw new AppError('Product unavailable', 400);
      }

      if (item.quantity <= 0) {
        throw new AppError('Invalid quantity', 400);
      }

      return {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      };
    });

    const subtotal = orderItems.reduce(
      (total, item) => total + item.subtotal,
      0,
    );

    const tax = calculateTax(subtotal);
    const shipping = calculateShipping(orderItems);
    const discount = 0;
    const grandTotal = subtotal + tax + shipping - discount;
    const orderNumber = generateOrderNumber();

    // 3. Persist the order atomically
    return this.orderRepository.createOrder({
      userId,
      orderNumber,
      status: 'PENDING',
      subtotal,
      tax,
      shipping,
      discount,
      grandTotal,

      items: {
        create: orderItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
      },

      shippingAddress: {
        create: {
          name: orderData.shippingAddress.name,
          phone: orderData.shippingAddress.phone,
          address: orderData.shippingAddress.address,
          city: orderData.shippingAddress.city,
          province: orderData.shippingAddress.province,
          postalCode: orderData.shippingAddress.postalCode,
          country: orderData.shippingAddress.country,
        },
      },
      statusHistory: {
        create: {
          status: 'PENDING',
          changedAt: new Date(),
          changedBy: userId,
        },
      },
      events: {
        create: {
          eventName: 'ORDER_CREATED',
          payload: JSON.stringify({
            orderNumber,
            userId,
            items: orderItems,
            subtotal,
            tax,
            shipping,
            discount,
            grandTotal,
          }),
          createdAt: new Date(),
        },
      },

    });
  }
}
