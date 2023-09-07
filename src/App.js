import React from "react";
import AdminLayout from "./Layout/Admin";
import { BrowserRouter, useLocation } from "react-router-dom";
import AuthLayout from "./Layout/authLayout/AuthLayout_main";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname.includes("/auth") ? <AuthLayout /> : <AdminLayout />}
    </div>
  );
}

export default App;
