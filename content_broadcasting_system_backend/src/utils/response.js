export const errorResponse = (err, res) => {
  const statusCode = err?.statusCode || 400;
  const message = err?.message || "Something went wrong";
  const data = err?.data || [];

  return res.status(statusCode).json({
    code: statusCode,
    status: false,
    message,
    data,
  });
};

export const successResponse = (
  result = [],
  message = "Success",
  res,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: true,
    message,
    data: result,
  });
};
