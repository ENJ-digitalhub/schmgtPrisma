import { apiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { createSchoolRecord, getSchoolModuleStatus } from './school.service.js';

export const getSchoolStatus = asyncHandler(async (req, res) => {
  const data = await getSchoolModuleStatus();

  res.status(200).json(
    apiResponse({
      message: 'School module is ready',
      data,
    }),
  );
});

export const createSchool = asyncHandler(async (req, res) => {
  const school = await createSchoolRecord(req.body);

  res.status(201).json(
    apiResponse({
      message: 'School created successfully',
      data: school,
    }),
  );
});
