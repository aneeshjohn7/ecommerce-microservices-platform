import { Request, Response } from 'express';

import { createPayment, findPayment } from './payment.service';

export const processPayment = async (
  req: Request,

  res: Response,
) => {
  const payment = await createPayment(req.body);

  res.status(201).json(payment);
};

export const getPayment = async (
  req: Request,

  res: Response,
) => {
  const id = req.params.id;

  if (Array.isArray(id)) {
    throw new Error('Invalid id');
  }

  const payment = await findPayment(id);

  res.json(payment);
};
