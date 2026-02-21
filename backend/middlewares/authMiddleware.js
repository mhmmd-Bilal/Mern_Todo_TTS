import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token = req.cookies.jwt;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Users.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized,token failed" });
  }
};

export { protect };
