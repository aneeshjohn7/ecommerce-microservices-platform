import prisma from './config/database';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderRepository } from './repositories/order.repository';


// Repositories
const orderRepository = new OrderRepository(prisma);

// Services
const orderService = new OrderService(orderRepository);

// Controllers
export const orderController = new OrderController(orderService);