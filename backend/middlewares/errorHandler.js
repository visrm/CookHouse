const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the error for debugging

  const status = err.status || 500;
  const response = {
    error: {
      message: err.message || "Internal Server Error.",
      success: false,
    },
  };

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({
      message: "File size too large. Max 5MB allowed.",
      success: false,
    });
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({
      message: "Request payload too large.",
      success: false,
    });
  }

  if (process.env.NODE_ENV !== "production") {
    response.error.stack = err.stack;
  }

  res.status(status).json(response);
};

export default errorHandler;
