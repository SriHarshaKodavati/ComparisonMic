// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { FaMedkit, FaInfoCircle } from 'react-icons/fa';
// import Dropzone from '../components/Dropzone';
// import ImagePreview from '../components/ImagePreview';
// import ResultsContainer from '../components/ResultsContainer';
// import Loading from '../components/Loading';
// import { uploadImage, generatePdfReport } from '../services/apiService';
// import '../styles/DashboardPage.css';

// const DashboardPage = () => {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState(null);

//   useEffect(() => {
//     return () => {
//       if (imageUrl) URL.revokeObjectURL(imageUrl);
//     };
//   }, [imageUrl]);

//   const handleFileDrop = (file) => {
//     if (imageUrl) URL.revokeObjectURL(imageUrl);

//     setFile(file);
//     setImageUrl(URL.createObjectURL(file));
//     setResults(null);
//     setApiError(null);
//   };

//   const handleProcessImage = async () => {
//     if (!file) {
//       toast.error('Please upload an image first');
//       return;
//     }

//     setLoading(true);
//     setApiError(null);

//     try {
//       const data = await uploadImage(file);
//       setResults(data);

//       if (data.image_url) {
//         if (imageUrl) URL.revokeObjectURL(imageUrl);
//         setImageUrl(data.image_url);
//       }

//       toast.success('Image processed successfully');
//     } catch (error) {
//       console.error('Error processing image:', error);
//       setApiError(error.message || 'An error occurred while processing the image');
//       toast.error('Failed to process image');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGeneratePdf = async () => {
//     if (!results) {
//       toast.error('No results to generate PDF from');
//       return;
//     }

//     setLoading(true);

//     try {
//       await generatePdfReport({
//         filename: results.filename,
//         caption: results.caption,
//         report: results.report,
//         interpretations: results.interpretations,
//       });

//       toast.success('PDF report generated');
//     } catch (error) {
//       console.error('Error generating PDF:', error);
//       toast.error('Failed to generate PDF report');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearResults = () => {
//     if (window.confirm('Are you sure you want to clear all results?')) {
//       if (imageUrl) URL.revokeObjectURL(imageUrl);

//       setFile(null);
//       setImageUrl(null);
//       setResults(null);
//       setApiError(null);

//       toast.info('Results cleared');
//     }
//   };

//   return (
//     <div className="dashboard-page">
//       {loading && <Loading />}

//       <header className="dashboard-header">
//         <div className="container">
//           <h1>
//             <FaMedkit className="header-icon" />
//             AI-Powered Chest X-ray Analysis
//           </h1>
//           <p>Upload your chest X-ray and let AI generate a detailed radiology report.</p>
//         </div>
//       </header>

//       <main className="dashboard-content">
//         <div className="container">
//           <div className="dashboard-grid">
//             <section className="upload-section">
//               <div className="card animated">
//                 <div className="card-header">
//                   <h2>Upload Image</h2>
//                 </div>
//                 <div className="card-body">
//                   <Dropzone onFileDrop={handleFileDrop} />
//                   {file && !results && (
//                     <button className="btn btn-primary btn-process" onClick={handleProcessImage}>
//                       Analyze X-ray
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="card mt-4 animated">
//                 <div className="card-header">
//                   <h2>Preview</h2>
//                 </div>
//                 <div className="card-body">
//                   <ImagePreview imageUrl={imageUrl} imageName={file ? file.name : null} />
//                 </div>
//               </div>
//             </section>

//             <section className="results-section">
//               {apiError ? (
//                 <div className="api-error animated">
//                   <h2>Oops! Something went wrong.</h2>
//                   <p>{apiError}</p>
//                   <button className="btn btn-primary mt-4" onClick={() => setApiError(null)}>
//                     Try Again
//                   </button>
//                 </div>
//               ) : results ? (
//                 <ResultsContainer
//                   results={results}
//                   onGeneratePdf={handleGeneratePdf}
//                   onClear={handleClearResults}
//                 />
//               ) : (
//                 <div className="no-results animated">
//                   <h2>Awaiting Upload</h2>
//                   <p>Upload and analyze a chest X-ray image to get started.</p>
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>
//       </main>

//       <footer className="dashboard-disclaimer">
//         <div className="container">
//           <div className="disclaimer-content">
//             <div className="disclaimer-icon">
//               <FaInfoCircle />
//             </div>
//             <div className="disclaimer-text">
//               <h3>Disclaimer</h3>
//               <p>
//                 This tool is for <strong>educational and research use only</strong>. It is not approved for
//                 clinical diagnosis. Please consult medical professionals for actual evaluation.
//               </p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default DashboardPage;
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaMedkit, FaInfoCircle } from 'react-icons/fa';
import Dropzone from '../components/Dropzone';
import ImagePreview from '../components/ImagePreview';
import Loading from '../components/Loading';
import { uploadImage, generatePdfReport } from '../services/apiService';
import '../styles/DashboardPage.css';

// Custom ResultsContainer component to replace the imported one that has tab issues
const ResultsContainer = ({ results, onGeneratePdf, onClear }) => {
  const [activeTab, setActiveTab] = useState('report');

  // Function to get class names with active state
  const getTabClass = (tabName) => {
    return `results-tab ${activeTab === tabName ? 'active' : ''}`;
  };

  // Function to ensure proper content display
  const renderTabContent = () => {
    switch (activeTab) {
      case 'report':
        return (
          <div className="tab-content" style={{ display: 'block' }}>
            <h3>Medical Report</h3>
            <div className="content-box">
              {results.report || 'No report available'}
            </div>
          </div>
        );
      case 'caption':
        return (
          <div className="tab-content" style={{ display: 'block' }}>
            <h3>Generated Caption</h3>
            <div className="content-box">
              {results.caption || 'No caption available'}
            </div>
          </div>
        );
      case 'findings':
        return (
          <div className="tab-content" style={{ display: 'block' }}>
            <h3>Key Findings</h3>
            <div className="content-box">
              {results.findings && Array.isArray(results.findings) ? (
                <ul className="findings-list">
                  {results.findings.map((finding, index) => (
                    <li key={index}>{finding}</li>
                  ))}
                </ul>
              ) : (
                <p>{typeof results.findings === 'string' ? results.findings : 'No findings available'}</p>
              )}
            </div>
          </div>
        );
      case 'interpretations':
        return (
          <div className="tab-content" style={{ display: 'block' }}>
            <h3>Interpretations</h3>
            <div className="content-box">
              {results.interpretations && Array.isArray(results.interpretations) ? (
                <div className="interpretations-list">
                  {results.interpretations.map((interpretation, index) => (
                    <div key={index} className="interpretation-item">
                      <h4>{interpretation.title || 'Finding'}</h4>
                      <p>{interpretation.description || interpretation}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>{typeof results.interpretations === 'string' ? results.interpretations : 'No interpretations available'}</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="results-container animated">
      <div className="card">
        <div className="card-header">
          <h2>Analysis Results</h2>
        </div>
        <div className="card-body">
          <div className="results-tabs">
            <button 
              className={getTabClass('report')} 
              onClick={() => setActiveTab('report')}
            >
              Report
            </button>
            <button 
              className={getTabClass('caption')} 
              onClick={() => setActiveTab('caption')}
            >
              Caption
            </button>
            <button 
              className={getTabClass('findings')} 
              onClick={() => setActiveTab('findings')}
            >
              Findings
            </button>
            <button 
              className={getTabClass('interpretations')} 
              onClick={() => setActiveTab('interpretations')}
            >
              Interpretations
            </button>
          </div>
          
          <div className="results-content">
            {renderTabContent()}
          </div>
          
          <div className="results-actions">
            <button className="btn btn-primary" onClick={onGeneratePdf}>
              Export PDF
            </button>
            <button className="btn btn-secondary" onClick={onClear}>
              Clear Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  const handleFileDrop = (file) => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);

    setFile(file);
    setImageUrl(URL.createObjectURL(file));
    setResults(null);
    setApiError(null);
  };

  const handleProcessImage = async () => {
    if (!file) {
      toast.error('Please upload an image first');
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      const data = await uploadImage(file);
      setResults(data);

      if (data.image_url) {
        if (imageUrl) URL.revokeObjectURL(imageUrl);
        setImageUrl(data.image_url);
      }

      toast.success('Image processed successfully');
    } catch (error) {
      console.error('Error processing image:', error);
      setApiError(error.message || 'An error occurred while processing the image');
      toast.error('Failed to process image');
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (!results) {
      toast.error('No results to generate PDF from');
      return;
    }

    setLoading(true);

    try {
      await generatePdfReport({
        filename: results.filename,
        caption: results.caption,
        report: results.report,
        interpretations: results.interpretations,
      });

      toast.success('PDF report generated');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF report');
    } finally {
      setLoading(false);
    }
  };

  const handleClearResults = () => {
    if (window.confirm('Are you sure you want to clear all results?')) {
      if (imageUrl) URL.revokeObjectURL(imageUrl);

      setFile(null);
      setImageUrl(null);
      setResults(null);
      setApiError(null);

      toast.info('Results cleared');
    }
  };

  return (
    <div className="dashboard-page">
      {loading && <Loading />}

      <header className="dashboard-header">
        <div className="container">
          <h1>
            <FaMedkit className="header-icon" />
            AI-Powered Chest X-ray Analysis
          </h1>
          <p>Upload your chest X-ray and let AI generate a detailed radiology report.</p>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="container">
          <div className="dashboard-grid">
            <section className="upload-section">
              <div className="card animated">
                <div className="card-header">
                  <h2>Upload Image</h2>
                </div>
                <div className="card-body">
                  <Dropzone onFileDrop={handleFileDrop} />
                  {file && !results && (
                    <button className="btn btn-primary btn-process" onClick={handleProcessImage}>
                      Analyze X-ray
                    </button>
                  )}
                </div>
              </div>

              <div className="card mt-4 animated">
                <div className="card-header">
                  <h2>Preview</h2>
                </div>
                <div className="card-body">
                  <ImagePreview imageUrl={imageUrl} imageName={file ? file.name : null} />
                </div>
              </div>
            </section>

            <section className="results-section">
              {apiError ? (
                <div className="api-error animated">
                  <h2>Oops! Something went wrong.</h2>
                  <p>{apiError}</p>
                  <button className="btn btn-primary mt-4" onClick={() => setApiError(null)}>
                    Try Again
                  </button>
                </div>
              ) : results ? (
                <ResultsContainer
                  results={results}
                  onGeneratePdf={handleGeneratePdf}
                  onClear={handleClearResults}
                />
              ) : (
                <div className="no-results animated">
                  <h2>Awaiting Upload</h2>
                  <p>Upload and analyze a chest X-ray image to get started.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="dashboard-disclaimer">
        <div className="container">
          <div className="disclaimer-content">
            <div className="disclaimer-icon">
              <FaInfoCircle />
            </div>
            <div className="disclaimer-text">
              <h3>Disclaimer</h3>
              <p>
                This tool is for <strong>educational and research use only</strong>. It is not approved for
                clinical diagnosis. Please consult medical professionals for actual evaluation.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;