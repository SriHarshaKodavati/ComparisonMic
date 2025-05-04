import React from 'react';

const TrainingProcessFlowchart = () => {
  return (
    <div className="training-process-flowchart">
      <div className="image-container">
        <svg viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          {/* Define arrowhead marker */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
            </marker>
          </defs>
          
          {/* Data Pipeline Section */}
          <rect x="10" y="10" width="880" height="130" rx="5" ry="5" fill="#f0f4f8" stroke="#336699" strokeWidth="2"/>
          <text x="450" y="35" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold">Data Pipeline</text>
          
          {/* Data loading */}
          <rect x="30" y="50" width="120" height="70" rx="5" ry="5" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text x="90" y="85" textAnchor="middle" fontFamily="Arial" fontSize="12">JSONL Metadata</text>
          <text x="90" y="100" textAnchor="middle" fontFamily="Arial" fontSize="12">Image Files</text>
          
          {/* Preprocessing */}
          <rect x="190" y="50" width="120" height="70" rx="5" ry="5" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text x="250" y="85" textAnchor="middle" fontFamily="Arial" fontSize="12">Caption Cleaning</text>
          <text x="250" y="100" textAnchor="middle" fontFamily="Arial" fontSize="12">Image Normalization</text>
          
          {/* Dataset creation */}
          <rect x="350" y="50" width="120" height="70" rx="5" ry="5" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text x="410" y="85" textAnchor="middle" fontFamily="Arial" fontSize="12">Tokenization</text>
          <text x="410" y="100" textAnchor="middle" fontFamily="Arial" fontSize="12">Dataset Creation</text>
          
          {/* Data splitting */}
          <rect x="510" y="50" width="120" height="70" rx="5" ry="5" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text x="570" y="70" textAnchor="middle" fontFamily="Arial" fontSize="12">Train/Val Split</text>
          <text x="570" y="85" textAnchor="middle" fontFamily="Arial" fontSize="12">Batch Processing</text>
          <text x="570" y="100" textAnchor="middle" fontFamily="Arial" fontSize="12">Data Augmentation</text>
          
          {/* Tokenizer */}
          <rect x="670" y="50" width="120" height="70" rx="5" ry="5" fill="#fff" stroke="#333" strokeWidth="1"/>
          <text x="730" y="85" textAnchor="middle" fontFamily="Arial" fontSize="12">Vocabulary Creation</text>
          <text x="730" y="100" textAnchor="middle" fontFamily="Arial" fontSize="12">Embedding Preparation</text>
          
          {/* Arrows */}
          <line x1="150" y1="85" x2="190" y2="85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="310" y1="85" x2="350" y2="85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="470" y1="85" x2="510" y2="85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="630" y1="85" x2="670" y2="85" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          
          {/* Model Architecture Section */}
          <rect x="10" y="150" width="880" height="300" rx="5" ry="5" fill="#f0f8f0" stroke="#339966" strokeWidth="2"/>
          <text x="450" y="175" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold">Model Architectures</text>
          
          {/* Method 1 (ChexNet) */}
          <rect x="30" y="190" width="240" height="240" rx="5" ry="5" fill="#e6f2ff" stroke="#0066cc" strokeWidth="1.5"/>
          <text x="150" y="215" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold">Method 1: ChexNet</text>
          
          <rect x="50" y="230" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#0066cc" strokeWidth="1"/>
          <text x="150" y="255" textAnchor="middle" fontFamily="Arial" fontSize="12">DenseNet121 Encoder (Pretrained)</text>
          
          <rect x="50" y="290" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#0066cc" strokeWidth="1"/>
          <text x="150" y="315" textAnchor="middle" fontFamily="Arial" fontSize="12">Attention Mechanism</text>
          
          <rect x="50" y="350" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#0066cc" strokeWidth="1"/>
          <text x="150" y="375" textAnchor="middle" fontFamily="Arial" fontSize="12">LSTM Decoder + Diverse Beam Search</text>
          
          <line x1="150" y1="270" x2="150" y2="290" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="150" y1="330" x2="150" y2="350" stroke="#0066cc" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          
          {/* Method 2 (Inception ResNet) */}
          <rect x="320" y="190" width="240" height="240" rx="5" ry="5" fill="#fff2e6" stroke="#cc6600" strokeWidth="1.5"/>
          <text x="440" y="215" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold">Method 2: Inception ResNet</text>
          
          <rect x="340" y="230" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#cc6600" strokeWidth="1"/>
          <text x="440" y="255" textAnchor="middle" fontFamily="Arial" fontSize="12">Inception ResNet V2 Encoder</text>
          
          <rect x="340" y="290" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#cc6600" strokeWidth="1"/>
          <text x="440" y="315" textAnchor="middle" fontFamily="Arial" fontSize="12">Bahdanau Attention + GloVe</text>
          
          <rect x="340" y="350" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#cc6600" strokeWidth="1"/>
          <text x="440" y="375" textAnchor="middle" fontFamily="Arial" fontSize="12">Multi-layer LSTM + Beam Search</text>
          
          <line x1="440" y1="270" x2="440" y2="290" stroke="#cc6600" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="440" y1="330" x2="440" y2="350" stroke="#cc6600" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          
          {/* Method 3 (ResNet18) */}
          <rect x="610" y="190" width="240" height="240" rx="5" ry="5" fill="#f2e6ff" stroke="#6600cc" strokeWidth="1.5"/>
          <text x="730" y="215" textAnchor="middle" fontFamily="Arial" fontSize="14" fontWeight="bold">Method 3: ResNet18</text>
          
          <rect x="630" y="230" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#6600cc" strokeWidth="1"/>
          <text x="730" y="255" textAnchor="middle" fontFamily="Arial" fontSize="12">ResNet18 Encoder (Progressive Unfreeze)</text>
          
          <rect x="630" y="290" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#6600cc" strokeWidth="1"/>
          <text x="730" y="315" textAnchor="middle" fontFamily="Arial" fontSize="12">Enhanced Caption Processing</text>
          
          <rect x="630" y="350" width="200" height="40" rx="5" ry="5" fill="#fff" stroke="#6600cc" strokeWidth="1"/>
          <text x="730" y="375" textAnchor="middle" fontFamily="Arial" fontSize="12">Simple LSTM Decoder + Beam Search</text>
          
          <line x1="730" y1="270" x2="730" y2="290" stroke="#6600cc" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          <line x1="730" y1="330" x2="730" y2="350" stroke="#6600cc" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
          
          {/* Training Process Section */}
          <rect x="10" y="460" width="880" height="170" rx="5" ry="5" fill="#f8f0f0" stroke="#993366" strokeWidth="2"/>
          <text x="450" y="485" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold">Training Process</text>
          
          {/* Method 1 Training */}
          <rect x="30" y="500" width="240" height="110" rx="5" ry="5" fill="#e6f2ff" stroke="#0066cc" strokeWidth="1.5"/>
          <text x="150" y="520" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Method 1 Training</text>
          <text x="150" y="540" textAnchor="middle" fontFamily="Arial" fontSize="11">• Frozen encoder, trainable decoder</text>
          <text x="150" y="560" textAnchor="middle" fontFamily="Arial" fontSize="11">• Label smoothing loss</text>
          <text x="150" y="580" textAnchor="middle" fontFamily="Arial" fontSize="11">• Gradient accumulation (2 steps)</text>
          <text x="150" y="600" textAnchor="middle" fontFamily="Arial" fontSize="11">• OneCycleLR scheduler</text>
          
          {/* Method 2 Training */}
          <rect x="320" y="500" width="240" height="110" rx="5" ry="5" fill="#fff2e6" stroke="#cc6600" strokeWidth="1.5"/>
          <text x="440" y="520" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Method 2 Training</text>
          <text x="440" y="540" textAnchor="middle" fontFamily="Arial" fontSize="11">• Teacher forcing with causal mask</text>
          <text x="440" y="560" textAnchor="middle" fontFamily="Arial" fontSize="11">• Standard cross-entropy loss</text>
          <text x="440" y="580" textAnchor="middle" fontFamily="Arial" fontSize="11">• ReduceLROnPlateau scheduler</text>
          <text x="440" y="600" textAnchor="middle" fontFamily="Arial" fontSize="11">• Early stopping after 10 epochs</text>
          
          {/* Method 3 Training */}
          <rect x="610" y="500" width="240" height="110" rx="5" ry="5" fill="#f2e6ff" stroke="#6600cc" strokeWidth="1.5"/>
          <text x="730" y="520" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Method 3 Training</text>
          <text x="730" y="540" textAnchor="middle" fontFamily="Arial" fontSize="11">• Progressive unfreezing (epoch 5)</text>
          <text x="730" y="560" textAnchor="middle" fontFamily="Arial" fontSize="11">• Learning rate reduction after unfreeze</text>
          <text x="730" y="580" textAnchor="middle" fontFamily="Arial" fontSize="11">• Medical vocabulary enhancement</text>
          <text x="730" y="600" textAnchor="middle" fontFamily="Arial" fontSize="11">• BLEU score checkpoint selection</text>
          
          {/* Evaluation and Results Section */}
          <rect x="10" y="640" width="880" height="150" rx="5" ry="5" fill="#f0f0f8" stroke="#663399" strokeWidth="2"/>
          <text x="450" y="665" textAnchor="middle" fontFamily="Arial" fontSize="18" fontWeight="bold">Evaluation and Results</text>
          
          {/* Performance Metrics */}
          <rect x="30" y="680" width="280" height="90" rx="5" ry="5" fill="#fff" stroke="#663399" strokeWidth="1.5"/>
          <text x="170" y="700" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Performance Metrics (BLEU-1)</text>
          <text x="60" y="725" textAnchor="start" fontFamily="Arial" fontSize="11">• Method 1: ChexNet (0.3102)</text>
          <text x="60" y="745" textAnchor="start" fontFamily="Arial" fontSize="11">• Method 2: Inception ResNet (0.2163)</text>
          <text x="60" y="765" textAnchor="start" fontFamily="Arial" fontSize="11">• Method 3: ResNet18 (0.2104)</text>
          
          {/* Error Analysis */}
          <rect x="330" y="680" width="280" height="90" rx="5" ry="5" fill="#fff" stroke="#663399" strokeWidth="1.5"/>
          <text x="470" y="700" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Error Analysis</text>
          <text x="360" y="725" textAnchor="start" fontFamily="Arial" fontSize="11">• ChexNet: Some hallucination, occasional repetition</text>
          <text x="360" y="745" textAnchor="start" fontFamily="Arial" fontSize="11">• Inception: Limited vocabulary, generic captions</text>
          <text x="360" y="765" textAnchor="start" fontFamily="Arial" fontSize="11">• ResNet18: Mode collapse, limited diversity</text>
          
          {/* Future Work */}
          <rect x="630" y="680" width="240" height="90" rx="5" ry="5" fill="#fff" stroke="#663399" strokeWidth="1.5"/>
          <text x="750" y="700" textAnchor="middle" fontFamily="Arial" fontSize="12" fontWeight="bold">Future Recommendations</text>
          <text x="650" y="725" textAnchor="start" fontFamily="Arial" fontSize="11">• Domain-specific pretraining</text>
          <text x="650" y="745" textAnchor="start" fontFamily="Arial" fontSize="11">• Enhanced attention mechanisms</text>
          <text x="650" y="765" textAnchor="start" fontFamily="Arial" fontSize="11">• Diversity promotion in generation</text>
        </svg>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Comprehensive diagram of the entire training process workflow, from data preparation to evaluation.
      </p>
    </div>
  );
};

export default TrainingProcessFlowchart;