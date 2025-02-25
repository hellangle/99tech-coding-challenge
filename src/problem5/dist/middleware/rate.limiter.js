"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1000, // 1 second
    max: 1, // Limit each IP to 1 request per windowMs
    message: { message: "Too many requests, please try again later." },
    standardHeaders: true, // Return rate limit info in the headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
