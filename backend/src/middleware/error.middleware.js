export function notFound(req, res) {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} not found`,
      details: {}
    },
    requestId: req.requestId
  });
}

export function errorHandler(err, req, res, _next) {
  console.error(err);

  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "Something went wrong",
      details: err.details || {}
    },
    requestId: req.requestId
  });
}