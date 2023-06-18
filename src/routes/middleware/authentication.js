const jwt = require('jsonwebtoken');

function authentication(req, res, next) {
  try {
    const userToken = req.headers.authorization;
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    if (decoded) next();
  } catch (err) {
    res.status(401).send();
    return;
  }
}

module.exports = authentication;
