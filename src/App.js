import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { LandingRoute } from "./routes";
function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingRoute />} />
      </Routes>
    </div>
  );
}

export default App;
