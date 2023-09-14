import {OrderType, useOrders} from "./Orders.context";
import {BalanceType, useBalances} from "./Balances.context";
import {useCallback, useEffect, useState} from "react";
import {useAccounts} from "./Accounts.context";
import {calcPeriods} from "./calcPeriods";

export type PeriodType = {
  date: {
    start: Date | undefined,
    end: Date | undefined
  },
  orders: OrderType[],
  sum: number,
  invest: number,
  sell: number,
  buy: number,
  amount: number,
  balance: number,
  roi: number,
  previous: PeriodType | undefined,
  entry: BalanceType | undefined,
}

export function usePeriods() {
  const [periods, setPeriods] = useState<PeriodType[]>();
  const [account, setAccountLocal] = useState<string>();
  // get data
  const {data: accounts} = useAccounts();
  const {data: balances, setReference: setBalanceRef} = useBalances();
  const {data: orders, setReference: setOrderRef} = useOrders();
  // callbacks
  const setAccount = useCallback((account: string | undefined) => {
    setAccountLocal(account);
  }, []);
  // effects
  useEffect(() => {
    if (!balances || !orders) return;
    setPeriods(calcPeriods(balances, orders));
  }, [balances, orders]);
  useEffect(() => {
    setBalanceRef(account);
    setOrderRef(account);
  }, [account, setBalanceRef, setOrderRef]);
  useEffect(() => {
    if (!accounts || accounts.length === 0)
      setAccount(undefined); // unset account, when no accounts
    else if (account && accounts.find(a => a._id === account) === undefined)
      setAccount(undefined); // unset account, when not existing
    else if (accounts && accounts.length > 0 && !account)
      setAccount(accounts[0]._id);
  }, [account, accounts, setAccount]);
  // return
  return {
    account,
    setAccount,
    data: {
      accounts,
      periods,
      balances,
      orders
    }
  };
}
