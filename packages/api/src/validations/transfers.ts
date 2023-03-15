import Joi from 'joi'
import {validation} from "../utils/validation";


// define contract body
const TransferBody = Joi.object().keys({
  amount: Joi.number().required(),
  description: Joi.string(),
})

// generate contract validation
export const transferValidation = validation(TransferBody);
