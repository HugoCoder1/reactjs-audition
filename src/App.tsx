import { Routes, Route } from "react-router-dom";
import "./App.css";
import User from "./pages/User";
import Pays from "./pages/Pays";
import Crypto from "./pages/Crypto";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/countries" element={<Pays />} />
        <Route path="/crypto" element={<Crypto />} />
      </Routes>
    </>
  );
}

export default App;
