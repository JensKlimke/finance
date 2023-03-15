import express from "express";
import {defaultRoutes} from "../../utils/router";
import {stocksValidation} from "../../validations/stocks";
import {StocksExpressController} from "../../controllers/stocks";

const router = express.Router();
defaultRoutes(router, stocksValidation, StocksExpressController);

export {router}
