import React from "react";
import moment from "moment";
import {FakeInvoiceType} from "./FakeInvoices.context";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {DataComponentConfigType, DataSortConfig} from "../../../hooks/entry";

export const FakeInvoiceCols: DataComponentConfigType = {
  cols: [
    {
      label: 'Date',
      content: (row: FakeInvoiceType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'align-middle',
      width: 15,
      sort: 3
    },
    {
      label: 'Description',
      content: (row: FakeInvoiceType) => (
        <>
          {row.description}<br/>
          <i className='text-muted'>{row.creditor}</i>
        </>
      ),
      className: 'align-middle',
      width: 30,
      sort: 0
    },
    {
      label: 'Amount',
      content: (row: FakeInvoiceType) => <CurrencyCell colored amount={row.amount}/>,
      className: 'align-middle text-end',
      width: 15,
      sort: 2
    }
  ]
};


export const FakeInvoiceRows: DataComponentConfigType = {
  title: (row: FakeInvoiceType) => <span>{row.description}</span>,
  cols: [
    {
      label: 'Date',
      content: (row: FakeInvoiceType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'text-end',
    },
    {
      label: 'Amount',
      content: (row: FakeInvoiceType) => <CurrencyCell amount={row.amount}/>,
      className: 'text-end',
    },
    {
      label: 'Creditor',
      content: (row: FakeInvoiceType) => row.creditor,
      className: 'text-end',
    }
  ]
};

export const FakeInvoiceSort: DataSortConfig = {
  fields: [
    {
      label: 'Description',
      callback: (a: FakeInvoiceType, b: FakeInvoiceType) => a.description.localeCompare(b.description),
    },
    {
      label: 'Creditor',
      callback: (a: FakeInvoiceType, b: FakeInvoiceType) => a.creditor.localeCompare(b.creditor),
    },
    {
      label: 'Amount',
      callback: (a: FakeInvoiceType, b: FakeInvoiceType) => (a.amount - b.amount),
    },
    {
      label: 'Date',
      callback: (a: FakeInvoiceType, b: FakeInvoiceType) => moment(a.date).diff(b.date)
    },
  ],
  default: {
    field: 3,
    asc: false
  },
  filterText: (a: FakeInvoiceType) => {
    return `${a.description} ${a.creditor} ${a.amount} ${moment(a.date).format('YYYY-MM-DD')}`;
  }
}
