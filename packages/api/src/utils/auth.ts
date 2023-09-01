import ApiError from "./ApiError";
import jwt from "jsonwebtoken";
import {Request} from "express";
import {GITHUB_USER_URL} from "../config/env";

export const loadUserData = (accessToken: string) => new Promise<any>((resolve, reject) => {
  fetch(GITHUB_USER_URL, {
    headers: {'Authorization': `Bearer ${accessToken}`}
  })
    .then(t => {
      if (t.status !== 200) throw t;
      return t.json();
    })
    .then(user => ({
      id: user.id,
      email: user.email,
      avatar: user.avatar_url,
      name: user.name,
      role: 'user'
    }))
    .then(user => resolve(user))
    .catch(err => {
      reject(new ApiError(err.status, err.statusText));
    });
});

export const checkToken = (token : string, secret : string) : any | undefined => {
  try {
    return jwt.verify(token, secret);
  } catch(e) {
    return undefined;
  }
}

export const getUserId = (req : Request) => {
  return req.auth.user.id || undefined;
}

export const getUserRole = (req : Request) => {
  return req.auth.user.role || 'user';
}
