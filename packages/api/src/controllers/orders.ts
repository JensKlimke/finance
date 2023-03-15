import {expressController} from "../middlewares/controller";
import {RedisController} from "../utils/controller";
import {AccountsDatabaseController} from "./accounts";
import {financeClient} from "../config/redis";

const OrdersDatabaseController = new RedisController('orders', financeClient);
OrdersDatabaseController.setReferenceController(AccountsDatabaseController, 'account');

const OrdersExpressController = expressController(OrdersDatabaseController);

export {
  OrdersDatabaseController,
  OrdersExpressController
}
