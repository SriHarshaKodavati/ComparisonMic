// HomePage.js (Expanded with more sections)
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBrain, FaFileAlt, FaFilePdf, FaArrowRight, FaChartLine, FaLaptopMedical, 
         FaDatabase, FaUserMd, FaClipboardCheck, FaShieldAlt, FaCloud, FaHistory } from 'react-icons/fa';
import '../styles/HomePage.css';
import sampleImage from '../assets/sample-xray.png';
import educationImage from '../assets/education-image.jpg';
import researchImage from '../assets/research-image.jpg'; 
import libraryImage from '../assets/library-image.jpg';

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFaq, setActiveFaq] = useState(null);
  
  useEffect(() => {
    // Initialize animations and interactions
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    // Counter animation for statistics
    const startCounters = () => {
      document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const speed = parseInt(counter.getAttribute('data-speed'));
        let count = 0;
        
        const updateCounter = () => {
          const increment = target / speed;
          if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            setTimeout(updateCounter, 30);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };
        
        updateCounter();
      });
    };
    
    // Initialize the counters when stats section is visible
    const statsSection = document.querySelector('.statistics');
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        statsObserver.unobserve(entries[0].target);
      }
    }, { threshold: 0.5 });
    
    if (statsSection) {
      statsObserver.observe(statsSection);
    }
    
    // Hover effects for interactive elements
    document.querySelectorAll('.hover-effect').forEach(el => {
      el.addEventListener('mouseenter', () => {
        el.classList.add('hovered');
      });
      
      el.addEventListener('mouseleave', () => {
        el.classList.remove('hovered');
      });
    });
    
    return () => {
      // Clean up event listeners
      document.querySelectorAll('.hover-effect').forEach(el => {
        el.removeEventListener('mouseenter', () => {});
        el.removeEventListener('mouseleave', () => {});
      });
    };
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section (Unchanged) */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>AI-Powered Chest X-ray Analysis</h1>
              <p>
                Upload your chest X-ray images and get instant AI-generated analysis, captions,
                and structured radiology reports.
              </p>
              <div className="hero-buttons">
                <Link to="/dashboard" className="btn btn-primary btn-lg btn-icon">
                  Try It Now <FaArrowRight />
                </Link>
                <a href="#about" className="btn btn-outline btn-lg">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img src={sampleImage} alt="Chest X-ray Analysis" />
              <div className="image-scanner"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Revamped) */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge">Advanced Technology</div>
            <h2>Key Features</h2>
            
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaBrain />
              </div>
              <h3>AI Analysis</h3>
              <p>
                Advanced CheXNet architecture identifies abnormalities with high accuracy and speed.
              </p>
              <div className="feature-meter">
                {/* <div className="meter-label">Accuracy</div> */}
                {/* <div className="meter">
                  <div className="meter-fill" style={{width: '95%'}}></div>
                </div>
                <div className="meter-value">95%</div> */}
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaFileAlt />
              </div>
              <h3>Detailed Reports</h3>
              <p>
                Comprehensive radiology reports with findings, impressions, and recommendations.
              </p>
              <div className="feature-tags">
                <span className="tag">Structured</span>
                <span className="tag">Medical</span>
                <span className="tag">Editable</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaFilePdf />
              </div>
              <h3>Multi-Format Export</h3>
              <p>
                Export analysis results as PDF, DOCX or HTML for educational and research use.
              </p>
              <div className="format-list">
                <span className="format-icon">PDF</span>
                <span className="format-icon">DOC</span>
                <span className="format-icon">HTML</span>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaLaptopMedical />
              </div>
              <h3>Interactive Viewer</h3>
              <p>
                Manipulate, zoom, and annotate X-ray images in real-time with our viewer.
              </p>
              <div className="feature-meter">
                <div className="meter-label">User Satisfaction</div>
                <div className="meter">
                  <div className="meter-fill" style={{width: '92%'}}></div>
                </div>
                <div className="meter-value">92%</div>
              </div>
            </div>
            
            {/* Feature 5 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaDatabase />
              </div>
              <h3>Research Database</h3>
              <p>
                Optionally store anonymized data for advancing medical AI research.
              </p>
              <div className="feature-tags">
                <span className="tag">Anonymized</span>
                <span className="tag">Secure</span>
                <span className="tag">Opt-in</span>
              </div>
            </div>
            
            {/* Feature 6 */}
            <div className="feature-card animate-on-scroll hover-effect">
              <div className="feature-icon">
                <FaChartLine />
              </div>
              <h3>Analysis Confidence</h3>
              <p>
                View confidence scores for each finding to understand diagnostic certainty.
              </p>
              <div className="format-list">
                <div className="confidence-indicator high">High</div>
                <div className="confidence-indicator medium">Medium</div>
                <div className="confidence-indicator low">Low</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,138.7C384,149,480,139,576,122.7C672,107,768,85,864,96C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Section (New) */}
      <section className="statistics" id="statistics">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge">Performance</div>
            <h2>Our Impact</h2>
            
          </div>
          
          <div className="stats-grid">
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon">
                <FaUserMd />
              </div>
              <div className="stat-number">
                <span className="counter" data-target="10000" data-speed="100">0</span>+
              </div>
              <div className="stat-label">X-rays Analyzed</div>
            </div>
            
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon">
                <FaClipboardCheck />
              </div>
              <div className="stat-number">
                <span className="counter" data-target="60" data-speed="50">0</span>%
              </div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon">
                <FaCloud />
              </div>
              <div className="stat-number">
                <span className="counter" data-target="15" data-speed="10">0</span>
              </div>
              <div className="stat-label">Conditions Detected</div>
            </div>
            
            <div className="stat-card animate-on-scroll">
              <div className="stat-icon">
                <FaHistory />
              </div>
              <div className="stat-number">
                <span className="counter" data-target="3" data-speed="5">0</span>s
              </div>
              <div className="stat-label">Processing Time</div>
            </div>
          </div>
        </div>
        
        <div className="wave-divider inverted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,218.7C672,203,768,149,864,144C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* How It Works Section (Revamped) */}
      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge">Simple Process</div>
            <h2>How It Works</h2>
            
          </div>

          <div className="steps-wrapper">
            <div className="steps-timeline"></div>
            <div className="steps">
              <div className="step animate-on-scroll hover-effect">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Upload X-ray</h3>
                  <p>
                    Upload your chest X-ray in JPEG, PNG, or DICOM formats.
                  </p>
                  <div className="step-illustration">
                    <div className="upload-animation">
                      <div className="upload-icon"></div>
                      <div className="upload-progress"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step animate-on-scroll hover-effect">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>AI Analysis</h3>
                  <p>
                    Our deep learning models analyze the image to detect abnormalities.
                  </p>
                  <div className="step-illustration">
                    <div className="analysis-animation">
                      <div className="analysis-scan"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step animate-on-scroll hover-effect">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Review Results</h3>
                  <p>
                    Review the generated captions, findings, and interpretations.
                  </p>
                  <div className="step-illustration">
                    <div className="results-animation">
                      <div className="result-line"></div>
                      <div className="result-line"></div>
                      <div className="result-line"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step animate-on-scroll hover-effect">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Export Report</h3>
                  <p>
                    Download a comprehensive report with all findings.
                  </p>
                  <div className="step-illustration">
                    <div className="export-animation">
                      <div className="export-doc"></div>
                      <div className="export-arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f0f9ff" fillOpacity="1" d="M0,128L48,117.3C96,107,192,85,288,90.7C384,96,480,128,576,133.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Use Cases Section (New) */}
      <section className="use-cases" id="use-cases">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge">Applications</div>
            <h2>Use Cases</h2>
            
          </div>
          
          <div className="use-cases-grid">
            <div className="case-card animate-on-scroll hover-effect">
              <div className="case-content">
                <h3>Medical Education</h3>
                <p>Students can learn how AI analyzes X-rays and compare with traditional methods.</p>
                <ul className="case-list">
                  <li>Learning radiologic patterns</li>
                  <li>Understanding AI detection capabilities</li>
                  <li>Comparing against expert diagnoses</li>
                </ul>
              </div>
              <div className="case-image" style={{backgroundImage: `url(${educationImage})`}}></div>
            </div>
            
            <div className="case-card animate-on-scroll hover-effect">
              <div className="case-content">
                <h3>Research Development</h3>
                <p>Researchers can use the platform to test AI models and contribute to improvements.</p>
                <ul className="case-list">
                  <li>Testing algorithm accuracy</li>
                  <li>Contributing to model training</li>
                  <li>Validating results across populations</li>
                </ul>
              </div>
              <div className="case-image research-image"></div>
            </div>
            
            <div className="case-card animate-on-scroll hover-effect">
              <div className="case-content">
                <h3>Educational Libraries</h3>
                <p>Build teaching collections of X-rays with AI annotations for medical training.</p>
                <ul className="case-list">
                  <li>Creating annotated X-ray libraries</li>
                  <li>Organizing by condition types</li>
                  <li>Sharing knowledge resources</li>
                </ul>
              </div>
              <div className="case-image library-image"></div>
            </div>
          </div>
        </div>
        
        <div className="wave-divider inverted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#fff" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,176C672,181,768,171,864,154.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Try It CTA Section (New) */}
      <section className="try-it-cta" id="try-it">
        <div className="container">
          <div className="cta-wrapper animate-on-scroll">
            <div className="cta-content">
              <h2>Ready to Try Our AI X-ray Analysis?</h2>
              <p>Experience the power of AI in medical imaging analysis for educational purposes.</p>
              <div className="cta-features">
                <div className="cta-feature">
                  <div className="feature-check">✓</div>
                  <span>No registration required</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-check">✓</div>
                  <span>Free for educational use</span>
                </div>
                <div className="cta-feature">
                  <div className="feature-check">✓</div>
                  <span>Instant results</span>
                </div>
              </div>
              <Link to="/dashboard" className="btn btn-primary btn-lg">
                Start Using Now
              </Link>
            </div>
            <div className="cta-preview">
              <div className="preview-screen">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="preview-title">X-ray Analysis Dashboard</div>
                </div>
                <div className="preview-body">
                  <div className="preview-image"></div>
                  <div className="preview-results">
                    <div className="preview-line"></div>
                    <div className="preview-line"></div>
                    <div className="preview-line"></div>
                    <div className="preview-badges">
                      <span className="preview-badge">Normal</span>
                      <span className="preview-badge">No findings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="wave-divider">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,176C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* About Section (Revamped) */}
      <section className="about" id="about">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="badge">Project Details</div>
            <h2>About This Project</h2>
            
          </div>
          
          <div className="about-content animate-on-scroll">
            <div className="about-tabs">
              <div className="tabs-nav">
                <button 
                  className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} 
                  onClick={() => handleTabChange('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                  onClick={() => handleTabChange('tech')}
                >
                  Technology
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                  onClick={() => handleTabChange('faq')}
                >
                  FAQ
                </button>
              </div>
              
              <div className={`tab-content ${activeTab === 'overview' ? 'active' : ''}`}>
                <p>
                  This web application demonstrates the use of deep learning in medical image analysis,
                  specifically focusing on chest X-ray interpretation. It combines a pre-trained DenseNet-based
                  model for feature extraction with BioGPT for generating structured medical reports.
                </p>
                <div className="disclaimer">
                  <strong>Important Disclaimer:</strong> This application is for educational and research
                  purposes only. It is not intended for clinical use or to provide medical advice. The generated
                  reports and interpretations should not be used for diagnosis or treatment decisions.
                </div>
                <div className="about-buttons">
                  <Link to="/dashboard" className="btn btn-primary">
                    Try the Application
                  </Link>
                </div>
              </div>
              
              <div className={`tab-content ${activeTab === 'tech' ? 'active' : ''}`}>
                <div className="tech-stack">
                  <div className="tech-category">
                    <h4>Backend</h4>
                    <div className="tech-pills">
                      <span className="tech-pill">Flask</span>
                      <span className="tech-pill">PyTorch</span>
                      <span className="tech-pill">Transformers</span>
                    </div>
                  </div>
                  
                  <div className="tech-category">
                    <h4>Frontend</h4>
                    <div className="tech-pills">
                      <span className="tech-pill">React</span>
                      <span className="tech-pill">CSS</span>
                      <span className="tech-pill">JavaScript</span>
                    </div>
                  </div>
                  
                  <div className="tech-category">
                    <h4>Models</h4>
                    <div className="tech-pills">
                      <span className="tech-pill">DenseNet121</span>
                      <span className="tech-pill">BioGPT</span>
                    </div>
                  </div>
                </div>
                
                <div className="model-architecture">
                  <h4>Model Architecture</h4>
                  <div className="architecture-diagram">
                    <div className="arch-node input">Input X-ray</div>
                    <div className="arch-arrow"></div>
                    <div className="arch-node">Feature Extraction</div>
                    <div className="arch-arrow"></div>
                    <div className="arch-node">Classification</div>
                    <div className="arch-arrow"></div>
                    <div className="arch-node">Report Generation</div>
                    <div className="arch-arrow"></div>
                    <div className="arch-node output">Structured Report</div>
                  </div>
                </div>
              </div>
              
              <div className={`tab-content ${activeTab === 'faq' ? 'active' : ''}`}>
                <div className="faq-list">
                  {[
                    {
                      question: "What types of X-rays can I analyze?",
                      answer: "Currently, the system is optimized for posterior-anterior (PA) and anterior-posterior (AP) chest X-rays. Lateral chest X-rays are also supported but with somewhat lower accuracy."
                    },
                    {
                      question: "Is my medical data secure?",
                      answer: "Yes, we do not store your X-ray images or analysis results permanently. All processing happens locally in your browser session and data is automatically deleted when you close the application."
                    },
                    {
                      question: "How accurate is the analysis?",
                      answer: "Our model achieves 60-90% accuracy for common findings, comparable to recent research in the field. However, as noted in our disclaimer, this is not intended for clinical diagnosis."
                    },
                    {
                      question: "Can I contribute to improve the system?",
                      answer: "Yes! Researchers and medical professionals can contribute to our project on GitHub or help with model validation by providing labeled datasets."
                    }
                  ].map((faq, index) => (
                    <div 
                      key={index}
                      className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                      onClick={() => toggleFaq(index)}
                    >
                      <div className="faq-question">
                        {faq.question}
                      </div>
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section (New) */}
      <section className="newsletter" id="newsletter">
        <div className="container">
          <div className="newsletter-wrapper animate-on-scroll">
            <div className="newsletter-content">
              <h2>Stay Updated</h2>
              <p>Subscribe to our newsletter for updates on new features, AI advancements, and educational resources.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
              <div className="newsletter-privacy">
                We respect your privacy and will never share your information.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;