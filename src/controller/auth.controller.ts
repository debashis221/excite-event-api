import { Request, Response } from "express";
import { get } from "lodash";
import { CreateSessionInput } from "../schema/auth.schema";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { findUserByEmail, findUserById } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";
import { sendResponse } from "../utils/sendReponse";

export async function createSessionHandler(
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) {
  const message = "Invalid email or password";
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return sendResponse(res, 400, "We couldn't find any user with that email.", null);
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return sendResponse(res, 400, "Enter correct password!", null);
  }

  // sign a access token
  const accessToken = signAccessToken(user);
  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens
  return sendResponse(res, 200, "Login successful", {
    accessToken,
    refreshToken,
    user,
  });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{ session: string }>(
    refreshToken! as string,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return sendResponse(res, 401, "Could not refresh access token", null);
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return sendResponse(res, 401, "Could not refresh access token", null);
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return sendResponse(res, 401, "Could not refresh access token", null);
  }

  const accessToken = signAccessToken(user);

  return sendResponse(res, 200, "Access token refreshed", { accessToken });
}
