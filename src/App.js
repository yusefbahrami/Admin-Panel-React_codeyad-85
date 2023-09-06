import React from "react";
import AdminLayout from "./Layout/Admin";
import { BrowserRouter } from "react-router-dom";
import AuthLayout from "./Layout/authLayout/AuthLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthLayout />
        {/* <AdminLayout /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
