import env from "../config/env";
import jwt from "jsonwebtoken";

const access_token = env.jwt_secret_access_token;
const refresh_token = env.jwt_secret_refresh_token;

export function signAccessToken(payload) {
  return jwt.sign(payload, access_token, { expiresIn: "15m" });
}

export function signRefreshToken(payload) {
  return jwt.sign(payload, refresh_token, { expiresIn: "7d" });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, access_token);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, refresh_token);
}