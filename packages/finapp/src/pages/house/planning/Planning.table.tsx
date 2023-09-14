import React, {useMemo} from "react";
import {ItemType} from "./Planning.context";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {DataComponentConfigType, DataSortConfig} from "../../../hooks/entry";
import {useExpenses} from "../expenses/Expenses.context";


export const ItemsCols: DataComponentConfigType = {
  cols: [
    {
      label: 'Description',
      content: (row: ItemType) => row.description,
      className: 'align-middle',
      width: 25,
      sort: 0
    },
    {
      label: 'Group',
      content: (row: ItemType) => row.group,
      className: 'align-middle',
      width: 25,
      sort: 1
    },
    {
      label: 'Units',
      content: (row: ItemType) => (row.units > 0 && row.unitPrice > 0) ? (
        <span>
          <code>{row.units}</code>&nbsp;&#10005;&nbsp;<CurrencyCell fracDigits={0} amount={row.unitPrice} /><br />
          =&nbsp;<CurrencyCell fracDigits={0} amount={row.units * row.unitPrice} />
        </span>
      ) : (
        <CurrencyCell fracDigits={0} amount={row.units * row.unitPrice} />
      ),
      className: 'text-end',
      width: 15
    },
    {
      label: 'Area',
      content: (row: ItemType) => (row.area > 0 && row.areaPrice > 0) ? (
        <span>
          <code>{row.area}</code>&nbsp;&#10005;&nbsp;<CurrencyCell fracDigits={0} amount={row.areaPrice} /><br />
          =&nbsp;<CurrencyCell fracDigits={0} amount={row.area * row.areaPrice} />
        </span>
      ) : (
        <CurrencyCell fracDigits={0} amount={row.area * row.areaPrice} />
      ),
      className: 'text-end',
      width: 15
    },
    {
      label: 'Used Sum',
      content: (row: ItemType) => <UsedAmount sum={row.units * row.unitPrice + row.area * row.areaPrice} name={row.description}/>,
      className: 'text-end',
      width: 15
    },
    {
      label: 'Comment',
      content: (row: ItemType) => row.comment,
      width: 30
    },
  ]
};


export const ItemsRow: DataComponentConfigType = {
  title: (row: ItemType) => <span>{row.description}&nbsp;({row.group})</span>,
  cols: [
    {
      label: 'Description',
      content: (row: ItemType) => row.description,
      className: 'text-end',
    },
    {
      label: 'Units',
      content: (row: ItemType) => (row.units > 0 && row.unitPrice > 0) ? (
        <span>
          <code>{row.units}</code>&nbsp;&#10005;&nbsp;<CurrencyCell fracDigits={0} amount={row.unitPrice} /><br />
          =&nbsp;<CurrencyCell fracDigits={0} amount={row.units * row.unitPrice} />
        </span>
      ) : (
        <CurrencyCell fracDigits={0} amount={row.units * row.unitPrice} />
      ),
      className: 'text-end',
    },
    {
      label: 'Area',
      content: (row: ItemType) => (row.area > 0 && row.areaPrice > 0) ? (
        <span>
          <code>{row.area}</code>&nbsp;&#10005;&nbsp;<CurrencyCell fracDigits={0} amount={row.areaPrice} /><br />
          =&nbsp;<CurrencyCell fracDigits={0} amount={row.area * row.areaPrice} />
        </span>
      ) : (
        <CurrencyCell fracDigits={0} amount={row.area * row.areaPrice} />
      ),
      className: 'text-end',
    },
    {
      label: 'Used Sum',
      content: (row: ItemType) => <UsedAmount sum={row.units * row.unitPrice + row.area * row.areaPrice} name={row.description}/>,
      className: 'text-end',
    },
  ]
};

export const ItemsSort: DataSortConfig = {
  fields: [
    {
      label: 'Description',
      callback: (a: ItemType, b: ItemType) => a.description.localeCompare(b.description),
    },
    {
      label: 'Group',
      callback: (a: ItemType, b: ItemType) => a.group.localeCompare(b.group),
    }
  ],
  default: {
    field: 0,
    asc: true
  },
  filterText: (a : ItemType) => {
    return `${a.description} ${a.group}`;
  }
}

function UsedAmount({sum, name} : {sum: number, name: string}) {
  const {data : expenses} = useExpenses();
  const used = useMemo(() => {
    // zero while loading
    if (!expenses) return 0.0;
    // calculate sum
    return expenses
      .filter(e => e.item === name)
      .reduce((s, e) => s + e.amount, 0.0);
  }, [expenses, name]);
  return (
    <span>
      <CurrencyCell fracDigits={0} amount={sum} /><br />
      <CurrencyCell fracDigits={0} amount={used} />
      <hr className='m-0'/>
      <CurrencyCell fracDigits={0} colored amount={sum - used} />
    </span>
  );
}