import React from "react";
import ExpenseProvider from "./expenses/Expenses.context";
import ExpensesPage from "./expenses/Expenses.page";
import {Route, Routes} from "react-router-dom";
import ItemProvider from "./planning/Planning.context";
import DepositProvider from "./deposits/Deposits.context";
import PlanningPage from "./planning/Planning.page";
import DepositsPage from "./deposits/Deposits.page";
import {ButtonGroup} from "react-bootstrap";
import NavButton from "../../components/nav/NavButton";
import FakeInvoicesPage from "./fake_invoices/FakeInvoices.page";
import FakeInvoiceProvider from "./fake_invoices/FakeInvoices.context";

export default function HousePage() {
  // render
  return (
    <ExpenseProvider>
      <ItemProvider>
        <DepositProvider>
          <FakeInvoiceProvider>
            <ButtonGroup>
              <NavButton to='/house/deposits'>Deposits</NavButton>
              <NavButton to='/house/expenses'>Expenses</NavButton>
              <NavButton to='/house/fakes'>Fake Invoices</NavButton>
              <NavButton to='/house/planning'>Planning </NavButton>
            </ButtonGroup>
            <hr/>
            <Routes>
              <Route path="*" element={<ExpensesPage/>}/>
              <Route path="/planning" element={<PlanningPage/>}/>
              <Route path="/deposits" element={<DepositsPage/>}/>
              <Route path="/fakes" element={<FakeInvoicesPage/>}/>
            </Routes>
          </FakeInvoiceProvider>
        </DepositProvider>
      </ItemProvider>
    </ExpenseProvider>
  );
}
