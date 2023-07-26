// authorise by role
const authorize = (requiredRole) => (req, res, next) => {
  if (req.userRole !== requiredRole) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = { authorize };
