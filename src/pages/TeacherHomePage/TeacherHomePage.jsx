import { Users, CalendarDays, CheckCircle, Clock } from "lucide-react";
import "../../pages/HomePage/homePage.css";

export default function TeacherHomePage() {
  const stats = [
    { title: "Pending Requests", value: "5", icon: Clock, color: "#fbbf24" },
    { title: "Upcoming Consultations", value: "8", icon: CalendarDays, color: "#10b981" },
    { title: "Total Students", value: "42", icon: Users, color: "var(--accent-primary)" },
    { title: "Completed", value: "124", icon: CheckCircle, color: "#8b5cf6" },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          Teacher Dashboard
        </h1>
        <p className="page-description">Welcome back! Here's an overview of your schedule and requests.</p>
      </div>

      <div className="home-stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="glass-panel stat-card">
              <div className="stat-header">
                <h3>{stat.title}</h3>
                <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="home-actions glass-panel" style={{background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(16,185,129,0.05) 100%)'}}>
        <div className="action-content">
          <h2>You have 5 pending requests</h2>
          <p>Review incoming consultation requests from your students.</p>
        </div>
        <a href="/teacher/requests" className="btn-primary" style={{background: 'var(--accent-gradient)'}}>
          Review Requests
        </a>
      </div>
    </div>
  );
}
