import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      res.status(401).json({
        message: "Unauthenticated User.",
        success: false,
      });

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY || "");
    if (!decodeToken)
      res.status(401).json({
        message: "Invalid token.",
        success: false,
      });

    req.id = decodeToken.userId;
    next();
  } catch (err) {
    console.log(err);
  }
};

export default isAuthenticated;