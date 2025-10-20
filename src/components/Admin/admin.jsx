import React, { useState, useEffect } from 'react';
import './admin.css';

const AdminPanel = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [stats, setStats] = useState({
    totalFeedback: 0,
    unreadFeedback: 0,
    featureRequests: 0,
    bugReports: 0,
    averageRating: 0
  });
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from backend
  useEffect(() => {
    const mockFeedback = [
      {
        id: 'feedback_001',
        userInfo: {
          name: 'Alice Sharma',
          email: 'alice@example.com'
        },
        feedbackData: {
          category: 'feature',
          subject: 'Add multiple translations',
          message: 'It would be great to have multiple translations available for each verse to understand different interpretations. Currently, I find myself switching between different Gita apps to compare translations.',
          ratings: {
            contentAccuracy: 5,
            userInterface: 4,
            easeOfUse: 5,
            featureSet: 3,
            overallExperience: 4
          },
          featureRequests: ['Multiple Translations', 'Translation Comparison'],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-15T10:30:00Z'),
          status: 'new',
          priority: 'high',
          assignedTo: null,
          read: false,
          followUpSent: false
        },
        adminActions: {
          notes: [
            {
              id: 'note_001',
              text: 'Great suggestion! Multiple translations would enhance user understanding.',
              addedBy: 'Admin User',
              addedAt: new Date('2024-01-15T11:00:00Z').toISOString()
            }
          ],
          tags: ['translations', 'feature-request'],
          estimatedTimeline: null
        }
      },
      {
        id: 'feedback_002',
        userInfo: {
          name: 'Raj Patel',
          email: 'raj@example.com'
        },
        feedbackData: {
          category: 'technical',
          subject: 'Mobile app crashes on verse selection',
          message: 'The app crashes when I try to select verses from chapter 3 on my Android device. This happens consistently when I tap on any verse in the middle of the chapter.',
          ratings: {
            contentAccuracy: 4,
            userInterface: 2,
            easeOfUse: 2,
            featureSet: 4,
            overallExperience: 2
          },
          featureRequests: [],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-14T15:20:00Z'),
          status: 'in-progress',
          priority: 'critical',
          assignedTo: 'Developer Team',
          read: true,
          followUpSent: true
        },
        adminActions: {
          notes: [
            {
              id: 'note_002',
              text: 'Issue reproduced. Working on fix.',
              addedBy: 'Developer Team',
              addedAt: new Date('2024-01-14T16:30:00Z').toISOString()
            },
            {
              id: 'note_003',
              text: 'Fix deployed in version 2.1.3',
              addedBy: 'Developer Team',
              addedAt: new Date('2024-01-16T09:15:00Z').toISOString()
            }
          ],
          tags: ['bug', 'mobile', 'crash'],
          estimatedTimeline: '2024-01-20'
        }
      },
      {
        id: 'feedback_003',
        userInfo: {
          name: 'Priya Singh',
          email: 'priya@example.com'
        },
        feedbackData: {
          category: 'feature',
          subject: 'Audio pronunciation for Sanskrit verses',
          message: 'As a beginner, I find it difficult to pronounce Sanskrit verses correctly. It would be amazing to have audio pronunciation for each verse with proper accent.',
          ratings: {
            contentAccuracy: 5,
            userInterface: 4,
            easeOfUse: 4,
            featureSet: 3,
            overallExperience: 4
          },
          featureRequests: ['Audio Pronunciation', 'Sanskrit Learning Tools'],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-13T09:15:00Z'),
          status: 'reviewed',
          priority: 'medium',
          assignedTo: 'Content Team',
          read: true,
          followUpSent: false
        },
        adminActions: {
          notes: [
            {
              id: 'note_004',
              text: 'Audio feature planned for Q2 2024',
              addedBy: 'Product Manager',
              addedAt: new Date('2024-01-13T14:20:00Z').toISOString()
            }
          ],
          tags: ['audio', 'sanskrit', 'feature-request'],
          estimatedTimeline: '2024-06-30'
        }
      },
      {
        id: 'feedback_004',
        userInfo: {
          name: 'Michael Chen',
          email: 'michael@example.com'
        },
        feedbackData: {
          category: 'ui-ux',
          subject: 'Dark mode implementation',
          message: 'The current white background is too bright for night reading. A proper dark mode with adjustable brightness would be very helpful for late night study sessions.',
          ratings: {
            contentAccuracy: 5,
            userInterface: 3,
            easeOfUse: 4,
            featureSet: 3,
            overallExperience: 3
          },
          featureRequests: ['Dark Mode', 'Theme Customization'],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-12T20:45:00Z'),
          status: 'in-progress',
          priority: 'medium',
          assignedTo: 'UI/UX Team',
          read: true,
          followUpSent: true
        },
        adminActions: {
          notes: [
            {
              id: 'note_005',
              text: 'Dark mode designs approved',
              addedBy: 'UI/UX Lead',
              addedAt: new Date('2024-01-13T10:15:00Z').toISOString()
            },
            {
              id: 'note_006',
              text: 'Development in progress, expected completion in 3 weeks',
              addedBy: 'Frontend Team',
              addedAt: new Date('2024-01-15T16:45:00Z').toISOString()
            }
          ],
          tags: ['ui', 'dark-mode', 'accessibility'],
          estimatedTimeline: '2024-02-10'
        }
      },
      {
        id: 'feedback_005',
        userInfo: {
          name: 'Sneha Kapoor',
          email: 'sneha@example.com'
        },
        feedbackData: {
          category: 'content',
          subject: 'Add practical life examples',
          message: 'The explanations are good but would be more helpful if you could add real-life examples of how to apply Gita teachings in daily life situations like work stress, relationships, etc.',
          ratings: {
            contentAccuracy: 4,
            userInterface: 5,
            easeOfUse: 5,
            featureSet: 3,
            overallExperience: 4
          },
          featureRequests: ['Life Examples', 'Practical Applications'],
          allowFollowUp: false
        },
        metadata: {
          submittedAt: new Date('2024-01-11T14:20:00Z'),
          status: 'completed',
          priority: 'low',
          assignedTo: 'Content Team',
          read: true,
          followUpSent: false
        },
        adminActions: {
          notes: [
            {
              id: 'note_007',
              text: 'Content team working on practical examples section',
              addedBy: 'Content Manager',
              addedAt: new Date('2024-01-12T11:30:00Z').toISOString()
            }
          ],
          tags: ['content', 'examples', 'practical'],
          estimatedTimeline: '2024-03-15'
        }
      },
      {
        id: 'feedback_006',
        userInfo: {
          name: 'David Wilson',
          email: 'david@example.com'
        },
        feedbackData: {
          category: 'technical',
          subject: 'Sync issues between devices',
          message: 'My bookmarks and notes are not syncing properly between my phone and tablet. Sometimes they disappear or show different content on different devices.',
          ratings: {
            contentAccuracy: 5,
            userInterface: 4,
            easeOfUse: 2,
            featureSet: 4,
            overallExperience: 3
          },
          featureRequests: ['Better Sync', 'Cloud Backup'],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-10T11:30:00Z'),
          status: 'new',
          priority: 'high',
          assignedTo: null,
          read: false,
          followUpSent: false
        },
        adminActions: {
          notes: [],
          tags: ['sync', 'technical', 'cloud'],
          estimatedTimeline: null
        }
      },
      {
        id: 'feedback_007',
        userInfo: {
          name: 'Ananya Reddy',
          email: 'ananya@example.com'
        },
        feedbackData: {
          category: 'feature',
          subject: 'Daily verse notifications',
          message: 'It would be wonderful to receive a daily verse with explanation as a notification. This would help in consistent learning and reflection throughout the day.',
          ratings: {
            contentAccuracy: 5,
            userInterface: 4,
            easeOfUse: 5,
            featureSet: 3,
            overallExperience: 4
          },
          featureRequests: ['Daily Notifications', 'Verse of the Day'],
          allowFollowUp: true
        },
        metadata: {
          submittedAt: new Date('2024-01-09T08:45:00Z'),
          status: 'completed',
          priority: 'medium',
          assignedTo: 'Development Team',
          read: true,
          followUpSent: true
        },
        adminActions: {
          notes: [
            {
              id: 'note_008',
              text: 'Daily notification feature implemented in v2.2.0',
              addedBy: 'Product Manager',
              addedAt: new Date('2024-01-16T14:00:00Z').toISOString()
            }
          ],
          tags: ['notifications', 'feature', 'daily'],
          estimatedTimeline: '2024-01-15'
        }
      }
    ];

    setFeedbackList(mockFeedback);
    calculateStats(mockFeedback);
  }, []);

  const calculateStats = (feedback) => {
    const total = feedback.length;
    const unread = feedback.filter(f => !f.metadata.read).length;
    const featureRequests = feedback.filter(f => f.feedbackData.category === 'feature').length;
    const bugReports = feedback.filter(f => f.feedbackData.category === 'technical').length;
    
    const totalRatings = feedback.reduce((sum, f) => {
      const ratings = Object.values(f.feedbackData.ratings);
      return sum + ratings.reduce((a, b) => a + b, 0) / ratings.length;
    }, 0);
    
    const averageRating = total > 0 ? (totalRatings / total).toFixed(1) : 0;

    setStats({
      totalFeedback: total,
      unreadFeedback: unread,
      featureRequests,
      bugReports,
      averageRating
    });
  };

  const filteredFeedback = feedbackList.filter(feedback => {
    const matchesFilter = filter === 'all' || feedback.metadata.status === filter;
    const matchesSearch = searchTerm === '' || 
      feedback.userInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedbackData.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.feedbackData.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const updateFeedbackStatus = (feedbackId, updates) => {
    setFeedbackList(prev => 
      prev.map(feedback => 
        feedback.id === feedbackId 
          ? { ...feedback, ...updates }
          : feedback
      )
    );
  };

  const markAsRead = (feedbackId) => {
    updateFeedbackStatus(feedbackId, {
      metadata: { ...feedbackList.find(f => f.id === feedbackId).metadata, read: true }
    });
  };

  const updateStatus = (feedbackId, status) => {
    updateFeedbackStatus(feedbackId, {
      metadata: { ...feedbackList.find(f => f.id === feedbackId).metadata, status }
    });
  };

  const addAdminNote = (feedbackId, note) => {
    const feedback = feedbackList.find(f => f.id === feedbackId);
    const updatedNotes = [...feedback.adminActions.notes, {
      id: `note_${Date.now()}`,
      text: note,
      addedBy: 'Admin User',
      addedAt: new Date().toISOString()
    }];
    
    updateFeedbackStatus(feedbackId, {
      adminActions: { ...feedback.adminActions, notes: updatedNotes }
    });

    // Update selected feedback if it's the current one
    if (selectedFeedback && selectedFeedback.id === feedbackId) {
      setSelectedFeedback({
        ...selectedFeedback,
        adminActions: { ...selectedFeedback.adminActions, notes: updatedNotes }
      });
    }
  };

  const deleteAdminNote = (feedbackId, noteId) => {
    const feedback = feedbackList.find(f => f.id === feedbackId);
    const updatedNotes = feedback.adminActions.notes.filter(note => note.id !== noteId);
    
    updateFeedbackStatus(feedbackId, {
      adminActions: { ...feedback.adminActions, notes: updatedNotes }
    });

    // Update selected feedback if it's the current one
    if (selectedFeedback && selectedFeedback.id === feedbackId) {
      setSelectedFeedback({
        ...selectedFeedback,
        adminActions: { ...selectedFeedback.adminActions, notes: updatedNotes }
      });
    }
  };

  const Dashboard = () => (
    <div className="dashboard">
      <h2>📊 Feedback Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📨</div>
          <div className="stat-info">
            <h3>{stats.totalFeedback}</h3>
            <p>Total Feedback</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-info">
            <h3>{stats.unreadFeedback}</h3>
            <p>Unread Feedback</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💡</div>
          <div className="stat-info">
            <h3>{stats.featureRequests}</h3>
            <p>Feature Requests</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🐛</div>
          <div className="stat-info">
            <h3>{stats.bugReports}</h3>
            <p>Bug Reports</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{stats.averageRating}/5</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>

      <div className="recent-feedback">
        <h3>Recent Feedback</h3>
        <div className="feedback-preview">
          {feedbackList.slice(0, 5).map(feedback => (
            <div 
              key={feedback.id} 
              className={`preview-item ${!feedback.metadata.read ? 'unread' : ''}`}
              onClick={() => {
                setSelectedFeedback(feedback);
                setActiveTab('feedback-detail');
                markAsRead(feedback.id);
              }}
            >
              <div className="preview-header">
                <span className="user-name">{feedback.userInfo.name}</span>
                <span className={`status-badge ${feedback.metadata.status}`}>
                  {feedback.metadata.status}
                </span>
              </div>
              <p className="preview-subject">{feedback.feedbackData.subject}</p>
              <div className="preview-meta">
                <span>{new Date(feedback.metadata.submittedAt).toLocaleDateString()}</span>
                <span className={`priority ${feedback.metadata.priority}`}>
                  {feedback.metadata.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const FeedbackList = () => (
    <div className="feedback-list">
      <div className="list-header">
        <h2>📝 All Feedback</h2>
        <div className="controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="feedback-table">
        {filteredFeedback.map(feedback => (
          <div 
            key={feedback.id} 
            className={`feedback-row ${!feedback.metadata.read ? 'unread' : ''}`}
            onClick={() => {
              setSelectedFeedback(feedback);
              setActiveTab('feedback-detail');
              markAsRead(feedback.id);
            }}
          >
            <div className="row-main">
              <div className="user-info">
                <strong>{feedback.userInfo.name}</strong>
                <span>{feedback.userInfo.email}</span>
              </div>
              
              <div className="feedback-content">
                <h4>{feedback.feedbackData.subject}</h4>
                <p>{feedback.feedbackData.message.substring(0, 100)}...</p>
              </div>
              
              <div className="feedback-meta">
                <span className="category">{feedback.feedbackData.category}</span>
                <span className="date">
                  {new Date(feedback.metadata.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="row-status">
              <span className={`status-badge ${feedback.metadata.status}`}>
                {feedback.metadata.status}
              </span>
              <span className={`priority ${feedback.metadata.priority}`}>
                {feedback.metadata.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FeedbackDetail = () => {
    if (!selectedFeedback) return <div>Select a feedback to view details</div>;

    const [newNote, setNewNote] = useState('');

    const handleAddNote = () => {
      if (newNote.trim()) {
        addAdminNote(selectedFeedback.id, newNote);
        setNewNote('');
      }
    };

    const handleStatusChange = (newStatus) => {
      updateStatus(selectedFeedback.id, newStatus);
      setSelectedFeedback({
        ...selectedFeedback,
        metadata: { ...selectedFeedback.metadata, status: newStatus }
      });
    };

    const handleDeleteNote = (noteId) => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        deleteAdminNote(selectedFeedback.id, noteId);
      }
    };

    return (
      <div className="feedback-detail">
        <div className="detail-header">
          <button 
            className="back-button"
            onClick={() => setActiveTab('feedback-list')}
          >
            ← Back to List
          </button>
          
          <div className="header-actions">
            <select 
              value={selectedFeedback.metadata.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="status-select"
            >
              <option value="new">New</option>
              <option value="reviewed">Reviewed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="detail-content">
          <div className="user-section">
            <h3>User Information</h3>
            <div className="user-details">
              <p><strong>Name:</strong> {selectedFeedback.userInfo.name}</p>
              <p><strong>Email:</strong> {selectedFeedback.userInfo.email}</p>
              <p><strong>Follow-up Allowed:</strong> {selectedFeedback.feedbackData.allowFollowUp ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <div className="feedback-section">
            <h3>Feedback Details</h3>
            <div className="feedback-details">
              <p><strong>Category:</strong> {selectedFeedback.feedbackData.category}</p>
              <p><strong>Subject:</strong> {selectedFeedback.feedbackData.subject}</p>
              <p><strong>Message:</strong></p>
              <div className="message-content">
                {selectedFeedback.feedbackData.message}
              </div>
            </div>
          </div>

          <div className="ratings-section">
            <h3>User Ratings</h3>
            <div className="ratings-grid">
              {Object.entries(selectedFeedback.feedbackData.ratings).map(([category, rating]) => (
                <div key={category} className="rating-item">
                  <span className="rating-category">{category}:</span>
                  <div className="rating-stars">
                    {'⭐'.repeat(rating)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedFeedback.feedbackData.featureRequests.length > 0 && (
            <div className="features-section">
              <h3>Requested Features</h3>
              <div className="feature-tags">
                {selectedFeedback.feedbackData.featureRequests.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          )}

          <div className="admin-section">
            <h3>Admin Notes & Actions</h3>
            
            <div className="admin-notes">
              {selectedFeedback.adminActions.notes.length > 0 ? (
                selectedFeedback.adminActions.notes.map((note) => (
                  <div key={note.id} className="note-item">
                    <div className="note-header">
                      <strong>{note.addedBy}</strong>
                      <button 
                        className="delete-note-btn"
                        onClick={() => handleDeleteNote(note.id)}
                        title="Delete note"
                      >
                        🗑️
                      </button>
                    </div>
                    <p className="note-text">{note.text}</p>
                    <small className="note-date">
                      {new Date(note.addedAt).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p className="no-notes">No admin notes yet.</p>
              )}
            </div>

            <div className="add-note">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an admin note..."
                rows="3"
              />
              <button onClick={handleAddNote}>Add Note</button>
            </div>

            <div className="metadata-info">
              <h4>Metadata</h4>
              <div className="metadata-grid">
                <p><strong>Submitted:</strong> {new Date(selectedFeedback.metadata.submittedAt).toLocaleString()}</p>
                <p><strong>Priority:</strong> <span className={`priority ${selectedFeedback.metadata.priority}`}>{selectedFeedback.metadata.priority}</span></p>
                <p><strong>Assigned To:</strong> {selectedFeedback.metadata.assignedTo || 'Unassigned'}</p>
                <p><strong>Follow-up Sent:</strong> {selectedFeedback.metadata.followUpSent ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🛠️ Gita Guide Admin Panel</h1>
        <div className="admin-nav">
          <button 
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'feedback-list' ? 'active' : ''}
            onClick={() => setActiveTab('feedback-list')}
          >
            📝 Feedback
          </button>
        </div>
      </header>

      <main className="admin-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'feedback-list' && <FeedbackList />}
        {activeTab === 'feedback-detail' && <FeedbackDetail />}
      </main>
    </div>
  );
};

export default AdminPanel;