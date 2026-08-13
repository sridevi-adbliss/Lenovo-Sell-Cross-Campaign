// src/lib/nextRateLimit.js
import { NextResponse } from 'next/server';

/**
 * Wrapper to use express-rate-limit with Next.js App Router
 */
export async function runRateLimiter(req, limiter) {
  return new Promise((resolve, reject) => {
    // Create a mock Express-like request object
    const mockReq = {
      headers: Object.fromEntries(req.headers),
      ip: req.headers.get('x-forwarded-for') || 
          req.headers.get('x-real-ip') || 
          'unknown',
      connection: {
        remoteAddress: req.headers.get('x-forwarded-for') || 'unknown'
      },
      // Add any other properties express-rate-limit might need
    };

    // Create a mock Express-like response object
    let statusCode = 200;
    let responseData = null;
    let responseHeaders = {};

    const mockRes = {
      status: function(code) {
        statusCode = code;
        return this;
      },
      json: function(data) {
        responseData = data;
        return this;
      },
      setHeader: function(key, value) {
        responseHeaders[key] = value;
        return this;
      },
      getHeader: function(key) {
        return responseHeaders[key];
      },
      removeHeader: function(key) {
        delete responseHeaders[key];
        return this;
      },
      // Add other methods as needed
    };

    // Run the rate limiter
    limiter(mockReq, mockRes, (error) => {
      if (error) {
        reject(error);
      } else if (statusCode === 429) {
        // Rate limited
        resolve({
          limited: true,
          status: statusCode,
          data: responseData,
          headers: responseHeaders
        });
      } else {
        // Not rate limited - proceed
        resolve({
          limited: false,
          status: statusCode,
          data: responseData,
          headers: responseHeaders
        });
      }
    });
  });
}