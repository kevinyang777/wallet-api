const tokens = {};

exports.storeToken = (token, customer_xid) => {
  tokens[token] = customer_xid;
};

exports.validateToken = (token) => {
  return tokens[token];
};

exports.authorizeToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (!token) {
    const error = { message: "Unauthorized" };
    return res.status(401).json(error);
  }
  const customer_xid = exports.validateToken(token);
  if (!customer_xid) {
    const error = { message: "Invalid token" };
    return res.status(401).json(error);
  }
  req.customer_xid = customer_xid;
  next();
};
