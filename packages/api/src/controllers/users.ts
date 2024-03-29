import {Request, Response} from "express";
import {catchAsync} from "../utils/catchAsync";
import {authClient} from "../config/redis";
import {USER_DB_KEY} from "../config/env";
import {getUserId} from "../utils/auth";

/**
 * Returns the user data
 * @param req Express request
 * @param res Express response
 */
const getUserInformation = catchAsync(async (req: Request, res: Response) => {
  // get user from database
  const user = await authClient.hGet(USER_DB_KEY, getUserId(req).toString());
  // send user
  res.send(user);
});


/**
 * Returns the users
 * @param req Express request
 * @param res Express response
 */
const getUsers = catchAsync(async (req: Request, res: Response) => {
  // get users
  const users = await authClient.hGetAll(USER_DB_KEY);
  // send users
  res.send(users);
});

export const userController = {
  getUserInformation,
  getUsers
};
