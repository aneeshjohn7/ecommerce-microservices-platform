import prisma from './config/database';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { CatalogService } from './services/catalog.service';
import { OrderRepository } from './repositories/order.repository';


// Repositories
const orderRepository = new OrderRepository(prisma);
const catalogService = new CatalogService();

// Services
const orderService = new OrderService(orderRepository, catalogService);

// Controllers
export const orderController = new OrderController(orderService);