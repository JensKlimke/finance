import express from "express";
import {ContractsExpressController} from "../../controllers/contracts";
import {contractValidation} from "../../validations/contracts";
import {defaultRoutes} from "../../utils/router";

// create router
const router = express.Router();

defaultRoutes(router, contractValidation, ContractsExpressController);

export {router}
