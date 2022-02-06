import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home";
import PropertyListPage from "./ListPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="list" element={<PropertyListPage />} />
    </Routes>
  );
}
