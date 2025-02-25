import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 1, // Limit each IP to 1 request per windowMs
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true, // Return rate limit info in the headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});