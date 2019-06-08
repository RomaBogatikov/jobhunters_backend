// middleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
// function will look for the token in the request body, query string, headers, or cookies in that order and then validate it.
const withAuth = function(req, res, next) {
  console.log('req.body from withAuth=', req)
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.username = decoded.username;
        next();
      }
    });
  }
}
module.exports = withAuth;
