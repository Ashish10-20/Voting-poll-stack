import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import PollResult from "./pages/PollResult";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ✅ Navbar moved inside BrowserRouter */}
        <Navbar />
        
        {/* ✅ Routes start here */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/poll/:id/results" element={<PollResult />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
