import React, {useMemo} from "react";
import {ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import EntryFormModal from "../../../components/forms/EntryFormModal";
import {ExpenseCols, ExpenseRows, ExpenseSort} from "./Expenses.table";
import ExpensesForm from "./Expenses.form";
import {ExpenseContext, useExpenses} from "./Expenses.context";
import DataTable from "../../../components/display/DataTable";
import CurrencyCell from "../../../components/display/CurrencyCell";
import ImportButton from "../../../components/forms/ImportButton";
import ExportButton from "../../../components/forms/ExportButton";
import DeleteButton from "../../../components/forms/DeleteButton";

export default function ExpensesPage() {
  // get data
  const {
    data: expensesData,
    edit,
    saveMany,
    eraseAll,
  } = useExpenses();
  const sums = useMemo(() => {
    if (!expensesData) return undefined;
    return {
      payers: [
        {key: 'Cathrin', amount: expensesData.filter(e => e.payer === 'Cathrin').reduce((s, e) => s + e.amount, 0.0)},
        {key: 'Jens', amount: expensesData.filter(e => e.payer === 'Jens').reduce((s, e) => s + e.amount, 0.0)},
        {key: 'Joint', amount: expensesData.filter(e => e.payer === 'joint').reduce((s, e) => s + e.amount, 0.0)},
      ]
    }
  }, [expensesData]);
  // check data
  if (!expensesData) return null;
  // render
  return (
    <Container>
      <Row>
        <Col lg={8} className='mb-4'>
          <Card>
            <Card.Header>Expenses</Card.Header>
            <Card.Body>
              <DataTable
                tableConfig={ExpenseCols}
                cardConfig={ExpenseRows}
                sortConfig={ExpenseSort}
                data={expensesData}
                onRowClick={(d) => edit(d._id)}
                onAdd={() => edit('')}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Payers</Card.Header>
            <Card.Body>
              <table className='p-3 w-100'>
                <tbody>
                {
                  sums?.payers.map((s) => (
                    <tr key={s.key}>
                      <td className='p-3 display-6'>{s.key}</td>
                      <td className='p-3 display-6 text-end'>
                        <CurrencyCell
                          fracDigits={0}
                          colored
                          amount={s.amount}
                        />
                      </td>
                    </tr>
                  ))
                }
                </tbody>
                <tfoot>
                <tr>
                  <td className='p-3 display-6'>Total</td>
                  <td className='p-3 display-6 text-end'>
                    <CurrencyCell
                      fracDigits={0}
                      colored
                      amount={expensesData.reduce((s, e) => s + e.amount, 0.0)}
                    />
                  </td>
                </tr>
                </tfoot>
              </table>
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Header>Data Management</Card.Header>
            <Card.Body>
              <ButtonGroup vertical className='d-flex'>
                <ImportButton onImport={saveMany}/>
                <ExportButton object={expensesData}/>
                <DeleteButton onDelete={eraseAll}/>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EntryFormModal context={ExpenseContext} name='expense'>
        {(entry, update, handleSubmit) =>
          <ExpensesForm entry={entry} update={update} handleSubmit={handleSubmit}/>
        }
      </EntryFormModal>
    </Container>
  );
}
