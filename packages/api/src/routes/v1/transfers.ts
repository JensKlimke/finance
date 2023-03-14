import express from "express";
import {defaultRoutes} from "../../utils/router";
import {transferValidation} from "../../validations/transfers";
import {TransfersExpressController} from "../../controllers/transfers";

const router = express.Router();

defaultRoutes(router, transferValidation, TransfersExpressController);

export {router}
