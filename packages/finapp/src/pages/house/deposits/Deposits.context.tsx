import React, {createContext, useContext} from "react";
import {defaultContext, EntryContextType, EntryWithId, GenericEntryProvider} from "../../../hooks/entry";
import moment from "moment";

export type DepositType = EntryWithId & {
  amount: number
  date: string
  payer: 'Cathrin' | 'Jens'
  comment: string,
}

export const defaultDeposit = (): DepositType => ({
  amount: 0,
  date: moment().format('YYYY-MM-DD'),
  payer: 'Jens',
  comment: ''
});

export const cleanDepositCopy = (deposit: DepositType) => ({
  amount: deposit.amount,
  date: deposit.date,
  payer: deposit.payer,
  comment: deposit.comment
})

export const DepositContext = createContext<EntryContextType<DepositType>>(defaultContext);
export const useDeposits = () => useContext(DepositContext);

const DepositProvider = GenericEntryProvider<DepositType>('deposits',
  cleanDepositCopy,
  defaultDeposit,
  (context: EntryContextType<DepositType>, children: React.ReactNode) => (
    <DepositContext.Provider value={context}>
      {children}
    </DepositContext.Provider>
  ), undefined);

export default DepositProvider;
