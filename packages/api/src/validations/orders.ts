import Joi from 'joi'
import {validation} from "../utils/validation";
import {accountReference} from "./accounts";

// define stock body
const body = Joi.object().keys({
  type: Joi.string().required().valid('dividend', 'savings_plan', 'purchase', 'sale', 'other'),
  amount: Joi.number().required(),
  date: Joi.date().required(),
  description: Joi.string().allow(''),
})

// generate contract validation
export const ordersValidation = validation(body, accountReference);
