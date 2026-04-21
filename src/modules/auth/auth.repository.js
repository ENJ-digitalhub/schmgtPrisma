import prisma from "../../lib/prisma.js";

export async function createUser(data) {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

export async function updateRefreshToken(userId, token) {
  return prisma.user.update({
    where: { id: userId },
    data: { refreshToken: token },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}