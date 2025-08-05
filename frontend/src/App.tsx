import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/transactions-log" element={<Transactions />}></Route>
      </Routes>
    </>
  );
}

export default App;
