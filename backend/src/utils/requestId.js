import crypto from "crypto";

export function requestIdMiddleware(req, res, next) {
  const requestId = req.headers["x-request-id"] || `req_${crypto.randomUUID()}`;
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
}