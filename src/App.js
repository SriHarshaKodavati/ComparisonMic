import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ChexnetInfoPage from './pages/ChexnetInfoPage';
import PipelineExplorerPage from './pages/PipelineExplorerPage';
import ModelComparisonPage from './pages/ModelComparisonPage';
// import ModelComparison from './pages/ModelComparisonPage';
import NotFoundPage from './pages/NotFoundPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import styles
import './styles/App.css';
import './styles/ModelComparisonPage.css';
import SimpleTabs from './pages/SimpleTabs';
import ModelComparison from './pages/ModelComparison';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chexnet-info" element={<ChexnetInfoPage />} />
          <Route path="/pipeline-explorer" element={<PipelineExplorerPage />} />
          <Route path="/model-comparison" element={<ModelComparisonPage />} />
          <Route path="/simple" element={<SimpleTabs />} />
          <Route path="/model" element={<ModelComparison />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
}

export default App;