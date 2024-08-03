import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../repositories/order.repository';
import { CatalogService } from '../services/catalog.service';
export class OrderService {
  constructor(private orderRepository: OrderRepository, private catalogService: CatalogService) {}
  async createOrder(orderData: OrderDto, userId: string) {
    const products = await this.catalogService.getProducts(
      orderData.items.map((item) => item.productId),
    );
    return products;
    //const order = await this.orderRepository.createOrder(orderData, userId);
    //return order;
  }
}
