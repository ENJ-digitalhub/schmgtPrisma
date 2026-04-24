import prisma from "../../lib/prisma.js";

export async function createAdminProfileRepo(payload) {
  return prisma.admin.create({
    data: payload,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

export async function getAdminByEmailRepo(email) {
  return prisma.admin.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
}

export async function listAdminsRepo() {
  return prisma.admin.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}
