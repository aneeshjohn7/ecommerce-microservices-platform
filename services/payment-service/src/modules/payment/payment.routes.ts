import { Router } from "express";

import {
  processPayment,
  getPayment
} from "./payment.controller";


const router = Router();


router.post(
  "/",
  processPayment
);


router.get(
  "/:id",
  getPayment
);


export default router;