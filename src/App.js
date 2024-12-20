import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";

import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DoctorForm from "./pages/DoctorForm";
import Admin from "./pages/Admin";
import BookAppointment from "./pages/BookAppointment";

function App() {
  const { loading } =  useSelector(state => state.loader);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/apply-doctor" element={<ProtectedRoute><DoctorForm /></ProtectedRoute>} />
          <Route path="/book-appointment/:id" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
