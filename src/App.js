import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import ChatApp from "./ChatApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatApp />} />
        <Route path="/Main" element={<Main/>} />
      </Routes>
    </Router>
  );
}

export default App;
