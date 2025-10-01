import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [journalData, setJournalData] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });
  
  const [selectedDay, setSelectedDay] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newEntry, setNewEntry] = useState({
    technology: 'React Native',
    topic: '',
    notes: '',
    status: 'planned',
    hours: 0
  });

  const technologies = ['React Native', 'Docker', 'Node.js', 'Express', 'NestJS'];
  const statuses = ['planned', 'in-progress', 'completed', 'review'];
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  useEffect(() => {
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    try {
      const response = await axios.get(`${API_URL}/journal`);
      setJournalData(response.data);
    } catch (error) {
      console.error('Error fetching journal data:', error);
    }
  };

  const handleAddEntry = async () => {
    if (!selectedDay || !newEntry.topic) {
      alert('Please select a day and enter a topic');
      return;
    }

    try {
      await axios.post(`${API_URL}/journal/${selectedDay}`, newEntry);
      await fetchJournalData();
      setShowModal(false);
      setNewEntry({
        technology: 'React Native',
        topic: '',
        notes: '',
        status: 'planned',
        hours: 0
      });
    } catch (error) {
      console.error('Error adding entry:', error);
      alert('Failed to add entry');
    }
  };

  const handleDeleteEntry = async (day, id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/journal/${day}/${id}`);
      await fetchJournalData();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleUpdateStatus = async (day, id, newStatus) => {
    try {
      await axios.put(`${API_URL}/journal/${day}/${id}`, { status: newStatus });
      await fetchJournalData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getTotalHours = (day) => {
    return journalData[day].reduce((sum, entry) => sum + (entry.hours || 0), 0);
  };

  const getWeeklyTotal = () => {
    return days.reduce((sum, day) => sum + getTotalHours(day), 0);
  };

  const getStatusColor = (status) => {
    const colors = {
      'planned': '#6c757d',
      'in-progress': '#ffc107',
      'completed': '#28a745',
      'review': '#17a2b8'
    };
    return colors[status] || '#6c757d';
  };

  const getTechColor = (tech) => {
    const colors = {
      'React Native': '#61dafb',
      'Docker': '#2496ed',
      'Node.js': '#68a063',
      'Express': '#000000',
      'NestJS': '#e0234e'
    };
    return colors[tech] || '#6c757d';
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📚 Tech Learning Journal</h1>
        <p className="subtitle">Track your weekly progress with React Native, Docker, Node.js & More</p>
        <div className="stats">
          <span className="stat-badge">Weekly Hours: {getWeeklyTotal()}h</span>
        </div>
      </header>

      <main className="main-content">
        <div className="action-bar">
          <button 
            className="btn-add" 
            onClick={() => setShowModal(true)}
          >
            + Add Learning Entry
          </button>
        </div>

        <div className="journal-table-container">
          <table className="journal-table">
            <thead>
              <tr>
                <th className="day-header">Day</th>
                <th>Technology</th>
                <th>Topic</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <React.Fragment key={day}>
                  <tr className="day-row">
                    <td className="day-cell" rowSpan={journalData[day].length + 1}>
                      <div className="day-name">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </div>
                      <div className="day-hours">{getTotalHours(day)}h</div>
                    </td>
                  </tr>
                  {journalData[day].length === 0 ? (
                    <tr className="empty-row">
                      <td colSpan="6" className="empty-cell">
                        No entries yet. Click "Add Learning Entry" to start!
                      </td>
                    </tr>
                  ) : (
                    journalData[day].map((entry, index) => (
                      <tr key={entry.id} className="entry-row">
                        <td>
                          <span 
                            className="tech-badge" 
                            style={{ backgroundColor: getTechColor(entry.technology) }}
                          >
                            {entry.technology}
                          </span>
                        </td>
                        <td className="topic-cell">{entry.topic}</td>
                        <td className="notes-cell">{entry.notes}</td>
                        <td>
                          <select
                            className="status-select"
                            value={entry.status}
                            onChange={(e) => handleUpdateStatus(day, entry.id, e.target.value)}
                            style={{ borderColor: getStatusColor(entry.status) }}
                          >
                            {statuses.map(status => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="hours-cell">{entry.hours}h</td>
                        <td className="actions-cell">
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteEntry(day, entry.id)}
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add Learning Entry</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleAddEntry(); }}>
              <div className="form-group">
                <label>Day</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  required
                >
                  <option value="">Select a day</option>
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Technology</label>
                <select
                  value={newEntry.technology}
                  onChange={(e) => setNewEntry({...newEntry, technology: e.target.value})}
                  required
                >
                  {technologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Topic</label>
                <input
                  type="text"
                  value={newEntry.topic}
                  onChange={(e) => setNewEntry({...newEntry, topic: e.target.value})}
                  placeholder="e.g., Setting up Docker containers"
                  required
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                  placeholder="What did you learn? Any challenges?"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newEntry.status}
                  onChange={(e) => setNewEntry({...newEntry, status: e.target.value})}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Hours Spent</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={newEntry.hours}
                  onChange={(e) => setNewEntry({...newEntry, hours: parseFloat(e.target.value) || 0})}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Add Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
