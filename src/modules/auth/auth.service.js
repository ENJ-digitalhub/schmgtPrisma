import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  updateRefreshToken,
  findUserById,
} from "./auth.repository.js";

import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../lib/jwt.js";



import prisma from "../../lib/prisma.js";



export async function register({ email, password, role, name }) {
  const existing = await findUserByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);

  const user = await createUser({
    email,
    password: hashed,
    role,
  });



  // create role profile
  if (role === "ADMIN") {
    await prisma.admin.create({
      data: { userId: user.id, name },
    });
  }

  const accessToken = signAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = signRefreshToken({
    id: user.id,
  });

  await updateRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
}



// login function
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
}