import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

export const ContractsDatabaseController = new RedisController('contracts', financeClient);
export const ContractsExpressController = expressController(ContractsDatabaseController);
