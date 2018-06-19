import express from 'express';
import cookieParser from 'cookie-parser';
import serializer from './serializer';
import security from './security';

module.exports = createServer;

/**
 * Returns a server that is:
 *  - compatible with Express.js interfaces
 *  - able to parse cookies
 *
 * @param {Object} [options={}]
 * @param {Boolean} [options.enableSerializer=true]
 * @param {Boolean} [options.enableCookieParser=true]
 * @param {Boolean} [options.enableContentSecurityPolicy=true]
 * @param {Boolean} [options.enableHttpHeadersSecurity=true]
 * @param {Object} [contentSecurityPolicy={}]
 *
 * @return {express.Application}
 */
export default function createServer({
  enableSerializer = true,
  enableCookieParser = true,
  enableHttpHeadersSecurity = true,
  enableContentSecurityPolicy = true,
  contentSecurityPolicy = {},
} = {}) {
  const server = express();
  if (enableCookieParser) {
    server.use(cookieParser());
  }
  if (enableSerializer) {
    server.use(serializer());
  }
  if (enableHttpHeadersSecurity) {
    server.use(security.httpHeaders());
  }
  if (enableContentSecurityPolicy) {
    const x = security.contentSecurityPolicy(contentSecurityPolicy);
    server.use(x);
  }

  return server;
}
