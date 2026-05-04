import { useState } from "react";
import { Clock, Plus, Trash2 } from "lucide-react";
import "../../pages/BookingPage/bookingPage.css";

export default function TeacherAvailabilityPage() {
  const [availability, setAvailability] = useState([
    { id: 1, day: "Monday", startTime: "09:00 AM", endTime: "11:00 AM" },
    { id: 2, day: "Wednesday", startTime: "01:00 PM", endTime: "03:00 PM" },
    { id: 3, day: "Friday", startTime: "10:00 AM", endTime: "12:00 PM" },
  ]);

  const [newSlot, setNewSlot] = useState({ day: "Monday", startTime: "", endTime: "" });

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.startTime || !newSlot.endTime) return;
    
    setAvailability([...availability, { ...newSlot, id: Date.now() }]);
    setNewSlot({ ...newSlot, startTime: "", endTime: "" });
  };

  const handleRemove = (id) => {
    setAvailability(availability.filter(slot => slot.id !== id));
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">My Availability</h1>
        <p className="page-description">Set the times when students can book consultations with you.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Add New Slot Form */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add New Slot</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={handleAddSlot}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Day of Week</label>
              <select 
                value={newSlot.day} 
                onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>Start Time</label>
              <input 
                type="time" 
                value={newSlot.startTime} 
                onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} 
                required 
                style={{ filter: 'invert(1)', opacity: 0.8 }}
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>End Time</label>
              <input 
                type="time" 
                value={newSlot.endTime} 
                onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} 
                required 
                style={{ filter: 'invert(1)', opacity: 0.8 }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', background: '#10b981' }}>
              <Plus size={18} /> Add Time Slot
            </button>
          </form>
        </div>

        {/* Current Availability List */}
        <div className="glass-panel table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Time Window</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availability.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    You haven't set any availability yet.
                  </td>
                </tr>
              ) : (
                availability.map(slot => (
                  <tr key={slot.id}>
                    <td><span className="font-medium">{slot.day}</span></td>
                    <td>
                      <div className="datetime-cell" style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Clock size={14} color="var(--text-muted)" />
                        <span className="date-text">{slot.startTime} - {slot.endTime}</span>
                      </div>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleRemove(slot.id)}
                        style={{
                          background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer',
                          padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: '0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
