import { Request, Response } from "express";

import {
  create,
  findAll
} from "./catalog.service";


export const createProduct = async (
  req: Request,
  res: Response
) => {


  const product = await create(req.body);


  res.status(201).json(product);

};



export const getProducts = async (
  req: Request,
  res: Response
) => {


  const products = await findAll();


  res.json(products);

};