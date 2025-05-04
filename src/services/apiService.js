import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

// Create an axios instance
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Upload image for analysis
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await API.post('/api/upload', formData, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to upload image' };
  }
};

// Generate PDF report
export const generatePdfReport = async (data) => {
  try {
    const response = await API.post('/api/generate_pdf', data, {
      responseType: 'blob',
    });
    
    // Create a blob URL for the PDF
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    
    // Create a link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `medical_report_${Date.now()}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to generate PDF' };
  }
};

// Check API health
export const checkApiHealth = async () => {
  try {
    const response = await API.get('/api/health');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'API health check failed' };
  }
};

export default {
  uploadImage,
  generatePdfReport,
  checkApiHealth,
};