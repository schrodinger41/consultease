import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import "../../pages/BookingPage/bookingPage.css";

export default function TeacherSchedulePage() {
  const [schedule, setSchedule] = useState([
    { id: 1, student: "Diana Prince", topic: "Thesis Consultation", date: "2026-05-10", time: "9:00 AM", status: "Upcoming" },
    { id: 2, student: "Bruce Wayne", topic: "Assignment Review", date: "2026-05-10", time: "10:30 AM", status: "Upcoming" },
    { id: 3, student: "Clark Kent", topic: "Exam Prep", date: "2026-05-09", time: "1:00 PM", status: "Completed" },
  ]);

  const handleComplete = (id) => {
    setSchedule(schedule.map(slot => 
      slot.id === id ? { ...slot, status: "Completed" } : slot
    ));
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">My Schedule</h1>
        <p className="page-description">View your approved and completed consultations.</p>
      </div>

      <div className="glass-panel table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Topic</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot) => (
              <tr key={slot.id}>
                <td>
                  <div className="prof-cell">
                    <span className="font-medium">{slot.student}</span>
                  </div>
                </td>
                <td className="text-secondary">{slot.topic}</td>
                <td>
                  <div className="datetime-cell">
                    <span className="date-text">{slot.date}</span>
                    <span className="time-text">{slot.time}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${slot.status === 'Completed' ? 'approved' : 'pending'}`}>
                    {slot.status === 'Completed' ? <CheckCircle size={16} /> : <Clock size={16} />}
                    <span style={{ marginLeft: '0.35rem' }}>{slot.status}</span>
                  </span>
                </td>
                <td>
                  {slot.status === 'Upcoming' ? (
                    <button 
                      className="btn-outline" 
                      style={{padding: '0.4rem 0.75rem', fontSize: '0.85rem', borderColor: '#10b981', color: '#10b981'}}
                      onClick={() => handleComplete(slot.id)}
                    >
                      <CheckCircle size={14} style={{marginRight: '0.25rem', display: 'inline-block', verticalAlign: 'text-bottom'}} /> 
                      Mark Done
                    </button>
                  ) : (
                    <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Finished</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
