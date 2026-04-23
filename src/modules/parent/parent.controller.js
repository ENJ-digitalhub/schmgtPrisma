import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createParent, listParents } from "./parent.service.js";

export const listParentsController = asyncHandler(async (req, res) => {
  const parents = await listParents();

  res.json(
    apiResponse({
      message: "Parents fetched successfully",
      data: parents,
    })
  );
});

export const createParentController = asyncHandler(async (req, res) => {
  const parent = await createParent(req.body);

  res.status(201).json(
    apiResponse({
      message: "Parent scaffold created successfully",
      data: parent,
    })
  );
});
