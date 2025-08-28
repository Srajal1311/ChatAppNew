import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    let token;

    // 1. Check cookie first (for browser requests)
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    // 2. Check Authorization header (for Postman or other API clients)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1]; // Get token after "Bearer "
    }

    // 3. If no token found
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    // 5. Find user
    const user = await User.findById(decoded.userId).select("-password");
    console.log("Received token:", token);

    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    // 6. Attach user to request and continue
    req.user = user;
    next();

  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
