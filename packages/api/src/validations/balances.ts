import Joi from 'joi'
import {validation} from "../utils/validation";
import {accountReference} from "./accounts";

// define stock body
const body = Joi.object().keys({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  description: Joi.string().allow(''),
});

// generate contract validation
export const balancesValidation = validation(body, accountReference);
