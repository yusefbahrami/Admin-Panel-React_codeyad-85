import React from "react";
import Index from "./Layout/Admin";
import { useLocation } from "react-router-dom";
import AuthLayout from "./Layout/authLayout/AuthLayout_main";
import "./auth/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./assets/fontawesome/css/all.css";
import "./auth/css/util.css";
import "./auth/css/main.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname.includes("/auth") ? <AuthLayout /> : <Index />}
    </div>
  );
}

export default App;
