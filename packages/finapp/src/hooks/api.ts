import {useCallback, useEffect, useMemo, useState} from "react";
import {useAuth} from "./auth";
import {API_URL} from "../config/env";

function _fetch<ObjectType, ResponseType>(
  url: string,
  token: string | undefined,
  parameters ?: { [key: string]: any },
  id ?: string | string[] | null[] | null,
  data ?: ObjectType | ObjectType[] | null,
) {
  return new Promise<ResponseType>((resolve, reject) => {
    // new url
    const fetchUrl = new URL(url);
    // init vars
    let method;
    fetchUrl.pathname += id ? `/${id}` : '';
    // get all
    if (data === undefined)
      method = 'GET';
    else if (data === null) {
      method = 'DELETE';
      Array.isArray(id) && (fetchUrl.pathname += '/batch');
    } else if (id === undefined) {
      method = 'POST';
      Array.isArray(data) && (fetchUrl.pathname += '/batch');
    } else
      method = 'PUT';
    // create body
    let body = data && JSON.stringify(data);
    // generate url
    parameters && Object.entries(parameters).forEach(([key, value]) => fetchUrl.searchParams.set(key, value));
    // create headers
    const headers: { [key: string]: string } = {'Content-Type': 'application/json'};
    token && (headers['Authorization'] = `Bearer ${token}`);
    // return fetch
    fetch(fetchUrl.toString(), {method, headers, body})
      .then(async r => {
        // check type
        const cType = r.headers.get('content-type');
        const isJson = cType && cType.startsWith('application/json');
        // parse data
        const data = isJson ? await r.json() : await r.text();
        if (r.status !== 200 && r.status !== 201)
          reject(data);
        else
          resolve(data);
      })
      .catch(e => console.error(e))
  });
}


export function useApi<Type>(path: string) {
  // data
  const [data, setData] = useState<Type[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const {session} = useAuth();
  const url = useMemo(() => path.startsWith('http') ? path : `${API_URL}/v1/${path}`, [path]);
  // callbacks
  const reload = useCallback((parameters?: { [key: string]: any }) => {
    // set loading
    setLoading(true);
    // get data
    _fetch<Type, Type[]>(url, session?.token || undefined, parameters)
      .then(data => setData(data))
      .catch(console.error)
      .then(() => setLoading(false));
  }, [url, session?.token]);
  const save = useCallback((id: string | undefined, object: Type | Type[], parameters?: { [key: string]: any }) => {
    return _fetch(url, session?.token, parameters, id, object);
  }, [url, session?.token]);
  const erase = useCallback((id: string | null[] | undefined, parameters?: { [key: string]: any }) => {
    return _fetch(url, session?.token, parameters, id, null);
  }, [url, session?.token]);
  // return data
  return {
    data,
    save,
    erase,
    reload,
    loading
  };
}

export function useApiData<Type>(path: string, parameters?: { [key: string]: any }) {
  // get data
  const data = useApi<Type>(path);
  // load data
  useEffect(() => {
    const reload = data.reload;
    reload(parameters || {});
  }, [data.reload, parameters]);
  // return data
  return data;
}

