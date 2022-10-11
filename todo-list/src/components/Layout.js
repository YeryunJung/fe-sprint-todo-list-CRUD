import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Dashboard from "./Dashboard";
// import { TodoProvider } from "./TodoContext";
import { Provider } from "react-redux";
import store from "../commons/store";
import { PersistGate } from "redux-persist/integration/react";

const Layout = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        {/* 모든 페이지에 존재하는 헤더 */}
        <Header />
        <Dashboard />
        {/* </PersistGate> */}
      </Provider>
    </BrowserRouter>
  );
};

export default Layout;
