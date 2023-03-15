import express from "express";
import {defaultRoutes} from "../../utils/router";
import {ordersValidation} from "../../validations/orders";
import {OrdersExpressController} from "../../controllers/orders";

// create router
const router = express.Router();
defaultRoutes(router, ordersValidation, OrdersExpressController);

export {
  router as ordersRouter,
}
