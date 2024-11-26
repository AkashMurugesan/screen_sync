const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Internal Server Error' } = err;

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export default errorHandler;
