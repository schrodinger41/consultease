import TeacherSidebar from "./TeacherSidebar";
import "./layout.css";

export default function TeacherLayout({ children }) {
  return (
    <div className="app-layout">
      <TeacherSidebar />
      <main className="main-content" style={{
        '--accent-primary': '#10b981', 
        '--accent-secondary': '#059669',
        '--accent-gradient': 'linear-gradient(135deg, #10b981, #059669)',
        '--accent-glow': 'rgba(16, 185, 129, 0.3)',
        '--accent-bg': 'rgba(16, 185, 129, 0.1)'
      }}>
        {children}
      </main>
    </div>
  );
}
