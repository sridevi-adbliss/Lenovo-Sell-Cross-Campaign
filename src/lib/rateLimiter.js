// src/lib/rateLimiter.js
import rateLimit from 'express-rate-limit';

// Create a reusable rate limiter factory
export function createRateLimiter(options = {}) {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes default
    max: 100, // 100 requests per window default
    message: {
      success: false,
      message: 'Too many requests, please try again later.'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) => {
      // Use IP address as the key
      return req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.connection?.remoteAddress || 
             'unknown';
    },
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later.'
      });
    },
    ...options
  });
}

// Pre-configured limiters for different use cases
export const formSubmitLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 form submissions per IP
  message: {
    success: false,
    message: 'Too many form submissions. Please try again later.'
  }
});

export const apiLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // 1000 requests per hour
  message: {
    success: false,
    message: 'Too many requests. Please slow down.'
  }
});