import express from "express";
import {defaultRoutes} from "../../utils/router";
import {balancesValidation} from "../../validations/balances";
import {BalancesExpressController} from "../../controllers/balances";

// create router
const router = express.Router();
defaultRoutes(router, balancesValidation, BalancesExpressController);

export {
  router as balancesRouter,
}
