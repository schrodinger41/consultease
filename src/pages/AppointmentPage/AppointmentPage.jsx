import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Calendar, Clock, User, MessageSquare } from "lucide-react";
import "./appointmentPage.css";

export default function AppointmentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    professor: "",
    date: "",
    time: "",
    topic: ""
  });

  const professorSchedules = {
    "Prof. Smith": ["Mon 9:00 AM - 11:00 AM", "Wed 1:00 PM - 3:00 PM"],
    "Prof. Lee": ["Tue 10:30 AM - 12:30 PM", "Thu 2:00 PM - 4:00 PM"],
    "Prof. Cruz": ["Fri 10:00 AM - 2:00 PM"],
    "Prof. Johnson": ["Mon 3:00 PM - 5:00 PM", "Fri 1:00 PM - 3:00 PM"]
  };

  const availableTimes = formData.professor ? professorSchedules[formData.professor] : [];

  useEffect(() => {
    if (location.state && location.state.selectedProf) {
      setFormData(prev => ({ ...prev, professor: location.state.selectedProf }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate booking process then navigate
    navigate("/bookings", { state: { newBooking: true } });
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Book Appointment</h1>
        <p className="page-description">Fill out the form below to request a consultation.</p>
      </div>

      <div className="appointment-form-container glass-panel">
        <form className="appointment-form" onSubmit={handleSubmit}>
          
          <div className="form-grid">
            <div className="input-group">
              <label><User size={16} /> Professor</label>
              <select name="professor" value={formData.professor} onChange={handleChange} required>
                <option value="" disabled>Select a professor</option>
                <option value="Prof. Smith">Prof. Smith - Computer Science</option>
                <option value="Prof. Lee">Prof. Lee - Mathematics</option>
                <option value="Prof. Cruz">Prof. Cruz - Physics</option>
                <option value="Prof. Johnson">Prof. Johnson - Engineering</option>
              </select>
            </div>

            <div className="input-group">
              <label><Calendar size={16} /> Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>

            <div className="input-group">
              <label><Clock size={16} /> Available Times</label>
              <select name="time" value={formData.time} onChange={handleChange} required disabled={!formData.professor}>
                <option value="" disabled>Select a time slot</option>
                {availableTimes.map((timeSlot, idx) => (
                  <option key={idx} value={timeSlot}>{timeSlot}</option>
                ))}
              </select>
            </div>
            
            <div className="input-group full-width">
              <label><MessageSquare size={16} /> Topic of Discussion</label>
              <input type="text" name="topic" value={formData.topic} onChange={handleChange} placeholder="Briefly describe what you want to discuss" required />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="btn-primary">Submit Request</button>
          </div>
        </form>
      </div>
    </div>
  );
}