import React, {createContext, useContext} from "react";
import {defaultContext, EntryContextType, EntryWithId, GenericEntryProvider} from "../../../hooks/entry";

export type FakeInvoiceType = EntryWithId & {
  description: string,
  creditor: string,
  amount: number,
  date: Date,
}

export const defaultFakeInvoice = () : FakeInvoiceType => ({
  description: '',
  creditor: '',
  amount: 0.0,
  date: new Date(),
});

export const cleanFakeInvoiceCopy = (fakeInvoice: FakeInvoiceType) => ({
  description: fakeInvoice.description,
  creditor: fakeInvoice.creditor,
  amount: fakeInvoice.amount,
  date: fakeInvoice.date,
})

export const FakeInvoiceContext = createContext<EntryContextType<FakeInvoiceType>>(defaultContext);
export const useFakeInvoices = () => useContext(FakeInvoiceContext);

const FakeInvoiceProvider = GenericEntryProvider<FakeInvoiceType>('fakeInvoices',
  cleanFakeInvoiceCopy,
  defaultFakeInvoice,
  (context : EntryContextType<FakeInvoiceType>, children : React.ReactNode) => (
    <FakeInvoiceContext.Provider value={context}>
      {children}
    </FakeInvoiceContext.Provider>
  ), undefined);

export default FakeInvoiceProvider;
