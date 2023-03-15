import Joi from 'joi'
import {validation} from "../utils/validation";

// define stock body
const Body = Joi.object().keys({
  symbol: Joi.string().required(),
  name: Joi.string().required(),
  quantity: Joi.number().required(),
  purchase: Joi.number().required(),
  value: Joi.number().required(),
})

// generate contract validation
export const stocksValidation = validation(Body);
