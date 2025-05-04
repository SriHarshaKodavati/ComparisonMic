import React, { useState } from 'react';

const SimpleTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabData = [
    {
      title: "Overview",
      content: (
        <div style={{padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '4px'}}>
          <h3>Overview Content</h3>
          <p>This is the content for the Overview tab. If you can see this text, the tab functionality is working correctly!</p>
        </div>
      )
    },
    {
      title: "Architectures",
      content: (
        <div style={{padding: '20px', backgroundColor: '#e1f5e1', borderRadius: '4px'}}>
          <h3>Architectures Content</h3>
          <p>This is the content for the Architectures tab. If you can see this text, the tab functionality is working correctly!</p>
        </div>
      )
    },
    {
      title: "Training",
      content: (
        <div style={{padding: '20px', backgroundColor: '#ffe1c9', borderRadius: '4px'}}>
          <h3>Training Content</h3>
          <p>This is the content for the Training tab. If you can see this text, the tab functionality is working correctly!</p>
        </div>
      )
    },
    {
      title: "Results",
      content: (
        <div style={{padding: '20px', backgroundColor: '#ffd2d6', borderRadius: '4px'}}>
          <h3>Results Content</h3>
          <p>This is the content for the Results tab. If you can see this text, the tab functionality is working correctly!</p>
        </div>
      )
    }
  ];

  // Direct styling without using class names
  const containerStyle = {
    maxWidth: '800px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };
  
  const tabButtonsStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '10px'
  };
  
  const tabButtonStyle = (isActive) => ({
    padding: '8px 16px',
    backgroundColor: isActive ? '#4f46e5' : '#f9fafb',
    color: isActive ? 'white' : '#4b5563',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontWeight: isActive ? '600' : '400',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  });
  
  const contentStyle = {
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    border: '1px solid #e5e7eb'
  };
  
  return (
    <div style={containerStyle}>
      <h2 style={{marginBottom: '20px', color: '#1f2937'}}>Simple Tab Test</h2>
      
      {/* Tab Buttons */}
      <div style={tabButtonsStyle}>
        {tabData.map((tab, index) => (
          <button
            key={index}
            style={tabButtonStyle(activeTab === index)}
            onClick={() => {
              console.log(`Changing tab from ${activeTab} to ${index}`);
              setActiveTab(index);
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      
      {/* Tab Content - Method 1: Using conditional rendering */}
      <div style={contentStyle}>
        <div data-testid="tab-content">
          {tabData[activeTab].content}
        </div>
      </div>
      
      {/* Debug Info */}
      <div style={{marginTop: '20px', padding: '10px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '14px'}}>
        <p><strong>Debug Info:</strong></p>
        <p>Active Tab Index: {activeTab}</p>
        <p>Active Tab Title: {tabData[activeTab].title}</p>
      </div>
    </div>
  );
};

export default SimpleTabs;