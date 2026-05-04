import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, CalendarDays, BookmarkCheck, LogOut } from "lucide-react";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Consultations", path: "/consultation", icon: Users },
    { name: "Book Appointment", path: "/appointment", icon: CalendarDays },
    { name: "My Bookings", path: "/bookings", icon: BookmarkCheck },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <BookmarkCheck size={28} />
        </div>
        <h2>ConsultEase</h2>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link to={item.path} className={`nav-item ${isActive ? "active" : ""}`}>
                  <Icon size={20} className="nav-icon" />
                  <span>{item.name}</span>
                  {isActive && <div className="active-indicator" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => navigate('/login')}>
          <LogOut size={20} className="nav-icon" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
