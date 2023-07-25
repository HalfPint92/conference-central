// authentication logic
const jwt = require("jsonwebtoken");
const secretkey = "secretkey";

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenWithoutBearer, secretkey);

    req.user = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authenticate };
