const express = require("express");
const { signup, login } = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res
    .status(200)
    .json({ message: "Access generated to protected route.", user: req.user });
});
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
