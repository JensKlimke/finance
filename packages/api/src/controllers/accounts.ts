import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

// get controller

// generate controller object
export const AccountsDatabaseController = new RedisController('accounts', financeClient);
export const AccountsExpressController = expressController(AccountsDatabaseController);
