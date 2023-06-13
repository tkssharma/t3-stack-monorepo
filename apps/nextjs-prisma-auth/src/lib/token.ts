import { getEnvVariables } from "./helpers";
import jwt from "jsonwebtoken";

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = getEnvVariables("JWT_SECRET_KEY");
    console.log(secret);
    const token = jwt.sign(payload, secret, { expiresIn: options.exp });
    console.log(token);
    return token;
  } catch (err) {
    throw err;
  }
};

export const verifyJWT = async (token: string): Promise<any> => {
  try {
    const secret = getEnvVariables("JWT_SECRET_KEY");
    const verify = jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Your token has expired.");
  }
};
