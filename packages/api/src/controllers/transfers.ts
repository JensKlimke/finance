import {expressController} from "../middlewares/controller";
import {RedisController} from "../utils/controller";
import {financeClient} from "../config/redis";

export const TransfersDatabaseController = new RedisController('transfers', financeClient);
export const TransfersExpressController = expressController(TransfersDatabaseController);
