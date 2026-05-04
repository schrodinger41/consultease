import { useState } from "react";
import { Clock, Plus, Trash2, Edit2, X, Check } from "lucide-react";
import "../../pages/BookingPage/bookingPage.css";

export default function TeacherAvailabilityPage() {
  const [availability, setAvailability] = useState([
    { id: 1, day: "Monday", startTime: "09:00 AM", endTime: "11:00 AM" },
    { id: 2, day: "Wednesday", startTime: "01:00 PM", endTime: "03:00 PM" },
    { id: 3, day: "Friday", startTime: "10:00 AM", endTime: "12:00 PM" },
  ]);

  const [newSlot, setNewSlot] = useState({ day: "Monday", startTime: "", endTime: "" });
  const [editingId, setEditingId] = useState(null);
  const [editSlot, setEditSlot] = useState(null);

  const formatTime = (time24) => {
    if (!time24) return "";
    if (time24.includes("AM") || time24.includes("PM")) return time24;
    
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    const formattedHours = h12.toString().padStart(2, "0");
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const parseTime = (time12) => {
    if (!time12) return "";
    if (!time12.includes(" ")) return time12;
    const [time, ampm] = time12.split(" ");
    let [hours, minutes] = time.split(":");
    let h = parseInt(hours, 10);
    if (ampm === "PM" && h < 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${h.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!newSlot.startTime || !newSlot.endTime) return;
    
    setAvailability([...availability, { 
      ...newSlot, 
      id: Date.now(),
      startTime: formatTime(newSlot.startTime),
      endTime: formatTime(newSlot.endTime)
    }]);
    setNewSlot({ ...newSlot, startTime: "", endTime: "" });
  };

  const handleRemove = (id) => {
    setAvailability(availability.filter(slot => slot.id !== id));
  };

  const handleEdit = (slot) => {
    setEditingId(slot.id);
    setEditSlot({
      day: slot.day,
      startTime: parseTime(slot.startTime),
      endTime: parseTime(slot.endTime)
    });
  };

  const handleSaveEdit = (id) => {
    if (!editSlot.startTime || !editSlot.endTime) return;
    setAvailability(availability.map(slot => 
      slot.id === id ? {
        ...slot, 
        day: editSlot.day, 
        startTime: formatTime(editSlot.startTime), 
        endTime: formatTime(editSlot.endTime) 
      } : slot
    ));
    setEditingId(null);
    setEditSlot(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSlot(null);
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
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label>End Time</label>
              <input 
                type="time" 
                value={newSlot.endTime} 
                onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} 
                required 
                style={{ colorScheme: 'dark' }}
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
                    {editingId === slot.id ? (
                      <>
                        <td>
                          <select 
                            value={editSlot.day} 
                            onChange={(e) => setEditSlot({...editSlot, day: e.target.value})}
                            style={{ 
                              width: '100%', 
                              padding: '0.5rem 0.75rem', 
                              background: 'rgba(0, 0, 0, 0.2)', 
                              color: 'var(--text-primary)', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: 'var(--radius-sm)',
                              outline: 'none',
                              fontFamily: 'var(--font-family)'
                            }}
                          >
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input 
                              type="time" 
                              value={editSlot.startTime} 
                              onChange={(e) => setEditSlot({...editSlot, startTime: e.target.value})}
                              style={{ 
                                padding: '0.5rem 0.75rem', 
                                background: 'rgba(0, 0, 0, 0.2)', 
                                color: 'var(--text-primary)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: 'var(--radius-sm)', 
                                colorScheme: 'dark', 
                                outline: 'none',
                                fontFamily: 'var(--font-family)'
                              }}
                            />
                            <span>-</span>
                            <input 
                              type="time" 
                              value={editSlot.endTime} 
                              onChange={(e) => setEditSlot({...editSlot, endTime: e.target.value})}
                              style={{ 
                                padding: '0.5rem 0.75rem', 
                                background: 'rgba(0, 0, 0, 0.2)', 
                                color: 'var(--text-primary)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: 'var(--radius-sm)', 
                                colorScheme: 'dark', 
                                outline: 'none',
                                fontFamily: 'var(--font-family)'
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => handleSaveEdit(slot.id)}
                              style={{
                                background: 'transparent', border: 'none', color: '#10b981', cursor: 'pointer',
                                padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: '0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <Check size={18} />
                            </button>
                            <button 
                              onClick={cancelEdit}
                              style={{
                                background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer',
                                padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: '0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(156, 163, 175, 0.1)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td><span className="font-medium">{slot.day}</span></td>
                        <td>
                          <div className="datetime-cell" style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Clock size={14} color="var(--text-muted)" />
                            <span className="date-text">{slot.startTime} - {slot.endTime}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => handleEdit(slot)}
                              style={{
                                background: 'transparent', border: 'none', color: '#60a5fa', cursor: 'pointer',
                                padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', transition: '0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(96, 165, 250, 0.1)'}
                              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                              <Edit2 size={18} />
                            </button>
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
                          </div>
                        </td>
                      </>
                    )}
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
