import { OrderDto } from '../dto/order.dto';
import { OrderRepository } from '../repositories/order.repository';
export class OrderService {
    constructor(private orderRepository: OrderRepository) {}
    createOrder = async (userId: string, orderData: OrderDto) => {
        //return this.orderRepository.createOrder(orderData);
    }; 
}