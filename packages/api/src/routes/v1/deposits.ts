import express from "express";
import {defaultRoutes} from "../../utils/router";
import {depositValidation} from "../../validations/deposits";
import {DepositsExpressController} from "../../controllers/deposits";

// create router
const router = express.Router();

defaultRoutes(router, depositValidation, DepositsExpressController);

export {router}
