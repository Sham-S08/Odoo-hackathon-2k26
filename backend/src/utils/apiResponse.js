export function ok(res, data = {}, message = "Success", status = 200, requestId) {
  return res.status(status).json({
    success: true,
    data,
    message,
    requestId
  });
}

export function fail(res, code, message, details = {}, status = 400, requestId) {
  return res.status(status).json({
    success: false,
    error: { code, message, details },
    requestId
  });
}