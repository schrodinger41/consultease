import { useNavigate } from "react-router-dom";
import { Clock, User } from "lucide-react";
import "./consultationPage.css";

export default function ConsultationPage() {
  const navigate = useNavigate();
  
  const professors = [
    { 
      id: 1, prof: "Prof. Smith", dept: "Computer Science", avatar: "https://i.pravatar.cc/150?u=1",
      schedules: ["Mon 9:00 AM - 11:00 AM", "Wed 1:00 PM - 3:00 PM"]
    },
    { 
      id: 2, prof: "Prof. Lee", dept: "Mathematics", avatar: "https://i.pravatar.cc/150?u=2",
      schedules: ["Tue 10:30 AM - 12:30 PM", "Thu 2:00 PM - 4:00 PM"]
    },
    { 
      id: 3, prof: "Prof. Cruz", dept: "Physics", avatar: "https://i.pravatar.cc/150?u=3",
      schedules: ["Fri 10:00 AM - 2:00 PM"]
    },
    { 
      id: 4, prof: "Prof. Johnson", dept: "Engineering", avatar: "https://i.pravatar.cc/150?u=4",
      schedules: ["Mon 3:00 PM - 5:00 PM", "Fri 1:00 PM - 3:00 PM"]
    },
  ];

  const handleBook = (prof) => {
    navigate("/appointment", { state: { selectedProf: prof.prof, schedules: prof.schedules } });
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Professor Directory</h1>
        <p className="page-description">View professors' available schedules and book a consultation.</p>
      </div>

      <div className="slots-grid">
        {professors.map((prof) => (
          <div key={prof.id} className="glass-panel slot-card">
            <div className="slot-header">
              <img src={prof.avatar} alt={prof.prof} className="prof-avatar" />
              <div className="prof-info">
                <h3>{prof.prof}</h3>
                <span className="prof-dept">{prof.dept}</span>
              </div>
            </div>
            
            <div className="slot-details" style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <span style={{fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Available Times:</span>
              {prof.schedules.map((sched, idx) => (
                <div key={idx} className="detail-item">
                  <Clock size={16} />
                  <span>{sched}</span>
                </div>
              ))}
            </div>
            
            <div className="slot-actions">
              <button className="btn-primary w-full" onClick={() => handleBook(prof)}>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}