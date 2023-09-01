import {useApiData} from "../../hooks/api";
import {API_URL} from "../../config/env";
import {useMemo} from "react";

export default function DatabasePage () {
  // get data from api
  const {data} = useApiData<string>(`${API_URL}/v1/database/keys`);
  // check data
  if (data === undefined)
    return null;
  // render
  return (
    <ul>
      { data.map(d => (
        <li key={d}>
          <span>{d}</span>
          <DatabaseEntry entryKey={d} />
        </li>
      )) }
    </ul>
  );
}

export function DatabaseEntry ({entryKey} : {entryKey : string}) {
  // get data from api
  const params = useMemo(() => ({key: entryKey}), [entryKey])
  const {data : entries} = useApiData<string>(`${API_URL}/v1/database/entries`, params);
  // check data
  if (entries === undefined)
    return null;
  // render
  return (
    <ul>
      { Object.entries(entries).map(([id, data]) => (
        <li key={id}>
          <code>{id}</code>:&nbsp;
          <code>{data}</code>
        </li>
      )) }
    </ul>
  );
}