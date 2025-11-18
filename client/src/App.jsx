import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddBusiness from "./pages/AddBusiness";
import BusinessDetail from "./pages/businessDetail";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-between">
        <Link to="/">Home</Link>
        <Link to="/add">Add Business</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBusiness />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
      </Routes>
    </Router>
  );
}
