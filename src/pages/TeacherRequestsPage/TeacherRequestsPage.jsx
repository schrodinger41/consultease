import { useState } from "react";
import { CheckCircle, XCircle, User } from "lucide-react";
import "../../pages/BookingPage/bookingPage.css";

export default function TeacherRequestsPage() {
  const [requests, setRequests] = useState([
    { id: 1, student: "Alice Johnson", topic: "Project Proposal Help", date: "2026-05-15", time: "9:00 AM" },
    { id: 2, student: "Bob Smith", topic: "Midterm Grade Inquiry", date: "2026-05-16", time: "10:30 AM" },
    { id: 3, student: "Charlie Brown", topic: "Career Advice", date: "2026-05-18", time: "1:00 PM" },
  ]);

  const handleAction = (id, action) => {
    // In a prototype, we just remove the request from the list
    setRequests(requests.filter(req => req.id !== id));
    alert(`Request ${action}!`);
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Incoming Requests</h1>
        <p className="page-description">Review and manage consultation requests from students.</p>
      </div>

      <div className="glass-panel table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Topic</th>
              <th>Requested Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', color: 'var(--text-muted)', padding: '3rem'}}>
                  No pending requests right now.
                </td>
              </tr>
            ) : requests.map((req) => (
              <tr key={req.id}>
                <td>
                  <div className="prof-cell" style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <div style={{width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <User size={16} />
                    </div>
                    <span className="font-medium">{req.student}</span>
                  </div>
                </td>
                <td className="text-secondary">{req.topic}</td>
                <td>
                  <div className="datetime-cell">
                    <span className="date-text">{req.date}</span>
                    <span className="time-text">{req.time}</span>
                  </div>
                </td>
                <td>
                  <div style={{display: 'flex', gap: '0.5rem'}}>
                    <button className="btn-primary" style={{padding: '0.4rem 0.75rem', fontSize: '0.85rem', background: '#10b981'}} onClick={() => handleAction(req.id, 'approved')}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button className="btn-outline" style={{padding: '0.4rem 0.75rem', fontSize: '0.85rem', borderColor: 'rgba(239, 68, 68, 0.5)', color: '#f87171'}} onClick={() => handleAction(req.id, 'rejected')}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
