import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <p className="footer-copyright">&copy; {new Date().getFullYear()} Medical Image Analysis App</p>
            <p className="footer-disclaimer">
              For educational and research purposes only. Not for clinical use.
            </p>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">
              <FaGithub className="social-icon" />
            </a>
            <a href="#" className="social-link">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="#" className="social-link">
              <FaTwitter className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;