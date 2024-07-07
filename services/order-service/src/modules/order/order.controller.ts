import { Request, Response } from "express";
import { create, findAll } from "./order.service";


export const createOrder = async (
  req: Request,
  res: Response
) => {

  const order = await create(req.body);

  res.status(201).json(order);
};


export const getOrders = async (
  req: Request,
  res: Response
) => {

  const orders = await findAll();

  res.json(orders);
};