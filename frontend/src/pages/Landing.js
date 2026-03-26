import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-navbar">
        <div className="logo">
          <div className="logo-icon">
            <span className="briefcase">💼</span>
            <span className="graduation">🎓</span>
          </div>
          <span className="logo-text">
            <span className="brand-name">CampusConnect</span>
            <span className="tagline">Placement Portal</span>
          </span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#stats">Statistics</a>
          <a href="#companies">Companies</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">🎓 Campus Placements 2024</span>
            <h1 className="hero-title">
              Your Gateway to <br/>
              <span className="gradient-text">Dream Career</span>
            </h1>
            <p className="hero-description">
              Connect with top companies, track your applications, and land your dream job. 
              Join thousands of students who have successfully launched their careers through CampusConnect.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/student/login')}>
                🚀 Get Started
              </button>
              <button className="btn-secondary" onClick={() => navigate('/admin/login')}>
                💼 Admin Portal
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">
              <span className="card-icon">💼</span>
              <div>
                <h4>500+</h4>
                <p>Students Placed</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <span className="card-icon">🏛️</span>
              <div>
                <h4>100+</h4>
                <p>Top Companies</p>
              </div>
            </div>
            <div className="floating-card card-3">
              <span className="card-icon">💰</span>
              <div>
                <h4>12 LPA</h4>
                <p>Avg Package</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Why Choose CampusConnect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Real-time Notifications</h3>
            <p>Get instant alerts for new job postings and placement updates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Applications</h3>
            <p>Monitor your application status and interview schedules</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Eligibility Check</h3>
            <p>Automatic verification of eligibility criteria before applying</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Email Reminders</h3>
            <p>24-hour placement reminders sent directly to your inbox</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Students Placed</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>Partner Companies</p>
          </div>
          <div className="stat-item">
            <h3>12 LPA</h3>
            <p>Average Package</p>
          </div>
          <div className="stat-item">
            <h3>95%</h3>
            <p>Placement Rate</p>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="companies" className="companies-section">
        <h2 className="section-title">Our Recruiting Partners</h2>
        <div className="companies-grid">
          <div className="company-logo">🔍 Google</div>
          <div className="company-logo">🪟 Microsoft</div>
          <div className="company-logo">📦 Amazon</div>
          <div className="company-logo">💼 TCS</div>
          <div className="company-logo">💻 Infosys</div>
          <div className="company-logo">🌐 Wipro</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Launch Your Career?</h2>
        <p>Join CampusConnect today and take the first step towards your dream job</p>
        <button className="btn-cta" onClick={() => navigate('/student/login')}>
          Get Started Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">
                <span className="briefcase">💼</span>
                <span className="graduation">🎓</span>
              </div>
              <span className="logo-text">
                <span className="brand-name">CampusConnect</span>
              </span>
            </div>
            <p>Empowering students to achieve their career goals</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#stats">Statistics</a>
            <a href="#companies">Companies</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 support@campusconnect.edu</p>
            <p>📞 +91 9876543210</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CampusConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
