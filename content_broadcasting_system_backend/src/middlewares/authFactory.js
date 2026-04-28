import { verifyToken } from "../utils/jwt.js";

export const makeRoleAuth = (requiredRole) => ({
  required: (req, res, next) => {
    try {
      const authHeader = req.headers.authorization || "";
      const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (!token) {
        return res.status(401).json({
          code: 401,
          status: false,
          message: "Unauthorized",
          data: [],
        });
      }

      const payload = verifyToken(token);
      if (payload.role !== requiredRole) {
        return res.status(403).json({
          code: 403,
          status: false,
          message: "Forbidden",
          data: [],
        });
      }

      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({
        code: 401,
        status: false,
        message: "Invalid token",
        data: [],
      });
    }
  },
});
