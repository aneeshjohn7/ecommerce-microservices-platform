import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
export class OrderController {
    constructor(private orderService: OrderService) {}
    createOrder = async (req: Request, res: Response) => {
        // Logic to create an order
        res.status(201).json({ message: 'Order created successfully' });
    }
}