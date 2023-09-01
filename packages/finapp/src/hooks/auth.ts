import {createContext, useContext} from "react";


// user type definition
export type UserType = {
  name : string
  email : string
  avatar ?: string
  id : string
  isEmailVerified : boolean
  role : string
}

// session type definition
export type SessionType = {
  user: UserType
  token: string
}

export type RegisterValuesType = {
  name : string;
  email : string;
  password : string;
}

export type LoginCallback = () => void;
export type LogoutCallback = () => void;
export type RenewCallback = () => void;
export type FakeSessionCallback = (type : string) => void;

// the context type definition
export type AuthContextType = {
  session ?: SessionType
  pending : boolean
  login : LoginCallback
  logout : LogoutCallback
  createFakeSession : FakeSessionCallback
  renew : RenewCallback
}

// the context
export const Auth = createContext<AuthContextType>({
  pending: true,
  login: () => { throw new Error("Not implemented"); },
  logout: () => { throw new Error("Not implemented"); },
  renew: () => { throw new Error("Not implemented"); },
  createFakeSession : () => { throw new Error("Not implemented"); }
});

// the hook for the context
export const useAuth = () => useContext(Auth);
