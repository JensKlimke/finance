import Joi from 'joi'
import {validation} from "../utils/validation";


// define contract body
const body = Joi.object().keys({
  description: Joi.string().required(),
  creditor: Joi.string().required(),
  amount: Joi.number().required(),
  date: Joi.date().required(),
})

// generate contract validation
export const fakeInvoiceValidation = validation(body);
