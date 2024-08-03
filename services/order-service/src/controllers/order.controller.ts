import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { asyncHandler } from '../utils/asyncHandler';
import { OrderDto } from '../dto/order.dto';
export class OrderController {
    constructor(private orderService: OrderService) {}
    createOrder = asyncHandler(async (req: Request, res: Response) => {
        const orderData = req.body as OrderDto;
        const userId = req.user!.userId;
        const order = await this.orderService.createOrder(orderData, userId);
        res.status(201).json(order); 
    });
}