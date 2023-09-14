import express from "express";
import {defaultRoutes} from "../../utils/router";
import {FakeInvoiceExpressController} from "../../controllers/fake_invoice";
import {fakeInvoiceValidation} from "../../validations/fake_invoice";

// create router
const router = express.Router();

defaultRoutes(router, fakeInvoiceValidation, FakeInvoiceExpressController);

export {router}
