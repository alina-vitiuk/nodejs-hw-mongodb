import createHttpError from 'http-errors';

export const errorHandler = (error, _req, res, _next) => {
  if (createHttpError.isHttpError(error) === true) {
    return res
      .status(error.status)
      .json({ status: error.status, message: 'Something went wrong' });
  }

  console.error(error);

  res.status(500).json({ status: 500, message: 'Internal server error' });
};
