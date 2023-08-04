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

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  req.body.image = req.file?.originalname!;

  try {
    const user = await createUser(body);
    const userData = await findUserByEmail(user.email);

    return res
      .status(200)
      .json({ status: 200, message: "User successfully created", userData })
      .end();
  } catch (e: any) {
    if (e.code === 11000) {
      return res
        .status(409)
        .json({ status: 409, message: "Account already exists" })
        .end();
    }

    return res.status(500).send(e);
  }
}
export async function updateUserHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;

    if (req.files?.image) {
      req.body.image = req.files.image[0].originalname;
    }

    const user = await updateUser(id, req.body);
    return res
      .status(200)
      .json({ status: 200, message: "User updated successfully", data: user })
      .end();
  } catch (error) {
    log.error(error);
    return res
      .status(500)
      .json({
        status: 500,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      })
      .end();
  }
}
export async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await findUserById(id);
    return res
      .status(200)
      .json({ status: 200, message: "User found successfully", data: user })
      .end();
  } catch (error) {
    log.error(error);
  }
}
export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function deleteUserById(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const { id } = req.params;
    const data = await deleteUser(id);
    return res
      .status(200)
      .json({ status: 200, message: "User deleted successfully", data })
      .end();
  } catch (error) {
    log.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Something went wrong!", error })
      .end();
  }
}

export async function getAllUsersHandler(req: Request, res: Response) {
  try {
    const { role } = req.query;
    const data = await getAllUSers(role as string);
    res
      .status(200)
      .json({ status: 200, message: "Fetched All Users", data })
      .end();
  } catch (error) {
    log.error(error);
  }
}
