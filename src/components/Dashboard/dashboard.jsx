import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("/dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dailyQuote, setDailyQuote] = useState({});
  const [meditationActive, setMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (meditationActive) {
        setMeditationTime(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [meditationActive]);

  // Load daily quote
  useEffect(() => {
    const quotes = [
      {
        text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.",
        chapter: "Chapter 2, Verse 47",
        rating: "4.8"
      },
      {
        text: "The soul is neither born, and nor does it die.",
        chapter: "Chapter 2, Verse 20",
        rating: "4.9"
      },
      {
        text: "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
        chapter: "Chapter 6, Verse 19",
        rating: "4.7"
      }
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDailyQuote(randomQuote);
  }, []);

  // Mock conversation data
  const conversationSummary = {
    totalConversations: 24,
    recentTopics: [
      {
        title: "Karma Yoga - Path of Selfless Action",
        lastActive: "2 hours ago",
        progress: 75
      },
      {
        title: "Dharma and Life Purpose", 
        lastActive: "1 day ago",
        progress: 60
      },
      {
        title: "Overcoming Fear and Anxiety",
        lastActive: "3 days ago",
        progress: 90
      },
      {
        title: "Meditation Techniques",
        lastActive: "1 week ago",
        progress: 45
      },
      {
        title: "Understanding the Soul",
        lastActive: "2 weeks ago",
        progress: 80
      }
    ],
    wisdomQuotes: [
      "The soul is neither born, and nor does it die.",
      "Set thy heart upon thy work, but never on its reward.",
      "When meditation is mastered, the mind is unwavering like the flame of a candle in a windless place.",
      "From attachment comes desire, from desire comes anger."
    ],
    spiritualProgress: {
      chaptersRead: 8,
      versesMemorized: 45,
      meditationHours: 36,
      wisdomPoints: 1280,
      consistency: 75,
      understanding: 60
    }
  };

  const userData = {
    name: "Sarvesh Bhosale",
    email: "sbhosale@lghomecomfort.ca",
    joinDate: "2024-01-15",
    avatar: "🕉️",
    level: "Seeker",
    streak: 12
  };

  // Navigation handler function
  const handleNavigation = (path) => {
    setActiveSection(path);
    navigate(path);
  };

  // Meditation functions
  const startMeditation = () => {
    setMeditationActive(true);
    setMeditationTime(0);
  };

  const stopMeditation = () => {
    setMeditationActive(false);
    // Add meditation time to total
    conversationSummary.spiritualProgress.meditationHours += Math.floor(meditationTime / 3600);
    setMeditationTime(0);
  };

  // Format time for meditation
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch(action) {
      case 'meditation':
        if (!meditationActive) {
          startMeditation();
        } else {
          stopMeditation();
        }
        break;
      case 'read':
        handleNavigation("/bhagavadgita");
        break;
      case 'chat':
        handleNavigation("/chatinterface");
        break;
      case 'journal':
        // Open journal modal or navigate to journal page
        alert("Journal feature coming soon!");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
  <div className="sidebar-header">
    {sidebarOpen && (
      <>
        <div className="user-avatar">{userData.avatar}</div>
        <div className="user-info">
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
          <div className="user-stats">
            <span className="user-level">Level: {userData.level}</span>
            <span className="user-streak">🔥 {userData.streak} days</span>
          </div>
        </div>
      </>
    )}
    <button 
      className="sidebar-toggle"
      onClick={() => setSidebarOpen(!sidebarOpen)}
    >
      {sidebarOpen ? '◀' : '▶'}
    </button>
  </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === "/adminpanel" ? "active" : ""}>
              <button onClick={() => handleNavigation("/adminpanel")}>
                <span className="icon">📊</span>
                <span className="text">Admin Panel</span>
              </button>
            </li>
            <li className={activeSection === "/chatinterface" ? "active" : ""}>
              <button onClick={() => handleNavigation("/chatinterface")}>
                <span className="icon">💬</span>
                <span className="text">Chat with Krishna</span>
              </button>
            </li>
            <li className={activeSection === "/bhagavadgita" ? "active" : ""}>
              <button onClick={() => handleNavigation("/bhagavadgita")}>
                <span className="icon">📖</span>
                <span className="text">Bhagavad Gita</span>
              </button>
            </li>
            <li className={activeSection === "/meditationtimer" ? "active" : ""}>
              <button onClick={() => handleNavigation("/meditationtimer")}>
                <span className="icon">🧘</span>
                <span className="text">Meditation Timer</span>
              </button>
            </li>
            <li className={activeSection === "/progress" ? "active" : ""}>
              <button onClick={() => handleNavigation("/contactpage")}>
                <span className="icon">📈</span>
                <span className="text">Contact Page</span>
              </button>
            </li>
            <li className={activeSection === "/community" ? "active" : ""}>
              <button onClick={() => handleNavigation("/community")}>
                <span className="icon">👥</span>
                <span className="text">Community</span>
              </button>
            </li>
            <li className={activeSection === "/settings" ? "active" : ""}>
              <button onClick={() => handleNavigation("/login")}>
                <span className="icon">⚙️</span>
                <span className="text">Exit</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="current-time">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="gita-quote">
            "The mind is restless and difficult to restrain, but it is subdued by practice."
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1>Bhagvat Gita Dashboard</h1>
            <p className="welcome-message">Welcome back, {userData.name}. Continue your spiritual journey.</p>
          </div>
          <div className="header-actions">
            <button className="notification-btn">
              🔔
            </button>
           
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💬</div>
            <div className="stat-info">
              <h3>{conversationSummary.totalConversations}</h3>
              <p>Total Conversations</p>
              <span className="stat-trend">↑ 12% this week</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div className="stat-info">
              <h3>{conversationSummary.spiritualProgress.chaptersRead}/18</h3>
              <p>Chapters Read</p>
              <span className="stat-trend">{Math.round((conversationSummary.spiritualProgress.chaptersRead / 18) * 100)}% completed</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🌟</div>
            <div className="stat-info">
              <h3>{conversationSummary.spiritualProgress.wisdomPoints}</h3>
              <p>Wisdom Points</p>
              <span className="stat-trend">Level {Math.floor(conversationSummary.spiritualProgress.wisdomPoints / 500) + 1}</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">🧘</div>
            <div className="stat-info">
              <h3>{conversationSummary.spiritualProgress.meditationHours}h</h3>
              <p>Meditation Time</p>
              <span className="stat-trend">{userData.streak} day streak</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Conversation Summary */}
          <div className="content-card">
            <div className="card-header">
              <h2>Recent Conversations</h2>
              
            </div>
            <div className="conversation-list">
              {conversationSummary.recentTopics.map((topic, index) => (
                <div key={index} className="conversation-item">
                  <div className="topic-icon">💭</div>
                  <div className="topic-content">
                    <h4>{topic.title}</h4>
                    <p>Last discussed {topic.lastActive}</p>
                    <div className="conversation-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{width: `${topic.progress}%`}}
                        ></div>
                      </div>
                      <span>{topic.progress}%</span>
                    </div>
                  </div>
                  <button 
                    className="continue-btn"
                    onClick={() => handleNavigation("/chatinterface")}
                  >
                    Continue
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Wisdom Quotes */}
          <div className="content-card">
            <h2>Wisdom Insights</h2>
            <div className="wisdom-carousel">
              {conversationSummary.wisdomQuotes.map((quote, index) => (
                <div key={index} className="wisdom-card">
                  <div className="quote-icon">"</div>
                  <p>{quote}</p>
                  <div className="quote-source">- Bhagavad Gita</div>
                </div>
              ))}
            </div>
          </div>

          {/* Spiritual Progress */}
          <div className="content-card">
            <h2>Spiritual Progress</h2>
            <div className="progress-stats">
              <div className="progress-item">
                <label>
                  <span>Verses Memorized</span>
                  <span>{conversationSummary.spiritualProgress.versesMemorized}/700</span>
                </label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${(conversationSummary.spiritualProgress.versesMemorized / 700) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="progress-item">
                <label>
                  <span>Meditation Consistency</span>
                  <span>{conversationSummary.spiritualProgress.consistency}%</span>
                </label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${conversationSummary.spiritualProgress.consistency}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="progress-item">
                <label>
                  <span>Wisdom Understanding</span>
                  <span>{conversationSummary.spiritualProgress.understanding}%</span>
                </label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${conversationSummary.spiritualProgress.understanding}%`}}
                  ></div>
                </div>
              </div>
            </div>
            <div className="progress-achievements">
              <div className="achievement">
                <span className="achievement-icon">🏆</span>
                <span>Chapter Master</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">⭐</span>
                <span>Meditation Guru</span>
              </div>
              <div className="achievement">
                <span className="achievement-icon">📚</span>
                <span>Wisdom Seeker</span>
              </div>
            </div>
          </div>

          {/* Daily Guidance */}
          <div className="content-card">
            <div className="card-header">
              <h2>Today's Guidance</h2>
              
            </div>
            <div className="daily-guidance">
              <div className="guidance-header">
                <h3>{dailyQuote.chapter}</h3>
                <div className="guidance-rating">⭐ {dailyQuote.rating}</div>
              </div>
              <p className="guidance-text">
                "{dailyQuote.text}"
              </p>
              <div className="guidance-actions">
                <button className="primary-btn">Reflect & Meditate</button>
                <button className="secondary-btn">Share Insight</button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="content-card">
            <h2>Quick Actions</h2>
            <div className="quick-actions">
              <button 
                className={`action-btn ${meditationActive ? 'active' : ''}`}
                onClick={() => handleQuickAction('meditation')}
              >
                <span className="action-icon">
                  {meditationActive ? '⏸️' : '🎯'}
                </span>
                <span>{meditationActive ? 'Stop Meditation' : 'Start Meditation'}</span>
                {meditationActive && (
                  <span className="meditation-timer">{formatTime(meditationTime)}</span>
                )}
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('read')}
              >
                <span className="action-icon">📚</span>
                <span>Read Gita</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('chat')}
              >
                <span className="action-icon">💭</span>
                <span>Ask Krishna</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => handleQuickAction('journal')}
              >
                <span className="action-icon">📝</span>
                <span>Journal</span>
              </button>
            </div>
          </div>

          {/* Community Activity */}
          <div className="content-card">
            <div className="card-header">
              <h2>Community Activity</h2>
             
            </div>
            <div className="community-feed">
              <div className="activity-item">
                <div className="activity-avatar">🙏</div>
                <div className="activity-content">
                  <p><strong>Yogesh</strong> shared an insight on Karma Yoga</p>
                  <span>2 hours ago • 12 likes</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">🕉️</div>
                <div className="activity-content">
                  <p><strong>Priya</strong> completed Chapter 3 meditation</p>
                  <span>4 hours ago • 8 comments</span>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-avatar">🌟</div>
                <div className="activity-content">
                  <p><strong>Community</strong> new wisdom discussion started</p>
                  <span>1 day ago • Join discussion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;