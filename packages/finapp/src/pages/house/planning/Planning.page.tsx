import React, {useMemo} from "react";
import {ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import EntryFormModal from "../../../components/forms/EntryFormModal";
import DataTable from "../../../components/display/DataTable";
import {ItemContext, useItems} from "./Planning.context";
import {ItemsCols, ItemsRow, ItemsSort} from "./Planning.table";
import ItemsForm from "./Planning.form";
import {ItemsDistributionChart} from "./Planning.charts";
import CurrencyCell from "../../../components/display/CurrencyCell";
import {useExpenses} from "../expenses/Expenses.context";
import ImportButton from "../../../components/forms/ImportButton";
import ExportButton from "../../../components/forms/ExportButton";
import DeleteButton from "../../../components/forms/DeleteButton";

export default function PlanningPage() {
  // get data
  const {
    data : itemsData,
    edit,
    saveMany,
    eraseAll
  } = useItems();
  const {data : expenseData,} = useExpenses();
  const sums = useMemo(() => {
    if (!itemsData || !expenseData)
      return {planned: 0.0, used: 0.0, usedWithInvoice: 0.0, usedWithFakeInvoice: 0.0, usedWithoutInvoice: 0.0};
    return {
      planned: itemsData.reduce((s, e) => s + (e.area * e.areaPrice + e.units * e.unitPrice), 0.0),
      used: expenseData.reduce((s, e) => s + e.amount, 0.0),
      usedWithInvoice: expenseData.filter(e => e.invoice === 'yes').reduce((s, e) => s + e.amount, 0.0),
      usedWithoutInvoice: expenseData.filter(e => e.invoice === 'no').reduce((s, e) => s + e.amount, 0.0),
    };
  }, [itemsData, expenseData])
  // check data
  if (!itemsData) return null;
  // render
  return (
    <Container>
      <Row>
        <Col lg={7} className='mb-4' >
          <Card>
            <Card.Header>Planning Items</Card.Header>
            <Card.Body>
              <DataTable
                tableConfig={ItemsCols}
                cardConfig={ItemsRow}
                sortConfig={ItemsSort}
                data={itemsData}
                onRowClick={(d) => edit(d._id)}
                onAdd={() => edit('')}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card>
            <Card.Header>Planned Sum</Card.Header>
            <Card.Body>
              <table className='p-3 w-100'>
                <tbody>
                <tr>
                  <td className='p-3 display-6'>Planned:</td>
                  <td className='p-3 display-6 text-end'><CurrencyCell fracDigits={0} colored amount={sums.planned} /></td>
                </tr>
                <tr>
                  <td className='p-3 display-6'>Used:</td>
                  <td className='p-3 display-6 text-end'><CurrencyCell fracDigits={0} colored amount={sums.used} /></td>
                </tr>
                <tr>
                  <td className='p-3 display-6'>With invoice:</td>
                  <td className='p-3 display-6 text-end'><CurrencyCell fracDigits={0} colored amount={sums.usedWithInvoice} /></td>
                </tr>
                <tr>
                  <td className='p-3 display-6'>Without invoice:</td>
                  <td className='p-3 display-6 text-end'><CurrencyCell fracDigits={0} colored amount={sums.usedWithoutInvoice} /></td>
                </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Header>Groups</Card.Header>
            <Card.Body>
              <ItemsDistributionChart data={itemsData} />
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Header>Data Management</Card.Header>
            <Card.Body>
              <ButtonGroup vertical className='d-flex'>
                <ImportButton onImport={saveMany}/>
                <ExportButton object={itemsData}/>
                <DeleteButton onDelete={eraseAll}/>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EntryFormModal context={ItemContext} name='item'>
        {(entry, update, handleSubmit) =>
          <ItemsForm entry={entry} update={update} handleSubmit={handleSubmit}/>
        }
      </EntryFormModal>
    </Container>
  );
}