import React from "react";
import moment from "moment";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {DataComponentConfigType, DataSortConfig} from "../../../hooks/entry";
import {DepositType} from "./Deposits.context";

export const DepositCols: DataComponentConfigType = {
  cols: [
    {
      label: 'Date',
      content: (row: DepositType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'align-middle',
      width: 10,
      sort: 2
    },
    {
      label: 'Payer',
      content: (row: DepositType) => row.payer,
      className: 'align-middle',
      width: 20,
      sort: 0
    },
    {
      label: 'Amount',
      content: (row: DepositType) => <CurrencyCell colored fracDigits={0} amount={row.amount}/>,
      className: 'align-middle text-end',
      width: 10,
      sort: 1
    },
    {
      label: 'Comment',
      content: (row: DepositType) => row.comment,
      className: 'align-middle',
      width: 50,
      sort: 3
    }
  ]
};


export const DepositRows: DataComponentConfigType = {
  title: (row: DepositType) => <span>{row.payer}</span>,
  cols: [
    {
      label: 'Date',
      content: (row: DepositType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'text-end',
    },
    {
      label: 'Amount',
      content: (row: DepositType) => <CurrencyCell colored fracDigits={0} amount={row.amount}/>,
      className: 'text-end',
    }
  ],
  footer: (row: DepositType) => <span>{row.comment}</span>
};

export const DepositSort: DataSortConfig = {
  fields: [
    {
      label: 'Payer',
      callback: (a: DepositType, b: DepositType) => a.payer.localeCompare(b.payer),
    },
    {
      label: 'Amount',
      callback: (a: DepositType, b: DepositType) => (a.amount - b.amount),
    },
    {
      label: 'Date',
      callback: (a: DepositType, b: DepositType) => moment(a.date).diff(b.date)
    },
    {
      label: 'Comment',
      callback: (a: DepositType, b: DepositType) => a.comment.localeCompare(b.comment),
    },
  ],
  default: {
    field: 2,
    asc: false
  },
  filterText: (a: DepositType) => {
    return `${a.payer} ${a.amount} ${moment(a.date).format('YYYY-MM-DD')} ${a.comment}`;
  }
}
