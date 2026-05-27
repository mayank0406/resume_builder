const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    let token;

    // get token from headers
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    // no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    // verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    // find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = protect;