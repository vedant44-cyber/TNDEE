import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Calculate from "./Calculate";
import Credits from "./Credits";
import ParticlesComponent from "./components/particles";

export default function App() {
  return (
    <Router>
      {/* <ParticlesComponent id="particles" /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculate" element={<Calculate />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </Router>
  );
}
