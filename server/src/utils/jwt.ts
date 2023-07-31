import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET || "";
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET || "";
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.error(error);
    return null;
  }
};
