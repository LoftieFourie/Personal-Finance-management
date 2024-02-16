const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized: Token not provided",
    });
  }

  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: Invalid token",
      });
    }

    req.user = decoded;
    next();
  });
};

exports.generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT, { expiresIn: "1h" });
};
