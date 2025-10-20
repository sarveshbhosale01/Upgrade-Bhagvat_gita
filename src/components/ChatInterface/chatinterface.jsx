import React, { useState, useRef, useEffect } from 'react';
import './chatinterface.css';

// Import character images
import krishnaImage from '/LordKrishna.webp';
import arjunaImage from '/Arjuna.webp';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceError, setVoiceError] = useState(false);
  const messagesEndRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // Sample responses based on common Gita questions
  const gitaResponses = {
    "main message": "The Bhagavad Gita's core message is about performing one's duty without attachment to results. Lord Krishna teaches Arjuna to fight for righteousness while maintaining mental equipoise, emphasizing the paths of Karma Yoga, Bhakti Yoga, and Jnana Yoga.",
    
    "karma yoga": "Karma Yoga is the yoga of selfless action. It means performing your duties without attachment to the fruits of your actions. As Krishna says in Chapter 2, Verse 47: 'You have the right to perform your prescribed duties, but you are not entitled to the fruits of your actions.'",
    
    "stress": "In Chapter 2, Verse 50, Krishna advises: 'A person engaged in devotional service rids himself of both good and bad reactions even in this life. Therefore strive for yoga, which is the art of all work.' The Gita teaches equanimity - maintaining mental balance in success and failure.",
    
    "bhakti yoga": "Bhakti Yoga is the path of devotion. Chapter 12 explains how to cultivate love for the Divine through constant remembrance, worship, and selfless service. Start by offering your daily activities to the Divine and practicing gratitude.",
    
    "chapter 2": "Chapter 2, Sankhya Yoga, is considered the summary of the entire Gita. It covers: the eternal nature of the soul, the concept of duty, the characteristics of a stable-minded person (sthitaprajna), and the introduction to Karma Yoga.",
    
    "dharma": "Dharma refers to righteous duty and moral order. It's the essential principle of one's true nature and purpose. The Gita emphasizes following one's svadharma (personal duty) rather than adopting another's path.",
    
    "atman": "Atman is the eternal, indestructible soul that transcends the physical body. As described in Chapter 2, the soul is never born nor dies - it is eternal, everlasting, and primeval. The body is perishable, but the soul is immortal.",
    
    "control mind": "In Chapter 6, Verse 35, Krishna says: 'Undoubtedly, O mighty-armed one, the mind is difficult to control and restless, but it can be controlled by constant practice and detachment.' Regular meditation and self-discipline are key.",
    
    "detachment": "Detachment (vairagya) means performing actions without selfish attachment to results. It's not indifference but freedom from anxiety about outcomes. As Krishna teaches: 'Do your duty efficiently but free from the bonds of desire.'",
    
    "purpose of life": "The ultimate purpose of life according to the Gita is self-realization and liberation (moksha) from the cycle of birth and death. This is achieved by understanding one's true nature as the eternal soul and uniting with the Divine.",

    // New conceptual responses
    "maya": "Maya is the divine illusion that makes the temporary world appear real and permanent. It's the energy that creates the appearance of duality and separation from the Supreme. The Gita teaches us to see through Maya and perceive the eternal reality behind the temporary.",
    
    "sthitaprajna": "A sthitaprajna is a person of steady wisdom, described in Chapter 2. Such a person remains unperturbed in happiness and distress, free from attachment and aversion, with controlled senses and mind established in the Self.",
    
    "three gunas": "The three gunas are the fundamental qualities of nature: Sattva (purity, harmony), Rajas (passion, activity), and Tamas (ignorance, inertia). The Gita teaches transcending all three gunas to attain liberation.",
    
    "yoga": "Yoga in the Gita means union with the Divine. It includes various paths: Karma Yoga (selfless action), Bhakti Yoga (devotion), Jnana Yoga (knowledge), and Dhyana Yoga (meditation). All lead to the same goal of self-realization.",
    
    "reincarnation": "The Gita explains reincarnation as the soul's journey through different bodies. As one discards old clothes and wears new ones, the soul discards old bodies and enters new ones (Chapter 2, Verse 22).",
    
    "meditation": "In Chapter 6, Krishna describes meditation as fixing the mind on the Supreme. The yogi should sit in a clean place, hold the body straight, and focus the mind single-pointedly on the Divine for self-realization.",
    
    "free will": "The Gita acknowledges free will while emphasizing divine grace. We have the freedom to choose our actions, but the results are governed by divine law. The wise choose actions aligned with dharma.",
    
    "nature of god": "Krishna reveals His cosmic form in Chapter 11, showing that God is both immanent in creation and transcendent beyond it. He is the source of all beings, the sustainer, and the ultimate abode.",
    
    "equanimity": "Equanimity (samatva) is a key virtue in the Gita. It means maintaining mental balance in pleasure and pain, success and failure, honor and dishonor. This leads to peace and spiritual progress.",
    
    "self realization": "Self-realization means understanding one's true nature as the eternal Atman, distinct from the temporary body and mind. This knowledge liberates one from the cycle of birth and death."
  };

  // Enhanced text-to-speech function with optimized voice for wise, calm tone
  const speakKrishnaMessage = async (text) => {
    // Stop any ongoing speech
    stopSpeaking();

    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      setVoiceError(true);
      return;
    }

    return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          proceedWithSpeech(voices, text, resolve);
        };
      } else {
        proceedWithSpeech(voices, text, resolve);
      }
    });
  };

  const proceedWithSpeech = (voices, text, resolve) => {
    const utterance = new SpeechSynthesisUtterance();
    
    // OPTIMIZED VOICE CONFIGURATION FOR WISE, CALM MALE VOICE
   utterance.rate = 0.9;     // Slightly slow
utterance.pitch = 0.8;    // Calm, deep tone
utterance.volume = 1;          // Softer volume for gentle guidance
    utterance.text = text;

    // Find the best voice for a wise, calm male character
    const wiseMaleVoices = [
      'Google UK English Male',      // Calm British accent
      'Microsoft David',            // Mature American male
      'Daniel',                     // macOS calm male
      'Google UK English',          // Fallback British
      'Microsoft Mark',             // Alternative mature male
      'Alex'                        // macOS intelligent voice
    ];

    // Try to find the perfect voice
    let selectedVoice = voices.find(voice => 
      wiseMaleVoices.some(wiseVoice => voice.name.includes(wiseVoice))
    );

    // Fallback: Look for any male voice with calm characteristics
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('male') ||
        (voice.lang.includes('en') && 
         !voice.name.toLowerCase().includes('female') &&
         !voice.name.toLowerCase().includes('child'))
      );
    }

    // Final fallback
    if (!selectedVoice && voices.length > 0) {
      // Prefer voices that don't sound robotic or high-pitched
      selectedVoice = voices.find(voice => 
        !voice.name.toLowerCase().includes('female') &&
        !voice.name.toLowerCase().includes('child')
      ) || voices[0];
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log('Using voice:', selectedVoice.name);
    }

    // Add event listeners
    utterance.onstart = () => {
      setIsSpeaking(true);
      setVoiceError(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      speechSynthesisRef.current = null;
      resolve();
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setVoiceError(true);
      speechSynthesisRef.current = null;
      resolve();
    };

    speechSynthesisRef.current = utterance;
    
    // Add natural pauses for wisdom-like speech
    const processedText = addWisdomPauses(text);
    utterance.text = processedText;
    
    window.speechSynthesis.speak(utterance);
  };

  // Function to add natural pauses for wise speech patterns
  const addWisdomPauses = (text) => {
    return text
      .replace(/,/g, ', ')        // Pause after commas
      .replace(/\./g, '. ')       // Pause after periods  
      .replace(/\?/g, '? ')       // Pause after questions
      .replace(/\!/g, '! ')       // Pause after exclamations
      .replace(/:/g, ': ')        // Pause after colons
      .replace(/;/g, '; ');       // Pause after semicolons
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      speechSynthesisRef.current = null;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      text: "Welcome to Gita Guide! I'm here to help you understand the teachings of Bhagavad Gita. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Speak the welcome message after a short delay
    setTimeout(() => {
      speakKrishnaMessage(welcomeMessage.text);
    }, 1000);
  }, []);

  const getGitaResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(gitaResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses
    const defaultResponses = [
      "That's an insightful question about the Bhagavad Gita. While I can provide general guidance, for specific verses I recommend consulting the original text with commentary.",
      "The Gita offers profound wisdom on this topic. Lord Krishna emphasizes the importance of selfless action and devotion in achieving spiritual growth.",
      "This teaching is beautifully explained in the Gita. The key is to maintain balance and perform your duty without attachment to results.",
      "Krishna's guidance on this matter focuses on developing equanimity and seeing the Divine in all beings.",
      "The Bhagavad Gita addresses this through various yogic paths - Karma Yoga, Bhakti Yoga, and Jnana Yoga."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowQuickReplies(false);
    setIsLoading(true);

    // Stop any ongoing speech when user sends new message
    stopSpeaking();

    // Simulate AI response delay
    setTimeout(async () => {
      const botResponse = {
        id: Date.now() + 1,
        text: getGitaResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      
      // Speak Krishna's response with better timing
      setTimeout(() => {
        speakKrishnaMessage(botResponse.text);
      }, 300);
    }, 1500);
  };

  const handleQuickReply = (question) => {
    setInputMessage(question);
  };

  const handlePredefinedQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    // Stop any ongoing speech
    stopSpeaking();
    
    const welcomeMessage = {
      id: 1,
      text: "Welcome to Gita Guide! I'm here to help you understand the teachings of Bhagavad Gita. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    setShowQuickReplies(true);
    
    // Speak the welcome message after clear
    setTimeout(() => {
      speakKrishnaMessage(welcomeMessage.text);
    }, 500);
  };

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="chat-interface">
      
      <div className="chat-header">
        <div className="chat-title">
          <h3>🕉️ Gita Guide</h3>
          <span>AI Assistant</span>
        </div>
        <div className="header-controls">
          {isSpeaking && (
            <button className="stop-speech-btn" onClick={stopSpeaking} title="Stop speaking">
              ⏹️
            </button>
          )}
          {voiceError && (
            <span className="voice-error" title="Voice synthesis not available">
              🔇
            </span>
          )}
          <button className="clear-chat-btn" onClick={clearChat}>
            Clear Chat
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {/* Character Profile */}
            <div className="character-profile">
              {message.sender === 'user' ? (
                <div className="profile-image arjuna">
                  <span className="character-emoji">
                    <img src={arjunaImage} alt="Arjuna" className="character-icon" />
                  </span>
                </div>
              ) : (
                <div className="profile-image krishna">
                  <span className="character-emoji">
                    <img src={krishnaImage} alt="Lord Krishna" className="character-icon" />
                  </span>
                  {isSpeaking && messages[messages.length - 1]?.id === message.id && (
                    <div className="speaking-indicator" title="Krishna is speaking">
                      <div className="sound-waves">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Message Content */}
            <div className="message-content-wrapper">
              <span className="character-name">
                {message.sender === 'user' ? 'Arjuna' : 'Lord Krishna'}
              </span>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="character-profile">
              <div className="profile-image krishna">
                <span className="character-emoji">
                  <img src={krishnaImage} alt="Lord Krishna" className="character-icon" />
                </span>
              </div>
            </div>
            <div className="message-content-wrapper">
              <span className="character-name">Lord Krishna</span>
              <div className="typing-indicator-wrapper">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {showQuickReplies && messages.length === 1 && (
        <div className="quick-replies-section">
          <h4>Quick Questions</h4>
          <div className="predefined-questions">
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("What is the main message of Bhagavad Gita?")}
            >
              Main Message
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("Explain the concept of Karma Yoga")}
            >
              Karma Yoga
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("What does Lord Krishna say about dealing with stress?")}
            >
              Dealing with Stress
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("How to practice Bhakti Yoga in daily life?")}
            >
              Bhakti Yoga
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("What is Maya according to Gita?")}
            >
              Concept of Maya
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("Explain the three gunas")}
            >
              Three Gunas
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("What is a sthitaprajna?")}
            >
              Sthitaprajna
            </button>
            <button 
              className="question-btn"
              onClick={() => handlePredefinedQuestion("Teach me about meditation in Gita")}
            >
              Gita Meditation
            </button>
          </div>
        </div>
      )}

      <div className="chat-input-container">
        <div className="quick-replies">
          {[
            'Dharma', 
            'Atman', 
            'Detachment', 
            'Purpose of life',
            'Maya',
            'Three Gunas',
            'Reincarnation',
            'Self Realization'
          ].map((topic) => (
            <button
              key={topic}
              className="quick-reply-btn"
              onClick={() => handleQuickReply(`Tell me about ${topic}`)}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <div className="input-wrapper">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about Bhagavad Gita teachings..."
            rows="1"
            className="chat-input"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;