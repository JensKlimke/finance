import {expressController} from "../middlewares/controller";
import {RedisController} from "../utils/controller";
import {AccountsDatabaseController} from "./accounts";
import {financeClient} from "../config/redis";

const BalancesDatabaseController = new RedisController('balances', financeClient);
BalancesDatabaseController.setReferenceController(AccountsDatabaseController, 'account');
const BalancesExpressController = expressController(BalancesDatabaseController);

export {
  BalancesDatabaseController,
  BalancesExpressController
}
