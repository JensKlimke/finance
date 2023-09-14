import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

export const ItemsDatabaseController = new RedisController('items', financeClient);
export const ItemsExpressController = expressController(ItemsDatabaseController);
