import eventBus from "../../lib/eventBus.js";
import { createAuthUser } from "../auth/auth.service.js";
import { SCHOOL_EVENTS } from "./school.events.js";
import {
  createAdminProfileRepo,
  getAdminByEmailRepo,
  listAdminsRepo,
} from "./school.repository.js";

function toAdminResponse(admin) {
  return {
    id: admin.id,
    name: admin.name,
    schoolName: admin.school_name,
    user: admin.user,
  };
}

export async function createAdmin(payload) {
  const { email, password, name, schoolName } = payload;

  if (!email || !password || !name || !schoolName) {
    throw new Error("email, password, name, and schoolName are required");
  }

  const user = await createAuthUser({
    email,
    password,
    role: "ADMIN",
  });

  const admin = await createAdminProfileRepo({
    userId: user.id,
    name,
    school_name: schoolName,
  });

  const response = toAdminResponse(admin);

  eventBus.emit(SCHOOL_EVENTS.ADMIN_CREATED, response);

  return response;
}

export async function getAdminByEmail(email) {
  if (!email) {
    throw new Error("email is required");
  }

  const admin = await getAdminByEmailRepo(email);

  if (!admin) {
    const error = new Error("Admin not found");
    error.statusCode = 404;
    throw error;
  }

  return toAdminResponse(admin);
}

export async function listAdmins() {
  const admins = await listAdminsRepo();
  return admins.map(toAdminResponse);
}
