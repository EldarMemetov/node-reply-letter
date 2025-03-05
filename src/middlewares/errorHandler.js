const errorHandler = (error, req, res, next) => {
  console.error(error.stack);

  const { status = 500, message } = error;

  res.status(status).json({
    status,
    message: message || 'Something went wrong',
  });

  next();
};

export default errorHandler;
