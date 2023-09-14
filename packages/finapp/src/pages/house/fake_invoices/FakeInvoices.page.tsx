import React from "react";
import {ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import EntryFormModal from "../../../components/forms/EntryFormModal";
import {FakeInvoiceCols, FakeInvoiceRows, FakeInvoiceSort} from "./FakeInvoices.table";
import FakeInvoicesForm from "./FakeInvoices.form";
import {FakeInvoiceContext, useFakeInvoices} from "./FakeInvoices.context";
import DataTable from "../../../components/display/DataTable";
import ImportButton from "../../../components/forms/ImportButton";
import ExportButton from "../../../components/forms/ExportButton";
import DeleteButton from "../../../components/forms/DeleteButton";
import CurrencyCell from "../../../components/display/CurrencyCell";

export default function FakeInvoicesPage() {
  // get data
  const {
    data: fakeInvoicesData,
    edit,
    saveMany,
    eraseAll,
  } = useFakeInvoices();
  // check data
  if (!fakeInvoicesData) return null;
  // render
  return (
    <Container>
      <Row>
        <Col lg={8} className='mb-4'>
          <Card>
            <Card.Header>FakeInvoices</Card.Header>
            <Card.Body>
              <DataTable
                tableConfig={FakeInvoiceCols}
                cardConfig={FakeInvoiceRows}
                sortConfig={FakeInvoiceSort}
                data={fakeInvoicesData}
                onRowClick={(d) => edit(d._id)}
                onAdd={() => edit('')}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>Sum</Card.Header>
            <Card.Body>
              <table className='p-3 w-100'>
                <tbody>
                <tr>
                  <td className='p-3 display-6'>Sum</td>
                  <td className='p-3 display-6 text-end'>
                    <CurrencyCell fracDigits={0} colored
                                  amount={fakeInvoicesData.reduce((s, e) => (s + e.amount), 0.0)}/>
                  </td>
                </tr>
                </tbody>
              </table>
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Header>Data Management</Card.Header>
            <Card.Body>
              <ButtonGroup vertical className='d-flex'>
                <ImportButton onImport={saveMany}/>
                <ExportButton object={fakeInvoicesData}/>
                <DeleteButton onDelete={eraseAll}/>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EntryFormModal context={FakeInvoiceContext} name='fakeInvoice'>
        {(entry, update, handleSubmit) =>
          <FakeInvoicesForm entry={entry} update={update} handleSubmit={handleSubmit}/>
        }
      </EntryFormModal>
    </Container>
  );
}
