const express = require("express");

const protect = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;