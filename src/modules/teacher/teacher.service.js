import eventBus from "../../lib/eventBus.js";
import { TEACHER_EVENTS } from "./teacher.events.js";
import { createTeacherRepo, listTeachersRepo } from "./teacher.repository.js";

export async function listTeachers() {
  return listTeachersRepo();
}

export async function createTeacher(payload) {
  const { email, name } = payload;

  if (!email || !name) {
    throw new Error("email and name are required");
  }

  const teacher = await createTeacherRepo({
    email,
    name,
    role: "TEACHER",
  });

  eventBus.emit(TEACHER_EVENTS.CREATED, teacher);

  return teacher;
}
