import Joi from 'joi'
import {validation} from "../utils/validation";


// define contract body
const body = Joi.object().keys({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  payer: Joi.string().allow('Cathrin', 'Jens').required(),
  comment: Joi.string().required().allow(''),
})

// generate contract validation
export const depositValidation = validation(body);
