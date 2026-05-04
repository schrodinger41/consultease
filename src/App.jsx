import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import TeacherLayout from "./components/TeacherLayout";

// Auth Pages
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";

// Student Pages
import HomePage from "./pages/HomePage/HomePage";
import ConsultationPage from "./pages/ConsultationPage/ConsultationPage";
import AppointmentPage from "./pages/AppointmentPage/AppointmentPage";
import BookingPage from "./pages/BookingPage/BookingPage";

// Teacher Pages
import TeacherHomePage from "./pages/TeacherHomePage/TeacherHomePage";
import TeacherRequestsPage from "./pages/TeacherRequestsPage/TeacherRequestsPage";
import TeacherSchedulePage from "./pages/TeacherSchedulePage/TeacherSchedulePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes (No Sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Teacher Routes (With Teacher Sidebar) */}
        <Route
          path="/teacher/*"
          element={
            <TeacherLayout>
              <Routes>
                <Route path="/" element={<TeacherHomePage />} />
                <Route path="/requests" element={<TeacherRequestsPage />} />
                <Route path="/schedule" element={<TeacherSchedulePage />} />
              </Routes>
            </TeacherLayout>
          }
        />

        {/* Student/Dashboard Routes (With Student Sidebar) */}
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