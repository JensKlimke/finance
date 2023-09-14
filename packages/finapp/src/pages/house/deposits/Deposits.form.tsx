import React, {FormEvent} from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import AmountInput from "../../../components/forms/AmountInput";
import {UpdateCallbackType} from "../../../hooks/entry";
import Calendar from "react-calendar";
import moment from "moment/moment";
import {DepositType} from "./Deposits.context";
import {payerIcons} from "../expenses/Expenses.table";

export default function DepositsForm ({entry, handleSubmit, update} : {
  entry : DepositType,
  handleSubmit : (e: FormEvent<HTMLFormElement>) => void,
  update : UpdateCallbackType<DepositType>
}) {
  return (
    <Form onSubmit={(e) => handleSubmit(e)} id='entryForm' method='post'>
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <AmountInput
          autoFocus
          value={entry.amount}
          onChange={(v: number) => update('amount', v)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <div className='text-center'>
          <Calendar className='m-auto' onChange={(d : Date) => update('date', moment(d).format('YYYY-MM-DD'))} value={new Date(entry.date)} />
        </div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Payer</Form.Label>
        <br />
        <ButtonGroup className='ms-3'>
          <Button
            onClick={() => update('payer', 'Cathrin')}
            variant={entry.payer === 'Cathrin' ? 'outline-primary' : 'primary'}
            title='Cathrin'
          >
            { payerIcons['Cathrin'] }
          </Button>
          <Button
            onClick={() => update('payer', 'Jens')}
            variant={entry.payer === 'Jens' ? 'outline-primary' : 'primary'}
            title='Jens'
          >
            { payerIcons['Jens'] }
          </Button>
        </ButtonGroup>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={entry.comment}
          onChange={(e) => update('comment', e.target.value)}
          type="text"
          placeholder="My Comment"
        />
      </Form.Group>
    </Form>
  )
}

