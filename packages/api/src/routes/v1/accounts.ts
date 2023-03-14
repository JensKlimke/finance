import {defaultRoutes} from "../../utils/router";
import {accountsValidation} from "../../validations/accounts";
import {AccountsExpressController} from "../../controllers/accounts";
import express from "express";

// create router and define routes
const router = express.Router();
defaultRoutes(router, accountsValidation, AccountsExpressController);

// export
export {
  router as accountsRouter,
}
