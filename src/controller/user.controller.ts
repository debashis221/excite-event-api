import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  getAllUSers,
  updateUser,
} from "../service/user.service";
import log from "../utils/logger";
import { sendResponse } from "../utils/sendReponse";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
): Promise<void> {
  const body = req.body;
  req.body.image = req.file?.originalname!;

  try {
    const user = await createUser(body);
    const userData = await findUserByEmail(user.email);

    return sendResponse(res, 200, "User created successfully!", userData);
  } catch (e: any) {
    if (e.code === 11000) {
      sendResponse(res, 409, "User already exists!", null);
    }

    return sendResponse(res, 500, e as string, null);
  }
}
export async function updateUserHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (req.file) {
      req.body.image = req.file.originalname;
    }

    const user = await updateUser(id, req.body);
    return sendResponse(res, 200, "User updated successfully!", user);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}
export async function getUserByIdHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    return sendResponse(res, 200, "User fetched successfully!", user);
  } catch (error) {
    log.error(error);
    sendResponse(res, 500, error as string, null);
  }
}
export async function getCurrentUserHandler(
  req: Request,
  res: Response
): Promise<Response> {
  return res.send(res.locals.user);
}

export async function deleteUserById(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    return sendResponse(res, 200, "User deleted successfully!", data);
  } catch (error) {
    log.error(error);
    return sendResponse(res, 500, error as string, null);
  }
}

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const { role } = req.query;
    const data = await getAllUSers(role as string);
    return sendResponse(res, 200, "Users fetched successfully!", data);
  } catch (error) {
    log.error(error);
    sendResponse(res, 500, error as string, null);
  }
}
