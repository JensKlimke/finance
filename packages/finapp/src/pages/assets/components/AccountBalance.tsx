import {useMemo} from "react";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {BalanceType} from "../hooks/Balances.context";
import {useApiData} from "../../../hooks/api";

export default function AccountBalance({account}: { account: string }) {
  // memos
  const parameters = useMemo(() => ({account}), [account]);
  // data
  const {data} = useApiData<BalanceType>(`balances`, parameters);
  // memos
  const current = useMemo(() => {
    // check data
    if (!data || data.length === 0) return;
    // find account balance
    return [...data].sort((a, b) => b.date.localeCompare(a.date))[0];
  }, [data]);
  // render
  return (
    <h1 className="text-nowrap display-4 text-center">
      {current?.amount === undefined && <>&hellip;</>}
      {current?.amount !== undefined && <CurrencyCell amount={current?.amount || 0.0} colored fracDigits={0}/>}
    </h1>
  );
}
