import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import ConsultationPage from "./pages/ConsultationPage/ConsultationPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import BookingPage from "./pages/BookingPage/BookingPage";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes (No Sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Dashboard Routes (With Sidebar) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/bookings" element={<BookingPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;