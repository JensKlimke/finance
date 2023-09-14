import Joi from 'joi'
import {validation} from "../utils/validation";


// define contract body
const body = Joi.object().keys({
  description: Joi.string().required(),
  units: Joi.number().default(0),
  unitPrice: Joi.number().default(0),
  area: Joi.number().default(0),
  areaPrice: Joi.number().default(0),
  group: Joi.string().default(''),
  comment: Joi.string().allow('')
})

// generate contract validation
export const itemsValidation = validation(body);
