import express from "express";
import {defaultRoutes} from "../../utils/router";
import {expenseValidation} from "../../validations/expenses";
import {ExpensesExpressController} from "../../controllers/expenses";

// create router
const router = express.Router();

defaultRoutes(router, expenseValidation, ExpensesExpressController);

export {router}
