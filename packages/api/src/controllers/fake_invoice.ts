import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

export const controller = new RedisController('fake-invoices', financeClient);
export const FakeInvoiceExpressController = expressController(controller);
