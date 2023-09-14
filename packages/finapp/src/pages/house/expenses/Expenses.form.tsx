import {ExpenseType, useExpenses} from "./Expenses.context";
import React, {FormEvent} from "react";
import {Button, ButtonGroup, Col, Form, Row} from "react-bootstrap";
import AmountInput from "../../../components/forms/AmountInput";
import {UpdateCallbackType} from "../../../hooks/entry";
import {categoryIcons, invoiceIcons, payerIcons} from "./Expenses.table";
import FilterInput from "../../../components/forms/FilterInput";
import {useItems} from "../planning/Planning.context";
import CalendarInput from "../../../components/forms/CalendarInput";

export default function ExpensesForm ({entry, handleSubmit, update} : {
  entry : ExpenseType,
  handleSubmit : (e: FormEvent<HTMLFormElement>) => void,
  update : UpdateCallbackType<ExpenseType>
}) {
  // get data
  const {data : expensesData} = useExpenses();
  const {data : planningData} = useItems();
  // render
  return (
    <Form onSubmit={(e) => handleSubmit(e)} id='entryForm' method='post'>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          autoFocus
          value={entry.description}
          onChange={(e) => update('description', e.target.value)}
          type="text"
          placeholder="My Expense"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Creditor</Form.Label>
        <FilterInput
          value={entry.creditor}
          update={(value) => update('creditor', value)}
          list={expensesData && expensesData.map(e => e.creditor)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Item</Form.Label>
        <FilterInput
          value={entry.item}
          update={(value) => update('item', value)}
          list={planningData && planningData.map(e => e.description)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Account</Form.Label>
        <FilterInput
          value={entry.account}
          update={(value) => update('account', value)}
          list={expensesData && expensesData.map(e => e.account)}
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
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <br />
            <ButtonGroup className='ms-3'>
              <Button
                onClick={() => update('category', 'material')}
                variant={entry.category === 'material' ? 'outline-primary' : 'primary'}
                title='Material'
              >
                { categoryIcons.material }
              </Button>
              <Button
                onClick={() => update('category', 'service')}
                variant={entry.category === 'service' ? 'outline-primary' : 'primary'}
                title='Service'
              >
                { categoryIcons.service }
              </Button>
              <Button
                onClick={() => update('category', 'tools')}
                variant={entry.category === 'tools' ? 'outline-primary' : 'primary'}
                title='Tools'
              >
                { categoryIcons.tools }
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Invoice</Form.Label>
            <br />
            <ButtonGroup className='ms-3'>
              <Button
                onClick={() => update('invoice', 'yes')}
                variant={entry.invoice === 'yes' ? 'outline-primary' : 'primary'}
                title='Yes'
              >
                { invoiceIcons['yes'] }
              </Button>
              <Button
                onClick={() => update('invoice', 'no')}
                variant={entry.invoice === 'no' ? 'outline-primary' : 'primary'}
                title='No'
              >
                { invoiceIcons['no'] }
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
        <Col>
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
              <Button
                onClick={() => update('payer', 'joint')}
                variant={entry.payer === 'joint' ? 'outline-primary' : 'primary'}
                title='Joint'
              >
                { payerIcons['joint'] }
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}

