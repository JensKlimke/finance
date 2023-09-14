import React, {createContext, useContext} from "react";
import {defaultContext, EntryContextType, EntryWithId, GenericEntryProvider} from "../../../hooks/entry";
import moment from "moment";

export type ExpenseType = EntryWithId & {
  description: string,
  category: 'material' | 'service' | 'tools',
  creditor: string,
  amount: number,
  account: string,
  date: string,
  invoice: 'yes' | 'no',
  payer: 'Cathrin' | 'Jens' | 'joint',
  item: string
}

export const defaultExpense = (): ExpenseType => ({
  description: '',
  category: 'tools',
  creditor: '',
  amount: 0.0,
  account: '',
  date: moment(new Date()).format('YYYY-MM-DD'),
  invoice: 'yes',
  payer: 'joint',
  item: ''
});

export const cleanExpenseCopy = (expense: ExpenseType) => ({
  description: expense.description,
  category: expense.category,
  creditor: expense.creditor,
  amount: expense.amount,
  account: expense.account,
  date: expense.date,
  invoice: expense.invoice,
  payer: expense.payer,
  item: expense.item
})

export const ExpenseContext = createContext<EntryContextType<ExpenseType>>(defaultContext);
export const useExpenses = () => useContext(ExpenseContext);

const ExpenseProvider = GenericEntryProvider<ExpenseType>('expenses',
  cleanExpenseCopy,
  defaultExpense,
  (context: EntryContextType<ExpenseType>, children: React.ReactNode) => (
    <ExpenseContext.Provider value={context}>
      {children}
    </ExpenseContext.Provider>
  ), undefined);

export default ExpenseProvider;
