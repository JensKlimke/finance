import React, {FormEvent} from "react";
import {Form} from "react-bootstrap";
import AmountInput from "../../../components/forms/AmountInput";
import {UpdateCallbackType} from "../../../hooks/entry";
import FilterInput from "../../../components/forms/FilterInput";
import {FakeInvoiceType, useFakeInvoices} from "./FakeInvoices.context";
import CalendarInput from "../../../components/forms/CalendarInput";

export default function FakeInvoicesForm ({entry, handleSubmit, update} : {
  entry : FakeInvoiceType,
  handleSubmit : (e: FormEvent<HTMLFormElement>) => void,
  update : UpdateCallbackType<FakeInvoiceType>
}) {
  const {data} = useFakeInvoices();
  return (
    <Form onSubmit={(e) => handleSubmit(e)} id='entryForm' method='post'>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          autoFocus
          value={entry.description}
          onChange={(e) => update('description', e.target.value)}
          type="text"
          placeholder="My FakeInvoice"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Creditor</Form.Label>
        <FilterInput
          value={entry.creditor}
          update={(value) => update('creditor', value)}
          list={data && data.map(e => e.creditor)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <AmountInput
          value={entry.amount}
          onChange={(v: number) => update('amount', v)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <div className='text-center'>
          <CalendarInput
            value={entry.date}
            update={(value) => update('date', value)}
          />
        </div>
      </Form.Group>
    </Form>
  )
}

