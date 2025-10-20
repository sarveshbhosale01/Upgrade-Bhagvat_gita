import React, { useState, useEffect, useRef } from 'react';
import './meditation.css';

const MeditationTimer = () => {
  const [time, setTime] = useState(0); // time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState(600); // 10 minutes default
  const [showCompletion, setShowCompletion] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('brain-detox'); // Default music
  const audioRef = useRef(null);

  // Music options with paths
  const musicOptions = [
    {
      id: 'brain-detox',
      name: 'Brain Detox',
      path: './Audio1.mp3',
      icon: '🧠',
      description: 'Cleansing frequencies for mental clarity'
    },
    {
      id: 'nature-sounds',
      name: 'Nature Sounds',
      path: './Audio2.mp3',
      icon: '🌿',
      description: 'Peaceful forest and water sounds'
    },
    {
      id: 'tibetan-bowls',
      name: 'Tibetan Bowls',
      path: './Audio3.mp3',
      icon: '🪘',
      description: 'Healing crystal bowl vibrations'
    },
    {
      id: 'ambient-drone',
      name: 'Ambient Drone',
      path: './Audio1.mp3',
      icon: '🎵',
      description: 'Soothing ambient soundscape'
    }
  ];

  // Play selected music
  const playMeditationMusic = () => {
    if (audioRef.current) {
      const selectedMusicOption = musicOptions.find(music => music.id === selectedMusic);
      if (selectedMusicOption) {
        audioRef.current.src = selectedMusicOption.path;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(error => {
          console.log('Audio play failed:', error);
        });
      }
    }
  };

  const stopMeditationMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => {
          if (time <= 1) {
            clearInterval(interval);
            setIsActive(false);
            setIsPaused(true);
            setShowCompletion(true);
            stopMeditationMusic();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (time === 0) {
      setTime(selectedDuration);
    }
    setIsActive(true);
    setIsPaused(false);
    playMeditationMusic();
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      playMeditationMusic();
    } else {
      stopMeditationMusic();
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(selectedDuration);
    stopMeditationMusic();
    setShowCompletion(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(selectedDuration);
    stopMeditationMusic();
    setShowCompletion(false);
  };

  const handleDurationChange = (minutes) => {
    setSelectedDuration(minutes * 60);
    setTime(minutes * 60);
    setShowCompletion(false);
  };

  const handleMusicChange = (musicId) => {
    setSelectedMusic(musicId);
    // If music is currently playing, restart with new selection
    if (isActive && !isPaused) {
      stopMeditationMusic();
      setTimeout(() => {
        playMeditationMusic();
      }, 100);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    return ((selectedDuration - time) / selectedDuration) * 100;
  };

  const durations = [
    { minutes: 5, label: '5 min' },
    { minutes: 10, label: '10 min' },
    { minutes: 15, label: '15 min' },
    { minutes: 20, label: '20 min' },
    { minutes: 30, label: '30 min' },
    { minutes: 45, label: '45 min' },
    { minutes: 60, label: '60 min' }
  ];

  const getCurrentMusic = () => {
    return musicOptions.find(music => music.id === selectedMusic) || musicOptions[0];
  };

  return (
    <div className="meditation-timer-container">
      {/* Scrollable Container */}
      <div className="timer-scroll-container">
        
        {/* Hidden audio element */}
        <audio ref={audioRef} preload="auto" />
        
        <div className="timer-header">
          <h1>Meditation Timer</h1>
          <p>Find your inner peace with guided timing</p>
        </div>

        <div className="timer-content">
          {/* Duration Selection */}
          <div className="duration-selection">
            <h3>Select Duration</h3>
            <div className="duration-buttons">
              {durations.map((duration) => (
                <button
                  key={duration.minutes}
                  className={`duration-btn ${
                    selectedDuration === duration.minutes * 60 ? 'active' : ''
                  }`}
                  onClick={() => handleDurationChange(duration.minutes)}
                  disabled={isActive}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>

          {/* Music Selection */}
          <div className="music-selection">
            <h3>Choose Meditation Music</h3>
            <div className="music-options">
              {musicOptions.map((music) => (
                <div
                  key={music.id}
                  className={`music-option ${selectedMusic === music.id ? 'active' : ''} ${
                    isActive ? 'disabled' : ''
                  }`}
                  onClick={() => !isActive && handleMusicChange(music.id)}
                >
                  <div className="music-icon">{music.icon}</div>
                  <div className="music-info">
                    <h4>{music.name}</h4>
                    <p>{music.description}</p>
                  </div>
                  {selectedMusic === music.id && (
                    <div className="music-selected-indicator">✓</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Timer Circle */}
          <div className="timer-circle-container">
            <div className="timer-circle">
              
              {/* Progress ring - BEHIND */}
              <svg className="progress-ring" width="320" height="320">
                <circle
                  className="progress-ring-circle"
                  stroke="url(#goldGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  r="140"
                  cx="160"
                  cy="160"
                  style={{
                    strokeDasharray: 879.2,
                    strokeDashoffset: 879.2 - (879.2 * getProgress()) / 100
                  }}
                />
                <defs>
                  <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="50%" stopColor="#f1c40f" />
                    <stop offset="100%" stopColor="#ffd700" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Timer Border */}
              <div className="timer-circle-border">
                <div className="timer-circle-inner">
                  {/* Time Display - ON TOP */}
                  <div className="time-display">
                    <span className="timer-status">
                      {!isActive ? 'Ready to Meditate' : isPaused ? 'Paused' : 'Meditating...'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Numerical Timer */}
              <div className="numerical-timer">
                <span className="time-text">{formatTime(time)}</span>
              </div>
              
            </div>
          </div>

          {/* Current Music Display */}
          {isActive && (
            <div className="current-music-display">
              <div className="current-music-info">
                <span className="music-icon">{getCurrentMusic().icon}</span>
                <span className="music-name">Now Playing: {getCurrentMusic().name}</span>
              </div>
            </div>
          )}

          {/* Control Buttons */}
          <div className="timer-controls">
            {!isActive ? (
              <button className="control-btn start-btn" onClick={handleStart}>
                <span className="btn-icon">🎯</span>
                Start Meditation
              </button>
            ) : (
              <>
                <button className="control-btn pause-btn" onClick={handlePauseResume}>
                  <span className="btn-icon">{isPaused ? '▶' : '⏸'}</span>
                  {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className="control-btn stop-btn" onClick={handleStop}>
                  <span className="btn-icon">⏹</span>
                  Stop
                </button>
              </>
            )}
            
            {isActive && (
              <button className="control-btn reset-btn" onClick={handleReset}>
                <span className="btn-icon">🔄</span>
                Reset
              </button>
            )}
          </div>

          {/* Enhanced Meditation Tips */}
          <div className="meditation-tips-section">
            <div className="tips-header">
              <h3>🌿 Meditation Pro Tips</h3>
              <p>Enhance your meditation experience with these techniques</p>
            </div>
            
            <div className="tips-grid">
              <div className="tip-card">
                <div className="tip-icon">🧘‍♂️</div>
                <h4>Posture & Alignment</h4>
                <ul>
                  <li>Sit with straight spine</li>
                  <li>Relax your shoulders</li>
                  <li>Hands on knees or lap</li>
                  <li>Chin slightly tucked</li>
                </ul>
              </div>

              <div className="tip-card">
                <div className="tip-icon">🌬️</div>
                <h4>Breathing Technique</h4>
                <ul>
                  <li>Breathe naturally</li>
                  <li>Focus on exhale</li>
                  <li>Deep abdominal breaths</li>
                  <li>Maintain rhythm</li>
                </ul>
              </div>

              <div className="tip-card">
                <div className="tip-icon">💭</div>
                <h4>Mind Management</h4>
                <ul>
                  <li>Observe thoughts without judgment</li>
                  <li>Gently return to breath</li>
                  <li>Use mantras if helpful</li>
                  <li>Practice daily consistency</li>
                </ul>
              </div>

              <div className="tip-card">
                <div className="tip-icon">🎵</div>
                <h4>Sound & Environment</h4>
                <ul>
                  <li>Use meditation music</li>
                  <li>Choose quiet space</li>
                  <li>Comfortable temperature</li>
                  <li>Dim lighting preferred</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h3>🌟 Benefits of Regular Meditation</h3>
            <div className="benefits-grid">
              <div className="benefit-item">
                <span className="benefit-icon">😌</span>
                <span>Reduced Stress & Anxiety</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🎯</span>
                <span>Improved Focus</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💤</span>
                <span>Better Sleep</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">❤️</span>
                <span>Emotional Balance</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🧠</span>
                <span>Mental Clarity</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">⚡</span>
                <span>Increased Energy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {showCompletion && (
        <div className="completion-modal">
          <div className="completion-content">
            <div className="completion-icon">🎉</div>
            <h2>Meditation Complete!</h2>
            <p>You've successfully completed your {selectedDuration / 60} minute meditation session.</p>
            <p className="completion-quote">
              "The mind is restless and difficult to restrain, but it is subdued by practice."
              <br />
              <span>- Bhagavad Gita 6:35</span>
            </p>
            <button 
              className="control-btn start-btn" 
              onClick={() => setShowCompletion(false)}
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}

      {/* Music Active Display */}
      {isActive && !isPaused && (
        <div className="sound-detox-section">
          <h3 className="sound-section-title">
            {getCurrentMusic().icon} {getCurrentMusic().name} Active
          </h3>
          <div className="waves-container">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
          </div>
          <p className="sound-tip">
            Enhance your meditation by focusing on the soothing {getCurrentMusic().name.toLowerCase()}.
          </p>
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;