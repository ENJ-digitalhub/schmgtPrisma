import {
  getCurrentUser,
  login,
  logout,
  refreshToken,
  register,
} from './auth.service.js';
import { env } from '../../config/env.js';
import { apiResponse } from '../../utils/apiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const isProduction = env.nodeEnv === 'production';
const baseCookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: isProduction ? 'strict' : 'lax',
  secure: isProduction,
};
const accessTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 15 * 60 * 1000,
};
const refreshTokenCookieOptions = {
  ...baseCookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function setAuthCookies(res, accessToken, refreshTokenValue) {
  res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  res.cookie('refreshToken', refreshTokenValue, refreshTokenCookieOptions);
}

function clearAuthCookies(res) {
  res.clearCookie('accessToken', baseCookieOptions);
  res.clearCookie('refreshToken', baseCookieOptions);
}


/**
 * REGISTER
 */
export const registerController = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken: rToken } =
    await register(req.body);

  setAuthCookies(res, accessToken, rToken);

  res.json(
    apiResponse({
      message: 'User registered successfully',
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

  setAuthCookies(res, accessToken, rToken);

  res.json(
    apiResponse({
      message: 'Login successful',
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

  res.cookie('accessToken', accessToken, accessTokenCookieOptions);

  res.json(
    apiResponse({
      message: 'Token refreshed successfully',
    })
  );
});

/**
 * LOGOUT
 */
export const logoutController = asyncHandler(async (req, res) => {
  await logout(req.user.id);

  clearAuthCookies(res);

  res.json(
    apiResponse({
      message: 'Logged out successfully',
    })
  );
});

export const currentUserController = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  res.json(
    apiResponse({
      message: 'Current user fetched successfully',
      data: user,
    })
  );
});
