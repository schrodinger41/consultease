import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";
import "./consultationPage.css";

export default function ConsultationPage() {
  const navigate = useNavigate();
  
  const slots = [
    { id: 1, prof: "Prof. Smith", time: "9:00 AM - 10:00 AM", dept: "Computer Science", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, prof: "Prof. Lee", time: "10:30 AM - 11:30 AM", dept: "Mathematics", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, prof: "Prof. Cruz", time: "1:00 PM - 2:00 PM", dept: "Physics", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, prof: "Prof. Johnson", time: "3:00 PM - 4:00 PM", dept: "Engineering", avatar: "https://i.pravatar.cc/150?u=4" },
  ];

  const handleBook = (slot) => {
    navigate("/appointment", { state: { selectedProf: slot.prof } });
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Available Slots</h1>
        <p className="page-description">Choose a professor and time slot for your consultation.</p>
      </div>

      <div className="slots-grid">
        {slots.map((slot) => (
          <div key={slot.id} className="glass-panel slot-card">
            <div className="slot-header">
              <img src={slot.avatar} alt={slot.prof} className="prof-avatar" />
              <div className="prof-info">
                <h3>{slot.prof}</h3>
                <span className="prof-dept">{slot.dept}</span>
              </div>
            </div>
            
            <div className="slot-details">
              <div className="detail-item">
                <Clock size={16} />
                <span>{slot.time}</span>
              </div>
            </div>
            
            <div className="slot-actions">
              <button className="btn-primary w-full" onClick={() => handleBook(slot)}>
                Book Slot
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}