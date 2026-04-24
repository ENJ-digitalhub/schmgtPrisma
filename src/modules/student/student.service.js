import eventBus from "../../lib/eventBus.js";
import { STUDENT_EVENTS } from "./student.events.js";
import { createStudentRepo, listStudentsRepo } from "./student.repository.js";

export async function listStudents() {
  return listStudentsRepo();
}

export async function createStudent(payload) {
  const { email, firstName, lastName } = payload;

  if (!email || !firstName || !lastName) {
    throw new Error("email, firstName, and lastName are required");
  }

  const student = await createStudentRepo({
    email,
    firstName,
    lastName,
    role: "STUDENT",
  });

  eventBus.emit(STUDENT_EVENTS.CREATED, student);

  return student;
}
