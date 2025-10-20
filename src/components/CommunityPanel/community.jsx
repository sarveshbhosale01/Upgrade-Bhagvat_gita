import React, { useState, useEffect } from 'react';
import './community.css';

const CommunityPanel = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [userName, setUserName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample initial posts
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        userName: 'Sarah M.',
        content: 'This meditation app has transformed my mornings! Starting my day with 15 minutes of mindfulness has brought so much clarity and peace to my life. 🙏',
        timestamp: '2 hours ago',
        likes: 12,
        userAvatar: '👩',
        userColor: '#FF6B6B'
      },
      {
        id: 2,
        userName: 'Raj K.',
        content: 'The brain detox sound is amazing! I\'ve been using it for stress relief after work and it really helps me unwind. The 10-minute sessions are perfect for beginners.',
        timestamp: '5 hours ago',
        likes: 8,
        userAvatar: '👨',
        userColor: '#4ECDC4'
      },
      {
        id: 3,
        userName: 'Priya S.',
        content: 'I love the variety of music options. The Tibetan bowls have helped me achieve deeper meditation states. Thank you for this beautiful platform! 🧘‍♀️',
        timestamp: '1 day ago',
        likes: 15,
        userAvatar: '👩',
        userColor: '#FFD93D'
      },
      {
        id: 4,
        userName: 'Mike T.',
        content: 'As someone who struggled with anxiety, the meditation timer with nature sounds has been a game-changer. My sleep quality has improved significantly! 💤',
        timestamp: '2 days ago',
        likes: 20,
        userAvatar: '👨',
        userColor: '#6BCF7F'
      }
    ];
    setPosts(samplePosts);
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !userName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userColors = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCF7F', '#C44569', '#778BEB'];
    const randomColor = userColors[Math.floor(Math.random() * userColors.length)];
    
    const newPostObj = {
      id: posts.length + 1,
      userName,
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      userAvatar: '👤',
      userColor: randomColor
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setIsSubmitting(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getTimeAgo = (timestamp) => {
    return timestamp; // In a real app, you'd calculate this dynamically
  };

  return (
    <div className="community-panel">
      {/* Header */}
      <div className="community-header">
        <div className="header-content">
          <h1>🌿 Meditation Community</h1>
          <p>Share your journey and connect with fellow meditators</p>
        </div>
        <div className="community-stats">
          <div className="stat">
            <span className="stat-number">{posts.length}</span>
            <span className="stat-label">Shared Stories</span>
          </div>
          <div className="stat">
            <span className="stat-number">{posts.reduce((sum, post) => sum + post.likes, 0)}</span>
            <span className="stat-label">Total Support</span>
          </div>
        </div>
      </div>

      <div className="community-content">
        {/* Post Creation Form */}
        <div className="post-creation-section">
          <div className="creation-card">
            <h3>Share Your Experience</h3>
            <form onSubmit={handleSubmitPost} className="post-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name..."
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="name-input"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Share your meditation journey, insights, or how this app has helped you..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="post-input"
                  rows="4"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting || !newPost.trim() || !userName.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sharing...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✨</span>
                    Share Experience
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="posts-feed">
          <div className="feed-header">
            <h3>Community Stories</h3>
            <span className="posts-count">{posts.length} experiences shared</span>
          </div>

          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-info">
                    <div 
                      className="user-avatar"
                      style={{ backgroundColor: post.userColor }}
                    >
                      {post.userAvatar}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{post.userName}</span>
                      <span className="post-time">{getTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button 
                      className="like-btn"
                      onClick={() => handleLike(post.id)}
                    >
                      <span className="heart-icon">💖</span>
                      <span className="like-count">{post.likes}</span>
                    </button>
                  </div>
                </div>

                <div className="post-content">
                  <p>{post.content}</p>
                </div>

                <div className="post-footer">
                  <div className="engagement-stats">
                    <span className="engagement-item">
                      <span className="engagement-icon">💖</span>
                      {post.likes} {post.likes === 1 ? 'person' : 'people'} found this helpful
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <h3>No stories yet</h3>
              <p>Be the first to share your meditation journey with the community!</p>
            </div>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="guidelines-section">
          <div className="guidelines-card">
            <h3>💫 Community Guidelines</h3>
            <div className="guidelines-list">
              <div className="guideline-item">
                <span className="guideline-icon">🤝</span>
                <span>Be supportive and encouraging to fellow meditators</span>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🧘‍♀️</span>
                <span>Share authentic experiences and insights</span>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon=">💖</span>
                <span>Respect different meditation practices and journeys</span>
              </div>
              <div className="guideline-item">
                <span className="guideline-icon">🌿</span>
                <span>Keep the space positive and uplifting for everyone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPanel;