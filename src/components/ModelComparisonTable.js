import React, { useState } from 'react';

const ModelComparisonTable = () => {
  const [activeTab, setActiveTab] = useState('encoder');
  
  const tabs = [
    { id: 'encoder', label: 'Encoder Architectures' },
    { id: 'decoder', label: 'Decoder Architectures' },
    { id: 'training', label: 'Training Methodologies' },
    { id: 'caption', label: 'Caption Generation' }
  ];
  
  return (
    <div className="model-comparison-table bg-white rounded-lg shadow-md p-4 my-4">
      <div className="tabs flex border-b border-gray-200 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium ${
              activeTab === tab.id 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-blue-500'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content overflow-x-auto">
        {activeTab === 'encoder' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Feature</th>
                <th className="border p-2 text-left">Method 1 (ChexNet)</th>
                <th className="border p-2 text-left">Method 2 (Inception ResNet)</th>
                <th className="border p-2 text-left">Method 3 (ResNet18)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Base CNN</td>
                <td className="border p-2">DenseNet121</td>
                <td className="border p-2">Inception ResNet V2</td>
                <td className="border p-2">ResNet18</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Pretrained On</td>
                <td className="border p-2">Medical X-rays</td>
                <td className="border p-2">ImageNet</td>
                <td className="border p-2">ImageNet</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Feature Size</td>
                <td className="border p-2">1024</td>
                <td className="border p-2">Varies (Embedding size: 300)</td>
                <td className="border p-2">512</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Domain Specificity</td>
                <td className="border p-2">High (medical)</td>
                <td className="border p-2">Low (general)</td>
                <td className="border p-2">Low (general)</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Parameter Count</td>
                <td className="border p-2">~7M</td>
                <td className="border p-2">~55M</td>
                <td className="border p-2">~11M</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Fine-tuning</td>
                <td className="border p-2">Partial</td>
                <td className="border p-2">Full</td>
                <td className="border p-2">Progressive</td>
              </tr>
            </tbody>
          </table>
        )}
        
        {activeTab === 'decoder' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Feature</th>
                <th className="border p-2 text-left">Method 1 (ChexNet)</th>
                <th className="border p-2 text-left">Method 2 (Inception ResNet)</th>
                <th className="border p-2 text-left">Method 3 (ResNet18)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Type</td>
                <td className="border p-2">LSTM with Attention</td>
                <td className="border p-2">Transformer-inspired with Bahdanau Attention</td>
                <td className="border p-2">Simple LSTM</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Hidden Size</td>
                <td className="border p-2">512</td>
                <td className="border p-2">512</td>
                <td className="border p-2">512</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Embedding Size</td>
                <td className="border p-2">300</td>
                <td className="border p-2">300</td>
                <td className="border p-2">256</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Word Embeddings</td>
                <td className="border p-2">Learned</td>
                <td className="border p-2">GloVe</td>
                <td className="border p-2">Learned</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Attention</td>
                <td className="border p-2">Content-based</td>
                <td className="border p-2">Bahdanau</td>
                <td className="border p-2">None</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Layers</td>
                <td className="border p-2">1</td>
                <td className="border p-2">2 (LSTM)</td>
                <td className="border p-2">1</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Regularization</td>
                <td className="border p-2">Dropout (0.5)</td>
                <td className="border p-2">Dropout (0.3), LayerNorm</td>
                <td className="border p-2">Dropout (0.3)</td>
              </tr>
            </tbody>
          </table>
        )}
        
        {activeTab === 'training' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Feature</th>
                <th className="border p-2 text-left">Method 1 (ChexNet)</th>
                <th className="border p-2 text-left">Method 2 (Inception ResNet)</th>
                <th className="border p-2 text-left">Method 3 (ResNet18)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Batch Size</td>
                <td className="border p-2">32</td>
                <td className="border p-2">32</td>
                <td className="border p-2">16</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Learning Rate</td>
                <td className="border p-2">1e-4</td>
                <td className="border p-2">1e-3</td>
                <td className="border p-2">1e-3, then 1e-4</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Optimizer</td>
                <td className="border p-2">AdamW</td>
                <td className="border p-2">Adam</td>
                <td className="border p-2">Adam</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Loss Function</td>
                <td className="border p-2">Label Smoothing</td>
                <td className="border p-2">Cross-entropy</td>
                <td className="border p-2">Cross-entropy</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">LR Schedule</td>
                <td className="border p-2">OneCycleLR</td>
                <td className="border p-2">ReduceLROnPlateau</td>
                <td className="border p-2">ReduceLROnPlateau</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Gradient Accumulation</td>
                <td className="border p-2">Yes (2 steps)</td>
                <td className="border p-2">No</td>
                <td className="border p-2">No</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Early Stopping</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Epochs</td>
                <td className="border p-2">30</td>
                <td className="border p-2">50</td>
                <td className="border p-2">15</td>
              </tr>
            </tbody>
          </table>
        )}
        
        {activeTab === 'caption' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Feature</th>
                <th className="border p-2 text-left">Method 1 (ChexNet)</th>
                <th className="border p-2 text-left">Method 2 (Inception ResNet)</th>
                <th className="border p-2 text-left">Method 3 (ResNet18)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Primary Method</td>
                <td className="border p-2">Diverse Beam Search</td>
                <td className="border p-2">Beam Search</td>
                <td className="border p-2">Greedy and Beam Search</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Beam Width</td>
                <td className="border p-2">5</td>
                <td className="border p-2">5</td>
                <td className="border p-2">5</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Diversity Penalty</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">No</td>
                <td className="border p-2">No</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border p-2 font-medium">Temperature Sampling</td>
                <td className="border p-2">Yes (0.8)</td>
                <td className="border p-2">No</td>
                <td className="border p-2">No</td>
              </tr>
              <tr>
                <td className="border p-2 font-medium">Multiple Captions</td>
                <td className="border p-2">Yes</td>
                <td className="border p-2">No</td>
                <td className="border p-2">No</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ModelComparisonTable;