import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Results from "./pages/Results";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container-fluid mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
