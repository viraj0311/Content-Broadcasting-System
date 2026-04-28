import Joi from "joi";

const idParam = Joi.object({
  id: Joi.number().integer().positive().required(),
});

const reject = Joi.object({
  rejection_reason: Joi.string().min(2).required(),
});

export default { idParam, reject };
