import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createTeacher, listTeachers } from "./teacher.service.js";

export const listTeachersController = asyncHandler(async (req, res) => {
  const teachers = await listTeachers();

  res.json(
    apiResponse({
      message: "Teachers fetched successfully",
      data: teachers,
    })
  );
});

export const createTeacherController = asyncHandler(async (req, res) => {
  const teacher = await createTeacher(req.body);

  res.status(201).json(
    apiResponse({
      message: "Teacher scaffold created successfully",
      data: teacher,
    })
  );
});
