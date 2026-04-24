import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createStudent, listStudents } from "./student.service.js";

export const listStudentsController = asyncHandler(async (req, res) => {
  const students = await listStudents();

  res.json(
    apiResponse({
      message: "Students fetched successfully",
      data: students,
    })
  );
});

export const createStudentController = asyncHandler(async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).json(
    apiResponse({
      message: "Student scaffold created successfully",
      data: student,
    })
  );
});
