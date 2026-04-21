import prisma from '../../lib/prisma.js'

/**
 * Creates a new school admin in the database.
 *
 * @param {Object} payload - Admin data
 * @param {string} payload.email - Admin email
 * @param {string} payload.name - Admin name
 * @param {string} payload.password - Hashed password
 * @returns {Promise<Object>} Created admin record
 */

export async function createAdminRepo(payload) {
  const admin = await prisma.schoolAdmin.create({
    data: payload,
  });
  return admin;
}


/**
 * Retrieves a school admin by email from the database.
 *
 * @param {string} email - Admin email
 * @returns {Promise<Object|null>} Admin record or null if not found
 */
export async function getAdminRepo(email) {
  const admin = await prisma.schoolAdmin.findUnique({
    where: { email },
  });
  return admin;
}

