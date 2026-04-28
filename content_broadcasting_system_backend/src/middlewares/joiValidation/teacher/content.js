import Joi from "joi";

const uploadContent = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("").optional(),
  subject: Joi.string().required(),
  start_time: Joi.date().iso().optional(),
  end_time: Joi.date().iso().optional(),
  rotation_order: Joi.number().integer().min(1).default(1),
  duration_minutes: Joi.number().integer().min(1).default(5),
});

export default { uploadContent };
