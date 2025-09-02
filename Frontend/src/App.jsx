import React from "react";
import { Route, Routes } from "react-router-dom";
import Aiinname from "./pages/Aiinname";
import Rezayatname from "./pages/Rezayatname";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Aiinname />} />
        <Route path="/rezayatname" element={<Rezayatname />} />
      </Routes>
    </div>
  );
};

export default App;
