import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import AuthoBox from "./AuthoBox";
import Dashboard from "./Dashboard";
import { useGlobalContext } from "../context/GlobalContext";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div className="loading">
      <h1>Loading</h1>
    </div>
  ) : (
    <BrowserRouter>
      {/* 모든 페이지에 존재하는 헤더 */}
      <Header />

      <Routes>
        <Route exact path="/" element={<AuthoBox />} />
        <Route path="/register" element={<AuthoBox register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Layout;
