import { Router } from "express";

import {
  createProduct,
  getProducts
} from "./catalog.controller";


const router = Router();


router.post(
  "/products",
  createProduct
);


router.get(
  "/products",
  getProducts
);


export default router;