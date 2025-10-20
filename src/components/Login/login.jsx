import React, { useState, useEffect } from "react";
import "./login.css";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    confirmPassword: "",
    username: "",
    fullName: ""
  });

  // Stars effect
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      // Clear existing stars
      starsContainer.innerHTML = '';
      
      const starCount = 50;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const starSize = Math.random();
        
        if (starSize < 0.6) {
          star.classList.add('star', 'small');
        } else if (starSize < 0.9) {
          star.classList.add('star', 'medium');
        } else {
          star.classList.add('star', 'large');
        }
        
        if (Math.random() < 0.3) {
          star.classList.add('golden');
        }
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
      }
      
      // Shooting stars
    
    };

    createStars();

    // Cleanup
    return () => {
      const starsContainer = document.getElementById('stars-container');
      if (starsContainer) {
        starsContainer.innerHTML = '';
      }
    };
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("User Logged In:", formData);
    window.location.href = "/introduction";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    console.log("User Registered:", formData);
    alert("Registration successful! Please login.");
    setIsLogin(true);
    setFormData({ 
      email: "", 
      password: "",
      confirmPassword: "",
      username: "",
      fullName: ""
    });
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsLogin(!isLogin);
    setFormData({ 
      email: "", 
      password: "",
      confirmPassword: "",
      username: "",
      fullName: ""
    });
  };

  return (
    <div className="login-wrapper">
<div class="shooting-star-single">
  <div class="star-sparkle"></div>
  <div class="star-sparkle"></div>
  <div class="star-sparkle"></div>
  <div class="star-sparkle"></div>
  <div class="star-sparkle"></div>
</div>
      {/* Stars container */}
      <div className="stars-container" id="stars-container"></div>
      
      <div className="login-overlay"></div>
      <div className="chakra-symbol"></div>
      
      {/* Golden Decorative Elements */}
      <div className="login-decoration">
        <div className="decorative-top"></div>
        <div className="decorative-bottom"></div>
        
        <div className="decorative-left">
          <div className="decorative-line-vertical"></div>
          <div className="decorative-ornament"></div>
          <div className="decorative-line-vertical"></div>
        </div>
        
        <div className="decorative-right">
          <div className="decorative-line-vertical"></div>
          <div className="decorative-ornament"></div>
          <div className="decorative-line-vertical"></div>
        </div>
        
        <div className="corner-top-left"></div>
        <div className="corner-top-right"></div>
        <div className="corner-bottom-left"></div>
        <div className="corner-bottom-right"></div>
      </div>
      
      {/* Scrollable container */}
      <div className="login-scroll-container">
        <div className="login-card">
          
          <div className="login-header">
            <h1 className="title">
              {isLogin ? "Bhagvat Gita Portal" : "Join the Wisdom"}
            </h1>
            <p className="subtitle">
              {isLogin 
                ? "Enter as Arjuna — Seek Guidance from Krishna" 
                : "Start your spiritual journey with us"
              }
            </p>
          </div>

          <div className="form-decoration">
            <form className="login-form" onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="button-container">
                <button type="submit">
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </div>
            </form>
          </div>

          {isLogin && (
            <>
              <div className="login-divider">
                <span>or continue with</span>
              </div>

              <div className="social-container">
                <div className="social-login">
                  <button type="button" className="social-btn">
                    <span>Google</span>
                  </button>
                  <button type="button" className="social-btn">
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="login-footer">
            <p>
              {isLogin ? "New here? " : "Already have an account? "}
              <a href="#toggle" onClick={toggleMode}>
                {isLogin ? "Create Account" : "Login"}
              </a>
            </p>
            
            {isLogin && (
              <p>
                <a href="/forgot-password">Forgot your password?</a>
              </p>
            )}
            
            <p className="footer-note">
              {isLogin 
                ? "Inspired by the wisdom of the Bhagavad Gita"
                : "Embark on your path to spiritual enlightenment"
              }
            </p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default LoginPage;