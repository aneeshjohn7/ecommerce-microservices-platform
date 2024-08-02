import { OrderRepository } from '../repositories/order.repository';
export class OrderService {
    constructor(private orderRepository: OrderRepository) {}
}