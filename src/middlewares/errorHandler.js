const errorHandler = (error, req, res) => {
  const { status = 500, message } = error;
  res.status(status).json({
    status,
    message: message || 'Something went wrong',
    data: error.message,
  });
};

export default errorHandler;
