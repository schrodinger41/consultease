import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, Clock, XCircle, MoreVertical } from "lucide-react";
import "./bookingPage.css";

export default function BookingPage() {
  const location = useLocation();
  
  const [bookings, setBookings] = useState([
    { id: 1, prof: "Prof. Smith", topic: "Project Proposal", date: "2026-05-10", time: "9:00 AM", status: "Approved" },
    { id: 2, prof: "Prof. Lee", topic: "Midterm Review", date: "2026-05-12", time: "10:30 AM", status: "Pending" },
    { id: 3, prof: "Prof. Cruz", topic: "Thesis Consultation", date: "2026-05-08", time: "1:00 PM", status: "Rejected" },
  ]);

  useEffect(() => {
    if (location.state && location.state.newBooking) {
      // Add a dummy new booking to show the flow works
      const newBooking = {
        id: 4,
        prof: "Prof. Johnson",
        topic: "New Request",
        date: "2026-05-15",
        time: "3:00 PM",
        status: "Pending"
      };
      
      // Only add if not already added to avoid duplicates on strict mode
      if (!bookings.find(b => b.id === 4)) {
        setBookings([newBooking, ...bookings]);
      }
    }
  }, [location]);

  const getStatusIcon = (status) => {
    switch(status) {
      case "Approved": return <CheckCircle size={16} />;
      case "Pending": return <Clock size={16} />;
      case "Rejected": return <XCircle size={16} />;
      default: return null;
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">My Bookings</h1>
        <p className="page-description">Manage and view the status of your consultation requests.</p>
      </div>

      <div className="glass-panel table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Professor</th>
              <th>Topic</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>
                  <div className="prof-cell">
                    <span className="font-medium">{b.prof}</span>
                  </div>
                </td>
                <td className="text-secondary">{b.topic}</td>
                <td>
                  <div className="datetime-cell">
                    <span className="date-text">{b.date}</span>
                    <span className="time-text">{b.time}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${b.status.toLowerCase()}`}>
                    {getStatusIcon(b.status)}
                    <span style={{ marginLeft: '0.35rem' }}>{b.status}</span>
                  </span>
                </td>
                <td>
                  <button className="action-btn">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}