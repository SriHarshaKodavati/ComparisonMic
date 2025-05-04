import React, { useState } from 'react';
import { FaFilePdf, FaCopy, FaSearch, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/ResultsContainer.css';

const ResultsContainer = ({ results, onGeneratePdf, onClear }) => {
  const [activeTab, setActiveTab] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!results) {
    return null;
  }
  
  const { caption, report, interpretations, findings, processing_time } = results;
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success('Copied to clipboard');
      })
      .catch((err) => {
        toast.error('Failed to copy: ' + err);
      });
  };
  
  const highlightSearchTerm = (text) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };
  
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  
  const searchInReport = () => {
    if (!searchTerm.trim()) return;
    
    const reportElement = document.getElementById('report-content');
    reportElement.innerHTML = highlightSearchTerm(report);
    
    // Scroll to first highlight
    const firstHighlight = reportElement.querySelector('.highlight');
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const clearSearch = () => {
    setSearchTerm('');
    const reportElement = document.getElementById('report-content');
    reportElement.innerHTML = report;
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <div className="results-tabs">
          <button 
            className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => handleTabChange('summary')}
          >
            Summary
          </button>
          <button 
            className={`tab-button ${activeTab === 'report' ? 'active' : ''}`}
            onClick={() => handleTabChange('report')}
          >
            Detailed Report
          </button>
          <button 
            className={`tab-button ${activeTab === 'interpretations' ? 'active' : ''}`}
            onClick={() => handleTabChange('interpretations')}
          >
            Interpretations
          </button>
        </div>
        
        <div className="results-actions">
          <button className="btn btn-secondary btn-sm" onClick={onClear}>
            <FaTimes /> Clear
          </button>
          <button className="btn btn-primary btn-sm" onClick={onGeneratePdf}>
            <FaFilePdf /> Download PDF
          </button>
        </div>
      </div>
      
      <div className="results-content">
        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div className="tab-content" id="summary-tab">
            <div className="result-section">
              <h3>X-ray Findings Summary</h3>
              <div className="summary-text">
                {caption}
              </div>
              
              <div className="processing-info">
                <span>Processing Time: {processing_time} seconds</span>
              </div>
            </div>
            
            <div className="result-section">
              <h3>Confidence Indicators</h3>
              <div className="confidence-grid">
                {Object.entries(findings).map(([key, value]) => (
                  <div className="confidence-item" key={key}>
                    <div className="confidence-label">
                      <span>{key}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="confidence-bar">
                      <div className="confidence-fill" style={{ width: `${value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Report Tab */}
        {activeTab === 'report' && (
          <div className="tab-content" id="report-tab">
            <div className="search-bar">
              <div className="search-input-container">
                <input 
                  type="text"
                  className="search-input"
                  placeholder="Search in report..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchInReport()}
                />
                {searchTerm && (
                  <button className="search-clear" onClick={clearSearch}>
                    <FaTimes />
                  </button>
                )}
              </div>
              <button className="search-button" onClick={searchInReport}>
                <FaSearch />
              </button>
            </div>
            
            <div className="report-container">
              <div className="report-header">
                <h3>Detailed Radiology Report</h3>
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => copyToClipboard(report)}
                >
                  <FaCopy /> Copy
                </button>
              </div>
              <div className="report-content" id="report-content">
                {report}
              </div>
            </div>
          </div>
        )}
        
        {/* Interpretations Tab */}
        {activeTab === 'interpretations' && (
          <div className="tab-content" id="interpretations-tab">
            <div className="interpretations-header">
              <h3>Alternative Diagnostic Interpretations</h3>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => copyToClipboard(interpretations.join('\n\n'))}
              >
                <FaCopy /> Copy All
              </button>
            </div>
            
            <p className="interpretations-info">
              These are possible alternative diagnostic considerations based on the X-ray findings. 
              For educational purposes only.
            </p>
            
            <div className="interpretations-list">
              {interpretations.map((interp, index) => (
                <div className="interpretation-item" key={index}>
                  <div className="interpretation-content">
                    {interp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="results-footer">
        <div className="disclaimer">
          <strong>DISCLAIMER:</strong> This analysis is generated using artificial intelligence and is for educational 
          purposes only. It should not be used for medical diagnosis or treatment. Please consult with a 
          qualified healthcare professional for proper medical advice and interpretation.
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;