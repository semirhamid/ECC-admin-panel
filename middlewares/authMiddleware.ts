// middleware/authMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

interface NextApiRequestWithUser extends NextApiRequest {
  user?: UserPayload;
}

const authMiddleware =
  (handler: NextApiHandler) =>
  async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ error: "No token provided." });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "",
      ) as UserPayload;
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }
  };

export default authMiddleware;
