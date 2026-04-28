const validate = (schemas) => (req, res, next) => {
  const targets = ["body", "query", "params"];

  for (const key of targets) {
    if (!schemas[key]) continue;
    const { error, value } = schemas[key].validate(req[key], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res.status(422).json({
        code: 422,
        status: false,
        message: "Validation failed",
        data: error.details.map((item) => item.message),
      });
    }
    req[key] = value;
  }

  next();
};

export default validate;
