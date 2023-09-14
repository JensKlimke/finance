import Joi from 'joi'
import {validation} from "../utils/validation";

const monthArray = (value: any) => {
  if (value.length !== 12) {
    return new Error('month array must be exactly 12 entries');
  }
  if (!value.every((v: any) => (typeof v === 'boolean'))) {
    return new Error('month array must contain only boolean values');
  }
  return value;
};


// define contract body
const body = Joi.object().keys({
  name: Joi.string().required(),
  creditor: Joi.string().required(),
  amount: Joi.number().positive().allow(0).required(),
  months: Joi.array().required().custom(monthArray),
  shared: Joi.boolean().required(),
})

// generate contract validation
export const contractValidation = validation(body);
