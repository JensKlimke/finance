import {expressController} from "../middlewares/controller";
import {financeClient} from "../config/redis";
import {RedisController} from "../utils/controller";

export const ExpensesDatabaseController = new RedisController('expenses', financeClient);
export const ExpensesExpressController = expressController(ExpensesDatabaseController);
