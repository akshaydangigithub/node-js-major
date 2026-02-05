export const genratedError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (err.name === "ValidationError") {
    err.message = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
  }

  if (err.name === "MongoServerError" && err.message.includes("E11000")) {
    err.message = "User with this email already exists";
  }

  return res.status(statusCode).json({
    errName: err.name,
    success: false,
    message: err.message,
  });
};
