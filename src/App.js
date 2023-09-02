import React from "react";
import Index from "./Layout/Admin";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    </div>
  );
}

export default App;
