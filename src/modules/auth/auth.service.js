import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  findSafeUserById,
  updateRefreshToken,
  findUserById,
} from "./auth.repository.js";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt.js";
import eventBus from "../../lib/eventBus.js";
import { AUTH_EVENTS } from "./auth.events.js";

/**
 * Create a reusable authentication identity for any domain module.
 *
 * @param {{email: string, password: string, role: string}} payload
 * @returns {Promise<object>}
 */
export async function createAuthUser({ email, password, role }) {
  if (!email || !password || !role) {
    throw new Error("email, password, and role are required");
  }

  const normalizedRole = role.toUpperCase();
  const existing = await findUserByEmail(email);

  if (existing) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return createUser({
    email,
    password: hashedPassword,
    role: normalizedRole,
  });
}

/**
 * 
 * @param {string} email
 * @param {string} password
 * @param {string} role
 * @param {string} name 
 * @returns Promise<{ user: object, accessToken: string, refreshToken: string }>
 * @throws {Error} If user already exists
 */

export async function register({ email, password, role, name }) {
  const user = await createAuthUser({
    email,
    password,
    role,
  });

  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    id: user.id,
  });

  await updateRefreshToken(user.id, refreshToken);

  eventBus.emit(AUTH_EVENTS.USER_REGISTERED, {
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, accessToken, refreshToken };
}

/**
 * 
 * @param {Object} logIn_payload -payload for login
 * @param {string} logIn_payload.email - email of the user
 * @param {string} logIn_payload.password - password of the user
 * @returns Promise<{ user: object, accessToken: string, refreshToken: string }>
 * @throws {Error} If credentials are invalid
 */

export async function login({ email, password }) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    id: user.id,
  });

  await updateRefreshToken(user.id, refreshToken);

  eventBus.emit(AUTH_EVENTS.USER_LOGGED_IN, {
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, accessToken, refreshToken };
}



export async function refreshToken(oldToken) {
  if (!oldToken) throw new Error("No refresh token");

  const decoded = verifyRefreshToken(oldToken);

  const user = await findUserById(decoded.id);

  if (!user || user.refreshToken !== oldToken) {
    throw new Error("Invalid refresh token");
  }

  const newAccessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  return { accessToken: newAccessToken };
}




export async function logout(userId) {
  await updateRefreshToken(userId, null);
  eventBus.emit(AUTH_EVENTS.USER_LOGGED_OUT, {
    userId,
  });
}

export async function getCurrentUser(userId) {
  const user = await findSafeUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
