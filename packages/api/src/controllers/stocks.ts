import {expressController} from "../middlewares/controller";
import {RedisController} from "../utils/controller";
import {financeClient} from "../config/redis";

export const StocksDatabaseController = new RedisController('stocks', financeClient);
export const StocksExpressController = expressController(StocksDatabaseController);
