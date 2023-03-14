import {NextFunction, Request, Response} from "express";
import ApiError from "../utils/ApiError";
import {roleRights} from "../config/roles";
import HttpStatusCode from "../utils/HttpStatusCode";
import httpStatusCode from "../utils/HttpStatusCode";
import {checkToken} from "../utils/auth";
import {catchAsync} from "../utils/catchAsync";
import {authClient} from "../config/redis";
import {AUTH_DB_KEY, SESSION_SECRET, SUPER_ADMIN_ID} from "../config/env";

export const verifyToken = catchAsync(async (req, res, next) => {
  // create session object
  req.auth = {accessToken: undefined, user: undefined, clientToken: undefined};
  // check header
  if (req.headers.authorization) {
    // get token and verify
    const bearer = req.headers.authorization.split(' ');
    const token = checkToken(bearer[1], SESSION_SECRET);
    // abort if token is not set
    if (!token) return next();
    // check token in database
    const content = await authClient.hGet(AUTH_DB_KEY, token.toString());
    const auth = JSON.parse(content);
    // check content
    if (!auth) return next();
    // save data
    req.auth.clientToken = token.toString();
    req.auth.accessToken = auth.accessToken;
    req.auth.user = auth.user;
  }
  // next
  next();
});

export const auth = (requiredRights: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  return new Promise<void>(async (resolve, reject) => {
    // check user
    if (!req.auth.user) {
      return reject(new ApiError(HttpStatusCode.UNAUTHORIZED, 'Please authenticate'));
    }
    // check rights
    const id = req.auth.user;
    const role = (id !== null && id === SUPER_ADMIN_ID) ? 'admin' : 'user';
    const userRights = roleRights.get(role);
    // every right must be fulfilled
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    // switch
    if (hasRequiredRights)
      resolve();
    else
      reject(new ApiError(httpStatusCode.UNAUTHORIZED, 'Unauthorized'));
  })
    .then(() => next())
    .catch((err) => next(err));
}
