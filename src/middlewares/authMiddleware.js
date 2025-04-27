const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer Token
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Decode Include User ID
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid Token." });
  }
};
module.exports = authenticateToken;
