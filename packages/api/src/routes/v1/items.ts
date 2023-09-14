import express from "express";
import {defaultRoutes} from "../../utils/router";
import {itemsValidation} from "../../validations/items";
import {ItemsExpressController} from "../../controllers/items";

// create router
const router = express.Router();

defaultRoutes(router, itemsValidation, ItemsExpressController);

export {router}
