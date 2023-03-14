import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootswatch/dist/slate/bootstrap.min.css";
import "./assets/styles/index.scss"
import AuthProvider from "./components/auth/AuthProvider";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContractsPage from "./pages/contracts/Contracts.page";
import TransferPage from "./pages/transfers/Transfer.page";
import StocksPage from "./pages/stocks/Stocks.page";
import AssetsPage from "./pages/assets/Assets.page";
import NotFound from "./pages/NotFound";
import UsersPage from "./pages/users/Users.page";
import AboutPage from "./pages/about/About.page";
import {withAuth} from "./structure/Auth";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route index element={withAuth(<Dashboard />)} />
        <Route path="contracts" element={withAuth(<ContractsPage />)} />
        <Route path="transfer" element={withAuth(<TransferPage />)} />
        <Route path="stocks" element={withAuth(<StocksPage />)} />
        <Route path="assets" element={withAuth(<AssetsPage />)} />
        <Route path="users" element={withAuth(<UsersPage />)} />
        <Route path="about" element={withAuth(<AboutPage />)} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

