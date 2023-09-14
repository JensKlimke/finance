import Joi from 'joi'
import {isValidUUID, validation} from "../utils/validation";

export const accountReference ={
  account: Joi.custom(isValidUUID).required(),
};


// define stock body
const body = Joi.object().keys({
  name: Joi.string().required(),
})

// generate contract validation
export const accountsValidation = validation(body);
