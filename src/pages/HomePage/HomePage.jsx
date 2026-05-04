import { Link } from "react-router-dom";
import { Users, CalendarDays, BookmarkCheck, Clock } from "lucide-react";
import "./homePage.css";

export default function HomePage() {
  const stats = [
    { title: "Total Bookings", value: "12", icon: BookmarkCheck, color: "var(--accent-primary)" },
    { title: "Approved", value: "8", icon: Users, color: "#34d399" },
    { title: "Pending", value: "3", icon: Clock, color: "#fbbf24" },
    { title: "Rejected", value: "1", icon: CalendarDays, color: "#f87171" },
  ];

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">
          Dashboard
        </h1>
        <p className="page-description">Welcome back! Here's an overview of your consultations.</p>
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

      <div className="home-actions glass-panel">
        <div className="action-content">
          <h2>Need a new consultation?</h2>
          <p>Browse available professors and secure your slot today.</p>
        </div>
        <Link to="/consultation" className="btn-primary">
          View Available Slots
        </Link>
      </div>
    </div>
  );
}