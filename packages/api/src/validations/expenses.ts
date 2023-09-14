import Joi from 'joi'
import {validation} from "../utils/validation";


// define contract body
const body = Joi.object().keys({
  description: Joi.string().required(),
  category: Joi.string().allow('material', 'service', 'tools').required(),
  creditor: Joi.string().required(),
  amount: Joi.number().required(),
  account: Joi.string().required(),
  date: Joi.date().required(),
  invoice: Joi.string().allow('yes', 'no').required(),
  payer: Joi.string().allow('Cathrin', 'Jens', 'joint').required(),
  item: Joi.string().required(),
})

// generate contract validation
export const expenseValidation = validation(body);
