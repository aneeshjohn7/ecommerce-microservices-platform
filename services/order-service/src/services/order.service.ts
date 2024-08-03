import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../repositories/order.repository';
export class OrderService {
    constructor(private orderRepository: OrderRepository) {}
    async createOrder(orderData: OrderDto, userId: string) {
        //const order = await this.orderRepository.createOrder(orderData, userId);
        //return order;
    }   
}