import React from 'react';

const ModelArchitectureFlowcharts = () => {
  return (
    <div className="model-architecture-flowcharts">
      <div className="mermaid">
        {`
        graph TD
            subgraph "Method 1: ChexNet-based Model"
            A1[Input Image] --> B1[DenseNet121 Encoder]
            B1 --> C1[Feature Projection\\n1024 → 512]
            C1 --> D1[Feature Embedding]
            E1[Caption Tokens] --> F1[Word Embedding]
            F1 --> G1[LSTM with Attention]
            D1 --> G1
            G1 --> H1[Output Vocabulary\\nDistribution]
            H1 --> I1[Diverse Beam Search\\nDecoding]
            I1 --> J1[Generated Caption]
            end

            subgraph "Method 2: Inception ResNet V2 Model"
            A2[Input Image] --> B2[Inception ResNet V2\\nEncoder]
            B2 --> C2[Global Average Pooling]
            C2 --> D2[Dense Layer\\nProjection]
            E2[Caption Tokens] --> F2[GloVe Word Embedding]
            F2 --> G2[LSTM Layer 1]
            D2 --> G2
            G2 --> H2[Bahdanau Attention]
            H2 --> I2[LSTM Layer 2]
            I2 --> J2[LayerNorm + Dense]
            J2 --> K2[Output Vocabulary\\nDistribution]
            K2 --> L2[Beam Search\\nDecoding]
            L2 --> M2[Generated Caption]
            end

            subgraph "Method 3: ResNet18 Model"
            A3[Input Image] --> B3[ResNet18 Encoder]
            B3 --> C3[Feature Extraction]
            C3 --> D3[Linear Projection\\n512 → 512]
            E3[Caption Tokens] --> F3[Word Embedding]
            F3 --> G3[Simple LSTM]
            D3 --> G3
            G3 --> H3[Dense Layer]
            H3 --> I3[Output Vocabulary\\nDistribution]
            I3 --> J3[Greedy/Beam Search\\nDecoding]
            J3 --> K3[Generated Caption]
            end
        `}
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Interactive flowchart showing architectural differences between the three models.
        Each model follows the encoder-decoder paradigm with varying levels of complexity.
      </p>
    </div>
  );
};

export default ModelArchitectureFlowcharts;