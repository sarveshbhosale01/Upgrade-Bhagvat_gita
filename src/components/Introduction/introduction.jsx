import React from "react";
import { useNavigate } from "react-router-dom";
import "./introduction.css";

export default function IntroductionPage({ onNext }) {
  const navigate = useNavigate();
  return (
    <div className="intro-container">
      {/* Golden Border Frame */}
      <div className="intro-frame">
        <div className="intro-content">
          <h1 className="intro-title">Bhagvat Gita AI</h1>
          <h2 className="intro-subtitle">“Where Krishna speaks through AI”</h2>

          <p className="intro-text">
            The <strong>Bhagvat Gita Project</strong> is created to bring
            timeless wisdom to the modern world. Many people today feel lost,
            unheard, or lack guidance. Our goal is to build a digital space
            where even those without a teacher can find the compassionate voice
            of <span className="highlight">Lord Krishna</span> — through
            intelligent conversation.
          </p>

          <p className="intro-text">
            This platform connects you with an AI named
            <span className="highlight"> Claude</span>, trained to speak as
            Krishna himself — guiding you as Arjuna, with wisdom from the
            Bhagavad Gita, to help you overcome confusion, fear, and doubt.
          </p>

          <p className="intro-text">
            By combining <strong>ancient wisdom</strong> and
            <strong> modern intelligence</strong>, we aim to improve emotional
            well-being, mindfulness, and the quality of life on the Internet.
          </p>

          <button className="intro-btn" onClick={() => navigate("/dashboard")}>
            Proceed to Dashboard
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="chakra-symbol"></div>
      <div className="intro-footer">© Bhagvat Gita AI — Guided by Krishna</div>
    </div>
  );
}
