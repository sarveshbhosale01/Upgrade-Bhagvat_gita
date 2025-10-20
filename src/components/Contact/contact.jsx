import React, { useState } from 'react';
import './contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'general',
    subject: '',
    message: '',
    rating: 0,
    featureRequests: [],
    allowFollowUp: false
  });

  const [ratings, setRatings] = useState({
    contentAccuracy: 0,
    userInterface: 0,
    easeOfUse: 0,
    featureSet: 0,
    overallExperience: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const feedbackCategories = [
    { id: 'general', name: 'General Feedback', description: 'Overall experience and suggestions' },
    { id: 'content', name: 'Content Related', description: 'About Gita verses, translations, explanations' },
    { id: 'technical', name: 'Technical Issue', description: 'Bugs, errors, or performance problems' },
    { id: 'feature', name: 'Feature Request', description: 'Suggest new features or improvements' },
    { id: 'uiux', name: 'UI/UX Feedback', description: 'Design and user experience suggestions' }
  ];

  const featureSuggestions = [
    'Audio Recitations',
    'Multiple Translations',
    'Daily Verses',
    'Study Plans',
    'Community Forum',
    'Offline Access',
    'Bookmark Verses',
    'Progress Tracking'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleFeatureToggle = (feature) => {
    setFormData(prev => ({
      ...prev,
      featureRequests: prev.featureRequests.includes(feature)
        ? prev.featureRequests.filter(f => f !== feature)
        : [...prev.featureRequests, feature]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      const submissionData = {
        ...formData,
        ratings,
        submittedAt: new Date().toISOString()
      };

      // In real app, send to backend
      console.log('Feedback submitted:', submissionData);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      category: 'general',
      subject: '',
      message: '',
      rating: 0,
      featureRequests: [],
      allowFollowUp: false
    });
    setRatings({
      contentAccuracy: 0,
      userInterface: 0,
      easeOfUse: 0,
      featureSet: 0,
      overallExperience: 0
    });
  };

  const StarRating = ({ rating, onRatingChange, maxStars = 5 }) => {
    return (
      <div className="star-rating">
        {[...Array(maxStars)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            onClick={() => onRatingChange(index + 1)}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  if (isSubmitted) {
    return (
      <div className="contact-page">
        <div className="success-message">
          <div className="success-icon">🎉</div>
          <h2>Thank You for Your Feedback!</h2>
          <p>Your insights help us serve the spiritual community better. We appreciate you taking the time to share your thoughts.</p>
          <button 
            className="submit-another-btn"
            onClick={() => setIsSubmitted(false)}
          >
            Submit Another Feedback
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact & Feedback</h1>
        <p>Your thoughts help us improve the Gita experience for everyone</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email Us</h3>
                <p>gita-guide@example.com</p>
                <span>We'll respond within 24 hours</span>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h3>Support Hours</h3>
                <p>9:00 AM - 6:00 PM IST</p>
                <span>Monday to Saturday</span>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🌐</div>
              <div className="info-content">
                <h3>Website</h3>
                <p>www.gitaguide.com</p>
                <span>Visit for latest updates</span>
              </div>
            </div>
          </div>

          <div className="mission-section">
            <h3>Our Mission</h3>
            <p>
              We're dedicated to making the timeless wisdom of Bhagavad Gita accessible to everyone. 
              Your feedback helps us stay true to this mission and serve the spiritual community better.
            </p>
          </div>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <h2>Share Your Feedback</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Feedback Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {feedbackCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <small>
              {feedbackCategories.find(cat => cat.id === formData.category)?.description}
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Brief summary of your feedback"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="6"
              placeholder="Please share your detailed feedback, suggestions, or issues..."
            />
          </div>

          {/* Ratings Section */}
          <div className="ratings-section">
            <h3>Rate Your Experience</h3>
            <div className="rating-categories">
              <div className="rating-item">
                <label>Content Accuracy</label>
                <StarRating
                  rating={ratings.contentAccuracy}
                  onRatingChange={(value) => handleRatingChange('contentAccuracy', value)}
                />
              </div>
              
              <div className="rating-item">
                <label>User Interface</label>
                <StarRating
                  rating={ratings.userInterface}
                  onRatingChange={(value) => handleRatingChange('userInterface', value)}
                />
              </div>
              
              <div className="rating-item">
                <label>Ease of Use</label>
                <StarRating
                  rating={ratings.easeOfUse}
                  onRatingChange={(value) => handleRatingChange('easeOfUse', value)}
                />
              </div>
              
              <div className="rating-item">
                <label>Feature Set</label>
                <StarRating
                  rating={ratings.featureSet}
                  onRatingChange={(value) => handleRatingChange('featureSet', value)}
                />
              </div>
              
              <div className="rating-item">
                <label>Overall Experience</label>
                <StarRating
                  rating={ratings.overallExperience}
                  onRatingChange={(value) => handleRatingChange('overallExperience', value)}
                />
              </div>
            </div>
          </div>

          {/* Feature Requests */}
          <div className="feature-requests">
            <h3>Feature Suggestions</h3>
            <p>Which features would you like to see in future updates?</p>
            <div className="feature-grid">
              {featureSuggestions.map(feature => (
                <label key={feature} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.featureRequests.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span className="checkmark"></span>
                  {feature}
                </label>
              ))}
            </div>
          </div>

          {/* Follow-up Permission */}
          <div className="follow-up-section">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="allowFollowUp"
                checked={formData.allowFollowUp}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              I'm open to follow-up questions about my feedback
            </label>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Submitting...
              </>
            ) : (
              'Submit Feedback'
            )}
          </button>

          <p className="form-note">
            * Required fields. We respect your privacy and will never share your information.
          </p>
        </form>
      </div>
    </div>
  );
};
// Add this function to your ContactPage component
const storeFeedback = async (feedbackData) => {
  try {
    // In real app, send to your backend API
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedbackData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error storing feedback:', error);
    // Fallback: Store in localStorage for demo
    const existingFeedback = JSON.parse(localStorage.getItem('gitaFeedback') || '[]');
    const newFeedback = {
      id: 'feedback_' + Date.now(),
      ...feedbackData,
      metadata: {
        submittedAt: new Date().toISOString(),
        status: 'new',
        priority: 'medium',
        read: false,
        followUpSent: false
      }
    };
    existingFeedback.push(newFeedback);
    localStorage.setItem('gitaFeedback', JSON.stringify(existingFeedback));
    return newFeedback;
  }
};

// Update the handleSubmit function in ContactPage
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const submissionData = {
      userInfo: {
        name: formData.name,
        email: formData.email
      },
      feedbackData: {
        category: formData.category,
        subject: formData.subject,
        message: formData.message,
        ratings: ratings,
        featureRequests: formData.featureRequests,
        allowFollowUp: formData.allowFollowUp
      }
    };

    await storeFeedback(submissionData);
    setIsSubmitted(true);
    resetForm();
  } catch (error) {
    console.error('Error submitting feedback:', error);
    alert('There was an error submitting your feedback. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

export default ContactPage;