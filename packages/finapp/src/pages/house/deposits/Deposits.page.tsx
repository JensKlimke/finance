import React, {useMemo} from "react";
import {ButtonGroup, Card, Col, Container, Row} from "react-bootstrap";
import EntryFormModal from "../../../components/forms/EntryFormModal";
import {DepositCols, DepositRows, DepositSort} from "./Deposits.table";
import DepositsForm from "./Deposits.form";
import DataTable from "../../../components/display/DataTable";
import CurrencyCell from "../../../components/display/CurrencyCell";
import ImportButton from "../../../components/forms/ImportButton";
import ExportButton from "../../../components/forms/ExportButton";
import DeleteButton from "../../../components/forms/DeleteButton";
import {DepositContext, useDeposits} from "./Deposits.context";

export default function DepositsPage() {
  // get data
  const {
    data: depositsData,
    edit,
    saveMany,
    eraseAll,
  } = useDeposits();
  const sums = useMemo(() => {
    if (!depositsData) return undefined;
    return {
      payers: [
        {key: 'Cathrin', amount: depositsData.filter(e => e.payer === 'Cathrin').reduce((s, e) => s + e.amount, 0.0)},
        {key: 'Jens', amount: depositsData.filter(e => e.payer === 'Jens').reduce((s, e) => s + e.amount, 0.0)},
      ]
    }
  }, [depositsData]);
  // check data
  if (!depositsData) return null;
  // render
  return (
    <Container>
      <Row>
        <Col lg={8} className='mb-4'>
          <Card>
            <Card.Header>Deposits</Card.Header>
            <Card.Body>
              <DataTable
                tableConfig={DepositCols}
                cardConfig={DepositRows}
                sortConfig={DepositSort}
                data={depositsData}
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
                      <td className='p-3 display-6 text-end'><CurrencyCell fracDigits={0} colored amount={s.amount}/>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </Card.Body>
          </Card>
          <Card className='mt-3'>
            <Card.Header>Data Management</Card.Header>
            <Card.Body>
              <ButtonGroup vertical className='d-flex'>
                <ImportButton onImport={saveMany}/>
                <ExportButton object={depositsData}/>
                <DeleteButton onDelete={eraseAll}/>
              </ButtonGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <EntryFormModal context={DepositContext} name='deposit'>
        {(entry, update, handleSubmit) =>
          <DepositsForm entry={entry} update={update} handleSubmit={handleSubmit}/>
        }
      </EntryFormModal>
    </Container>
  );
}