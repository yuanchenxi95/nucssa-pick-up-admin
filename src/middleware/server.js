const express = require('express')
const app = express()
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const path = require('path')

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://nucssa.auth0.com/.well-known/jwks.json',
  }),

  // Validate the audience and the issuer.
  audience: '{YOUR_API_IDENTIFIER}',
  issuer: 'https://nucssa.auth0.com/',
  algorithms: ['RS256'],
})


app.get('/api/login', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.',
  })
})