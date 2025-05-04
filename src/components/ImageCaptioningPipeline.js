import React from 'react';

const ImageCaptioningPipeline = () => {
  return (
    <div className="image-captioning-pipeline">
      <div className="image-container">
        <svg viewBox="0 0 900 540" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Define gradients and markers */}
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#d4f1f9", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#a8e1f5", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#d8f3ce", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#b8e8a8", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#ffeed6", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#ffd6a8", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#e6d6ff", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#d3b8ff", stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#555"/>
            </marker>
          </defs>
          
          {/* Title and Background */}
          <rect x="0" y="0" width="900" height="540" fill="#fcfcfc" />
          <text x="450" y="30" fontFamily="Arial" fontSize="20" fontWeight="bold" textAnchor="middle">ChexNet to BioGPT Medical Report Generation Pipeline</text>
          
          {/* Main Pipeline Sections Background */}
          <rect x="45" y="60" width="810" height="180" rx="10" ry="10" fill="#f0f7ff" stroke="#99ccff" strokeWidth="2" />
          <rect x="45" y="260" width="810" height="180" rx="10" ry="10" fill="#fff7f0" stroke="#ffcc99" strokeWidth="2" />
          
          {/* Section Headers */}
          <text x="100" y="85" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#0066cc">CheXNet Image Processing Pipeline</text>
          <text x="100" y="285" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#cc6600">BioGPT Report Generation Pipeline</text>
          
          {/* CheXNet Pipeline Boxes */}
          {/* Box 1: Input Image */}
          <rect x="70" y="100" width="140" height="100" rx="10" ry="10" fill="url(#blueGrad)" stroke="#0066cc" strokeWidth="2"/>
          <text x="140" y="130" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Input Chest X-ray</text>
          <text x="140" y="155" fontFamily="Arial" fontSize="12" textAnchor="middle">DICOM/JPEG/PNG</text>
          <text x="140" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#555">Medical X-ray image</text>
          
          {/* Box 2: Preprocessing */}
          <rect x="260" y="100" width="140" height="100" rx="10" ry="10" fill="#f5f5f5" stroke="#666" strokeWidth="2"/>
          <text x="330" y="130" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Preprocessing</text>
          <text x="330" y="155" fontFamily="Arial" fontSize="12" textAnchor="middle">Resize to 224×224</text>
          <text x="330" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle">Normalize RGB channels</text>
          
          {/* Box 3: Feature Extraction */}
          <rect x="450" y="100" width="140" height="100" rx="10" ry="10" fill="#f5f5f5" stroke="#666" strokeWidth="2"/>
          <text x="520" y="130" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Feature Extraction</text>
          <text x="520" y="155" fontFamily="Arial" fontSize="12" textAnchor="middle">DenseNet121 (ChexNet)</text>
          <text x="520" y="175" fontFamily="Arial" fontSize="12" textAnchor="middle">1024-dim feature vector</text>
          
          {/* Box 4: Finding Analysis */}
          <rect x="640" y="100" width="140" height="100" rx="10" ry="10" fill="url(#greenGrad)" stroke="#339966" strokeWidth="2"/>
          <text x="710" y="125" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Medical Finding</text>
          <text x="710" y="145" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Analysis</text>
          <text x="710" y="170" fontFamily="Arial" fontSize="12" textAnchor="middle">Detect abnormalities</text>
          <text x="710" y="190" fontFamily="Arial" fontSize="11" textAnchor="middle">opacity, effusion, nodules, etc.</text>
          
          {/* CheXNet Pipeline Flow Arrows */}
          <line x1="210" y1="150" x2="255" y2="150" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="400" y1="150" x2="445" y2="150" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="590" y1="150" x2="635" y2="150" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          
          {/* Connection Between Pipelines */}
          <line x1="710" y1="200" x2="710" y2="255" stroke="#555" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)"/>
          <text x="720" y="230" fontFamily="Arial" fontSize="12" fill="#555">Feature-based findings</text>
          
          {/* BioGPT Pipeline Boxes */}
          {/* Box 5: Caption Generation */}
          <rect x="70" y="300" width="140" height="100" rx="10" ry="10" fill="#f5f5f5" stroke="#666" strokeWidth="2"/>
          <text x="140" y="330" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Caption Generation</text>
          <text x="140" y="350" fontFamily="Arial" fontSize="12" textAnchor="middle">Structured text description</text>
          <text x="140" y="370" fontFamily="Arial" fontSize="12" textAnchor="middle">of X-ray findings</text>
          
          {/* Box 6: Prompt Engineering */}
          <rect x="260" y="300" width="140" height="100" rx="10" ry="10" fill="#f5f5f5" stroke="#666" strokeWidth="2"/>
          <text x="330" y="330" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Prompt Engineering</text>
          <text x="330" y="350" fontFamily="Arial" fontSize="12" textAnchor="middle">Format caption for BioGPT</text>
          <text x="330" y="370" fontFamily="Arial" fontSize="12" textAnchor="middle">"Chest X-ray Findings: ..."</text>
          
          {/* Box 7: BioGPT Generation */}
          <rect x="450" y="300" width="140" height="100" rx="10" ry="10" fill="url(#orangeGrad)" stroke="#cc6600" strokeWidth="2"/>
          <text x="520" y="330" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">BioGPT Text</text>
          <text x="520" y="350" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Generation</text>
          <text x="520" y="370" fontFamily="Arial" fontSize="12" textAnchor="middle">Large language model</text>
          <text x="520" y="390" fontFamily="Arial" fontSize="12" textAnchor="middle">specialized for biomedical text</text>
          
          {/* Box 8: Report Formatting */}
          <rect x="640" y="300" width="140" height="100" rx="10" ry="10" fill="url(#purpleGrad)" stroke="#663399" strokeWidth="2"/>
          <text x="710" y="330" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Radiology Report</text>
          <text x="710" y="350" fontFamily="Arial" fontSize="14" fontWeight="bold" textAnchor="middle">Structuring</text>
          <text x="710" y="370" fontFamily="Arial" fontSize="12" textAnchor="middle">Sections: Findings,</text>
          <text x="710" y="390" fontFamily="Arial" fontSize="12" textAnchor="middle">Impression, Recommendations</text>
          
          {/* BioGPT Pipeline Flow Arrows */}
          <line x1="210" y1="350" x2="255" y2="350" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="400" y1="350" x2="445" y2="350" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="590" y1="350" x2="635" y2="350" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          
          {/* Vertical connection from findings to caption */}
          <line x1="710" y1="260" x2="140" y2="260" stroke="#555" strokeWidth="2" strokeDasharray="5,5"/>
          <line x1="140" y1="260" x2="140" y2="295" stroke="#555" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)"/>
          
          {/* Final Output Box */}
          <rect x="350" y="440" width="200" height="80" rx="10" ry="10" fill="#e6e6ff" stroke="#3333cc" strokeWidth="2"/>
          <text x="450" y="470" fontFamily="Arial" fontSize="16" fontWeight="bold" textAnchor="middle">Final Medical Report</text>
          <text x="450" y="495" fontFamily="Arial" fontSize="12" textAnchor="middle">Complete, structured radiology report</text>
          
          {/* Connection to Final Output */}
          <line x1="710" y1="400" x2="710" y2="420" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          <line x1="710" y1="420" x2="450" y2="420" stroke="#555" strokeWidth="2"/>
          <line x1="450" y1="420" x2="450" y2="435" stroke="#555" strokeWidth="2" markerEnd="url(#arrow)"/>
          
          {/* Detailed Process Labels */}
          {/* CheXNet Details */}
          <rect x="45" y="210" width="810" height="40" rx="5" ry="5" fill="#f0f7ff" stroke="#99ccff" strokeWidth="1"/>
          <text x="145" y="235" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#0066cc">X-ray Image Input</text>
          <text x="335" y="235" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#0066cc">Tensor [3,224,224]</text>
          <text x="525" y="235" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#0066cc">Feature Vector (1024-dim)</text>
          <text x="715" y="235" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#0066cc">Structured Findings Output</text>
          
          {/* BioGPT Details */}
          <rect x="45" y="410" width="810" height="40" rx="5" ry="5" fill="#fff7f0" stroke="#ffcc99" strokeWidth="1"/>
          <text x="145" y="435" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#cc6600">Findings Summary</text>
          <text x="335" y="435" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#cc6600">Formatted LLM Prompt</text>
          <text x="525" y="435" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#cc6600">Generated Medical Text</text>
          <text x="715" y="435" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#cc6600">Formatted Clinical Report</text>
        </svg>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        End-to-end pipeline from medical X-ray image input to generation of comprehensive radiology reports.
      </p>
    </div>
  );
};

export default ImageCaptioningPipeline;