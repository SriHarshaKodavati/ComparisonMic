import React from 'react';

const DataProcessingFlowDiagram = () => {
  return (
    <div className="data-processing-flow-diagram">
      <div className="mermaid">
        {`
        graph TD
            subgraph "Method 1: ChexNet-based Data Flow"
            A1[JSONL Metadata] --> B1[Create Train/Val Split]
            C1[Image Files] --> B1
            B1 --> D1[Custom Dataset\\nwith Label Smoothing]
            D1 --> E1[Data Augmentation\\nResizing, Flips, Rotations]
            E1 --> F1[Normalized Tensor\\n224x224x3]
            F1 --> G1[DenseNet121 Feature Extraction]
            G1 --> H1[LSTM Training with\\nTeacher Forcing]
            H1 --> I1[Model Checkpoint\\nSelection by BLEU]
            I1 --> J1[Diverse Beam Search\\nCaption Generation]
            end

            subgraph "Method 2: Inception ResNet V2 Data Flow"
            A2[JSONL Metadata] --> B2[DataFrame Creation]
            C2[Image Files] --> B2
            B2 --> D2[Caption Preprocessing\\nTokenization]
            D2 --> E2[GloVe Embedding]
            F2[TensorFlow Dataset Creation] --> G2[Image Augmentation\\nand Loading]
            D2 --> F2
            G2 --> H2[Inception ResNet Feature\\nExtraction]
            H2 --> I2[Transformer-inspired\\nDecoder Training]
            I2 --> J2[Beam Search Caption\\nGeneration]
            end

            subgraph "Method 3: ResNet18 Data Flow"
            A3[JSONL Metadata] --> B3[Enhanced Caption\\nPreprocessing]
            C3[Image Files] --> D3[Medical Dictionary\\nStandardization]
            B3 --> D3
            D3 --> E3[Dataset Creation\\nand Tokenization]
            E3 --> F3[Train/Val Split]
            F3 --> G3[Image Transformation\\nand Normalization]
            G3 --> H3[ResNet18 Feature\\nExtraction]
            H3 --> I3[Progressive Unfreezing\\nTraining]
            I3 --> J3[Simple Beam Search\\nCaption Generation]
            end
        `}
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Data processing workflows for each model architecture, showing the complete pipeline from raw data to caption generation.
      </p>
    </div>
  );
};

export default DataProcessingFlowDiagram;