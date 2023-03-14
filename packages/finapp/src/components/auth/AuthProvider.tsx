import React, {useCallback, useEffect, useState} from 'react';
import {Auth, AuthContextType, SessionType} from '../../hooks/auth';
import {useLocation, useNavigate} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import {API_URL, SESSION_STORAGE_KEY} from "../../config/env";

// TODO: session with atomWithStorage

const sessionPromise = () =>
  new Promise<SessionType | undefined>((resolve, reject) => {
    // get refresh token
    const token = secureLocalStorage.getItem(SESSION_STORAGE_KEY);
    // check session
    if (!token || typeof token !== 'string') return resolve(undefined);
    // call API
    fetch(`${API_URL}/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(r => r.json())
      .then(user => {
        resolve({user, token})
      })
      .catch(e => {
        console.error(e);
        reject('Unknown error');
      })
  });



export default function AuthProvider({ children } : {children: React.ReactNode}) {
  // states
  const [pending, setPending] = useState<boolean>(true);
  const [session, setSession] = useState<SessionType>();
  // router
  let navigate = useNavigate();
  let location = useLocation();
  // generate login url
  const login = useCallback(() => {
    // create url
    const url = new URL(`${API_URL}/v1/auth/login`);
    url.searchParams.set('redirect', window.location.href);
    // forward
    window.location.href = url.toString();
  }, []);
  // logout callback
  const logout = useCallback(() => {
    // delete session
    secureLocalStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(undefined);
  }, []);
  // renew
  const renew = useCallback(() => {
    // get session data
    sessionPromise()
      .then(session => setSession(session))
      .catch(console.error)
      .then(() => setPending(false));
  }, []);
  // check token
  useEffect(() => {
    // create url, get and remove token
    const url = new URL(window.location.href);
    const token = url.searchParams.get('token');
    // check token
    if (token) {
      // save session and redirect
      secureLocalStorage.setItem(SESSION_STORAGE_KEY, token);
      navigate(location.pathname);
    }
  }, [location.pathname, navigate, renew]);
  useEffect(() => {
    renew();
  }, [renew]);
  // context object
  const context : AuthContextType = {
    session,
    pending,
    login,
    logout,
    renew
  };
  // render
  return (
    <Auth.Provider value={context}>
      {children}
    </Auth.Provider>
  );
}
