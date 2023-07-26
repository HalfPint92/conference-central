// authenticated routes
const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user/role", authController.getUserRole);
router.get("/google-login-url", authController.getGoogleLoginUrl);
router.get("/google-login-callback", authController.getGoogleLoginCallback);
router.get("/facebook-login-url", authController.getFacebookLoginUrl);
router.get("/facebook-login-callback", authController.getFacebookLoginCallback);

module.exports = router;
