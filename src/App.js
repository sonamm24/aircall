import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/NavBar/NavBar";
import ActivityFeed from "./components/ActivityFeed/ActivityFeed";
import Header from "./components/Header/Header";

import "./style/App.css";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
        <Routes>
          <Route path="" element={<ActivityFeed mode={"all"} />} />
          <Route path="/inbox" element={<ActivityFeed mode={"inbox"} />} />
        </Routes>
      </div>
    </Router>
  );
}
