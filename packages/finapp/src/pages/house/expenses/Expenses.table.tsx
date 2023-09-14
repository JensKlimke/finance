import React from "react";
import moment from "moment";
import {ExpenseType} from "./Expenses.context";
import {
  BsBricks,
  BsFileEarmarkBreak,
  BsFileEarmarkCheck,
  BsGenderAmbiguous,
  BsGenderFemale,
  BsGenderMale,
  BsPersonGear,
  BsTools
} from "react-icons/bs";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {DataComponentConfigType, DataSortConfig} from "../../../hooks/entry";

export const categoryIcons = {
  material: <BsBricks/>,
  tools: <BsTools/>,
  service: <BsPersonGear/>
}

export const invoiceIcons = {
  yes: <BsFileEarmarkCheck/>,
  no: <BsFileEarmarkBreak/>
}

export const payerIcons = {
  Jens: <BsGenderMale/>,
  Cathrin: <BsGenderFemale/>,
  joint: <BsGenderAmbiguous/>
}

export const ExpenseCols: DataComponentConfigType = {
  cols: [
    {
      label: 'Date',
      content: (row: ExpenseType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'align-middle',
      width: 15,
      sort: 8
    },
    {
      label: 'Options',
      content: (row: ExpenseType) => <>{categoryIcons[row.category]}&nbsp;{invoiceIcons[row.invoice]}&nbsp;{payerIcons[row.payer]}</>,
      className: 'align-middle text-center',
      width: 10,
    },
    {
      label: 'Description',
      content: (row: ExpenseType) => (
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
      label: 'Account',
      content: (row: ExpenseType) => row.account,
      className: 'align-middle',
      width: 15,
      sort: 4
    },
    {
      label: 'Item',
      content: (row: ExpenseType) => row.item,
      className: 'align-middle',
      width: 15,
      sort: 6
    },
    {
      label: 'Amount',
      content: (row: ExpenseType) => <CurrencyCell colored amount={-row.amount}/>,
      className: 'align-middle text-end',
      width: 15,
      sort: 7
    }
  ]
};


export const ExpenseRows: DataComponentConfigType = {
  title: (row: ExpenseType) => <span>{categoryIcons[row.category]}&nbsp;&nbsp;{row.description}</span>,
  cols: [
    {
      label: 'Date',
      content: (row: ExpenseType) => moment(row.date).format('MM/DD/YYYY'),
      className: 'text-end',
    },
    {
      label: 'Amount',
      content: (row: ExpenseType) => <CurrencyCell amount={row.amount}/>,
      className: 'text-end',
    },
    {
      label: 'Creditor',
      content: (row: ExpenseType) => row.creditor,
      className: 'text-end',
    },
    {
      label: 'Item',
      content: (row: ExpenseType) => row.item,
      className: 'text-end',
    },
    {
      label: 'Account',
      content: (row: ExpenseType) => row.account,
      className: 'text-end',
    },
    {
      label: 'Payed by',
      content: (row: ExpenseType) =>
        <span>{row.payer}&nbsp;-&nbsp;{row.invoice === 'yes' ? 'w/' : 'w/o'} invoice</span>,
      className: 'text-end',
    },
  ]
};

export const ExpenseSort: DataSortConfig = {
  fields: [
    {
      label: 'Description',
      callback: (a: ExpenseType, b: ExpenseType) => a.description.localeCompare(b.description),
    },
    {
      label: 'Creditor',
      callback: (a: ExpenseType, b: ExpenseType) => a.creditor.localeCompare(b.creditor),
    },
    {
      label: 'Category',
      callback: (a: ExpenseType, b: ExpenseType) => a.category.localeCompare(b.category),
    },
    {
      label: 'Invoice',
      callback: (a: ExpenseType, b: ExpenseType) => a.invoice.localeCompare(b.invoice),
    },
    {
      label: 'Account',
      callback: (a: ExpenseType, b: ExpenseType) => a.account.localeCompare(b.account),
    },
    {
      label: 'Payed by',
      callback: (a: ExpenseType, b: ExpenseType) => a.payer.localeCompare(b.payer),
    },
    {
      label: 'Item',
      callback: (a: ExpenseType, b: ExpenseType) => a.item.localeCompare(b.item),
    },
    {
      label: 'Amount',
      callback: (a: ExpenseType, b: ExpenseType) => (a.amount - b.amount),
    },
    {
      label: 'Date',
      callback: (a: ExpenseType, b: ExpenseType) => moment(a.date).diff(b.date)
    },
  ],
  default: {
    field: 8,
    asc: false
  },
  filterText: (a: ExpenseType) => {
    return `${a.description} ${a.creditor} ${a.amount} ${a.category} ${a.invoice} ${a.account} ${a.payer} ${a.item} ${moment(a.date).format('YYYY-MM-DD')}`;
  }
}
