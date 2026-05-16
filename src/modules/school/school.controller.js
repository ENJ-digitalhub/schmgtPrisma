import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  createAdmin,
  getAdminByEmail,
  listAdmins,
} from "./school.service.js";

export const createAdminController = asyncHandler(async (req, res) => {
  const admin = await createAdmin(req.body);

  res.status(201).json(
    apiResponse({
      message: "Admin created successfully",
      data: admin,
    })
  );
});

export const getAdminByEmailController = asyncHandler(async (req, res) => {
  const admin = await getAdminByEmail(req.params.email);

  res.json(
    apiResponse({
      message: "Admin fetched successfully",
      data: admin,
    })
  );
});

export const listAdminsController = asyncHandler(async (req, res) => {
  const admins = await listAdmins();

  res.json(
    apiResponse({
      message: "Admins fetched successfully",
      data: admins,
    })
  );
});
