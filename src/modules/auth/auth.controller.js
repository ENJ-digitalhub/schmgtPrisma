import {
  getCurrentUser,
  register,
  login,
  refreshToken,
  logout,
} from "./auth.service.js";


import { apiResponse } 
        from "../../utils/apiResponse.js";
import { asyncHandler } 
        from "../../utils/asyncHandler.js";


/**
 * REGISTER
 */
export const registerController = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken: rToken } =
    await register(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", rToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json(
    apiResponse({
      message: "User registered successfully",
      data: user,
    })
  );
});

/**
 * LOGIN
 */
export const loginController = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken: rToken } =
    await login(req.body);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", rToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json(
    apiResponse({
      message: "Login successful",
      data: user,
    })
  );
});

/**
 * 
 */
export const refreshController = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  const { accessToken } = await refreshToken(token);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.json(
    apiResponse({
      message: "Token refreshed successfully",
    })
  );
});

/**
 * LOGOUT
 */
export const logoutController = asyncHandler(async (req, res) => {
  await logout(req.user.id);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.json(
    apiResponse({
      message: "Logged out successfully",
    })
  );
});

export const currentUserController = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.json(
    apiResponse({
      message: "Current user fetched successfully",
      data: user,
    })
  );
});
