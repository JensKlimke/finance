import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

export const DatabaseController = new RedisController('deposits', financeClient);
export const DepositsExpressController = expressController(DatabaseController);
