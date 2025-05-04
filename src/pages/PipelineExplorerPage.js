import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaImage, FaProjectDiagram, FaBrain, FaFileAlt, FaRobot, 
    FaChartLine, FaCode, FaInfoCircle, FaQuestionCircle, FaLightbulb,
    FaStethoscope, FaServer, FaNetworkWired, FaMicroscope, FaSyncAlt,
    FaUsers, FaArrowRight // Add these two icons
  } from 'react-icons/fa';
import '../styles/PipelineExplorer.css';

const PipelineExplorerPage = () => {
  const [activeStage, setActiveStage] = useState(null);
  const [activePipeline, setActivePipeline] = useState('chexnet');
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [animationSpeed, setAnimationSpeed] = useState(1500);
  const [sampleImage, setSampleImage] = useState(1);
  const [showModelDetails, setShowModelDetails] = useState(false);
  const [hoveredStage, setHoveredStage] = useState(null);
  
  const animationRef = useRef(null);
  const stageRefs = useRef({});
  
  // Define all pipeline stages
  const pipelineStages = {
    chexnet: [
      {
        id: 'input',
        name: 'Input X-ray',
        icon: <FaImage />,
        color: '#4299e1',
        description: 'The process begins with a chest X-ray image in DICOM, JPEG, or PNG format. This medical imaging serves as the input for the AI analysis pipeline.',
        details: {
          technicalDetails: 'Medical X-ray images are typically grayscale with dimensions varying from 1024×1024 to 3000×3000 pixels depending on the imaging equipment. The model accepts common formats including DICOM (medical standard), JPEG, and PNG.',
          inputRequirements: 'PA (Posteroanterior) or AP (Anteroposterior) views are preferred. The image should include both lungs, the heart, and surrounding structures. Proper exposure and positioning are critical for accurate analysis.',
          challenges: 'X-rays can vary significantly in contrast, brightness, and quality based on the imaging equipment and technician expertise. Background elements, overlapping structures, and patient positioning create variability the model must handle.'
        },
        codeExample: `# Load and display X-ray image
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np

def load_xray_image(image_path):
    """Load an X-ray image and convert for model input"""
    image = Image.open(image_path).convert('RGB')
    
    # Display the image
    plt.figure(figsize=(6, 6))
    plt.imshow(image, cmap='gray')
    plt.axis('off')
    plt.title('Input Chest X-ray')
    plt.show()
    
    return image

# Example usage
xray_image = load_xray_image('patient_xray.jpg')
print(f"Image dimensions: {xray_image.size}")`,
        visualization: {
          type: 'image',
          content: 'C:\Users\sriha\OneDrive\Desktop\medical-image-caption\frontend\src\assets\sample-xray.png'
        }
      },
      {
        id: 'preprocessing',
        name: 'Preprocessing',
        icon: <FaProjectDiagram />,
        color: '#718096',
        description: 'The X-ray image is preprocessed to make it suitable for neural network analysis. This includes resizing, normalization, and transformations to ensure consistent input format.',
        details: {
          technicalDetails: 'Images are resized to 224×224 pixels (standard input size for DenseNet121), converted to RGB channels if needed, and normalized using ImageNet mean [0.485, 0.456, 0.406] and standard deviation [0.229, 0.224, 0.225].',
          transformations: 'The preprocessing pipeline includes resizing, center cropping, converting to tensor format, and channel normalization. Data augmentation techniques like random rotations, flips, and brightness adjustments may be applied during training.',
          importance: 'Preprocessing ensures all images have consistent dimensions and pixel value ranges regardless of the original image format or equipment used. This standardization is critical for the neural network to perform reliably.'
        },
        codeExample: `# Preprocessing X-ray image
import torch
import torchvision.transforms as transforms

def preprocess_xray(image):
    """Preprocess X-ray image for model input"""
    # Define preprocessing pipeline
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=[0.485, 0.456, 0.406],
            std=[0.229, 0.224, 0.225]
        )
    ])
    
    # Apply transformations
    input_tensor = preprocess(image)
    
    # Add batch dimension
    input_batch = input_tensor.unsqueeze(0)
    
    return input_batch

# Example usage
input_batch = preprocess_xray(xray_image)
print(f"Tensor shape: {input_batch.shape}")  # Should be [1, 3, 224, 224]`,
        visualization: {
          type: 'transformation',
          content: 'preprocessing'
        }
      },
      {
        id: 'featureExtraction',
        name: 'Feature Extraction',
        icon: <FaBrain />,
        color: '#718096',
        description: 'The DenseNet121-based CheXNet model processes the image through 121 convolutional layers to extract a rich set of visual features that represent various patterns in the X-ray.',
        details: {
          architecture: 'CheXNet uses a 121-layer Dense Convolutional Network (DenseNet) architecture where each layer is connected to every other layer in a feed-forward fashion. It contains 4 dense blocks with multiple convolutional layers, each followed by transition layers with pooling operations.',
          parameters: 'The model has approximately 7 million trainable parameters. The DenseNet architecture uses fewer parameters than other networks by reusing feature maps from earlier layers.',
          training: 'CheXNet was trained on the ChestX-ray14 dataset containing over 100,000 chest X-rays with 14 disease labels. It was trained using a weighted binary cross entropy loss to handle class imbalance in the medical dataset.'
        },
        codeExample: `# Feature extraction with CheXNet
import torch
from torchvision.models import densenet121

def load_chexnet_model():
    """Load pretrained CheXNet model"""
    # Start with DenseNet121 base
    model = densenet121(pretrained=True)
    
    # Modify final classification layer for 14 disease classes
    num_ftrs = model.classifier.in_features
    model.classifier = torch.nn.Linear(num_ftrs, 14)
    
    # Load CheXNet weights (you would need the pretrained weights file)
    model.load_state_dict(torch.load('chexnet_weights.pth'))
    model.eval()
    
    return model

def extract_features(model, input_batch):
    """Extract 1024-dim feature vector before classification layer"""
    # Feature extractor
    features = torch.nn.Sequential(*list(model.children())[:-1])
    
    # Forward pass until the final pooling layer
    with torch.no_grad():
        feature_vector = features(input_batch)
        # Flatten the features
        feature_vector = torch.flatten(feature_vector, 1)
    
    return feature_vector

# Example usage
model = load_chexnet_model()
features = extract_features(model, input_batch)
print(f"Feature vector shape: {features.shape}")  # Should be [1, 1024]`,
        visualization: {
          type: 'network',
          content: 'densenet'
        }
      },
      {
        id: 'findingAnalysis',
        name: 'Finding Analysis',
        icon: <FaStethoscope />,
        color: '#48bb78',
        description: 'The extracted features are analyzed to identify potential abnormalities in the X-ray, such as lung opacities, pleural effusions, nodules, or cardiomegaly.',
        details: {
          findingTypes: 'CheXNet can detect 14 pathologies: Atelectasis, Cardiomegaly, Consolidation, Edema, Effusion, Emphysema, Fibrosis, Hernia, Infiltration, Mass, Nodule, Pleural Thickening, Pneumonia, and Pneumothorax.',
          classificationApproach: 'The model performs multi-label classification by applying sigmoids to the final layer outputs, producing independent probability scores for each finding. The threshold for positive detection is typically set at 0.5 or determined based on ROC curve analysis.',
          performanceMetrics: 'CheXNet achieves an AUC (Area Under the ROC Curve) of over 0.80 for most pathologies, with particularly high performance for Cardiomegaly, Pneumonia, and Pneumothorax detection.'
        },
        codeExample: `# Analyze findings with CheXNet
import torch
import numpy as np

def analyze_findings(model, input_batch):
    """Perform finding analysis on X-ray using CheXNet"""
    # Define the 14 disease classes
    FINDINGS = [
        'Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion',
        'Emphysema', 'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'Nodule',
        'Pleural Thickening', 'Pneumonia', 'Pneumothorax'
    ]
    
    # Forward pass
    with torch.no_grad():
        outputs = model(input_batch)
        probabilities = torch.sigmoid(outputs)
    
    # Convert to numpy for easier handling
    probs = probabilities.cpu().numpy()[0]
    
    # Format results
    findings = []
    for i, finding in enumerate(FINDINGS):
        findings.append({
            'name': finding,
            'probability': float(probs[i]),
            'positive': probs[i] > 0.5
        })
    
    # Sort by probability
    findings.sort(key=lambda x: x['probability'], reverse=True)
    
    return findings

# Example usage
findings = analyze_findings(model, input_batch)
for finding in findings[:5]:  # Top 5 findings
    status = "POSITIVE" if finding['positive'] else "Negative"
    print(f"{finding['name']}: {finding['probability']:.3f} - {status}")`,
        visualization: {
          type: 'findings',
          content: 'heatmap'
        }
      }
    ],
    biogpt: [
      {
        id: 'captionGeneration',
        name: 'Caption Generation',
        icon: <FaFileAlt />,
        color: '#718096',
        description: 'Based on the detected findings, a structured text description is generated that summarizes the key abnormalities and normal features observed in the X-ray.',
        details: {
          structure: 'The caption is a structured text description that lists the detected findings in a concise, radiologist-like format. It typically includes location, severity, and characteristics of abnormalities.',
          generation: 'Captions are generated using a rule-based template system where detected findings above certain confidence thresholds are incorporated into a natural language description.',
          templateExample: 'Templates follow patterns like: "The chest X-ray shows [finding1] in the [location1]. There is also [finding2] in the [location2]. No evidence of [finding3] or [finding4]."'
        },
        codeExample: `# Generate structured caption from findings
def generate_caption(findings, threshold=0.5):
    """Create a structured text description from the findings"""
    positive_findings = [f for f in findings if f['probability'] > threshold]
    negative_findings = [f for f in findings if f['probability'] <= threshold and f['probability'] > threshold - 0.2]
    
    caption = "The chest X-ray shows "
    
    # Add positive findings
    if positive_findings:
        finding_descriptions = []
        for finding in positive_findings:
            severity = "significant" if finding['probability'] > 0.7 else "possible"
            finding_descriptions.append(f"{severity} {finding['name'].lower()}")
        
        caption += ", ".join(finding_descriptions[:-1])
        if len(finding_descriptions) > 1:
            caption += f", and {finding_descriptions[-1]}"
        else:
            caption += finding_descriptions[0]
    else:
        caption += "no significant abnormalities"
    
    # Add negative findings if relevant
    if negative_findings and positive_findings:
        caption += ". There is no evidence of "
        neg_terms = [n['name'].lower() for n in negative_findings[:3]]
        caption += ", ".join(neg_terms[:-1])
        if len(neg_terms) > 1:
            caption += f", or {neg_terms[-1]}"
        else:
            caption += neg_terms[0]
    
    caption += "."
    return caption

# Example usage
caption = generate_caption(findings)
print(f"Generated Caption:\\n{caption}")`,
        visualization: {
          type: 'text',
          content: 'caption'
        }
      },
      {
        id: 'promptEngineering',
        name: 'Prompt Engineering',
        icon: <FaCode />,
        color: '#718096',
        description: 'The generated caption is formatted into a specific prompt structure optimized for the BioGPT language model to produce a detailed medical report.',
        details: {
          promptDesign: 'The prompt is engineered to guide the language model toward generating a structured medical report. It typically begins with "Chest X-ray Findings:" followed by the caption, and may include additional instructions.',
          promptOptimization: 'Prompts are carefully crafted through iterative testing to determine what format produces the most accurate, comprehensive, and properly structured reports. This includes testing different instruction phrasings, examples, and formatting.',
          systemContext: 'In addition to the specific prompt, the BioGPT model may receive system context that positions it to respond as if it were a radiologist creating a report based on the findings.'
        },
        codeExample: `# Engineer prompt for BioGPT
def create_biogpt_prompt(caption):
    """Create an optimized prompt for BioGPT based on the caption"""
    # Basic prompt structure
    prompt = f"Chest X-ray Findings: {caption}\\n\\n"
    
    # Add instructions for report structure
    prompt += "Based on these findings, generate a detailed radiology report with the following sections:\\n"
    prompt += "1. CLINICAL INFORMATION\\n"
    prompt += "2. TECHNIQUE\\n"
    prompt += "3. FINDINGS\\n"
    prompt += "4. IMPRESSION\\n"
    prompt += "5. RECOMMENDATIONS\\n\\n"
    
    # Optional: Add few-shot example for format guidance
    prompt += "Ensure the report is detailed, follows standard radiological terminology, "
    prompt += "and provides a clear interpretation of the findings."
    
    return prompt

# Example usage
biogpt_prompt = create_biogpt_prompt(caption)
print(f"BioGPT Prompt:\\n{biogpt_prompt}")`,
        visualization: {
          type: 'text',
          content: 'prompt'
        }
      },
      {
        id: 'biogptGeneration',
        name: 'BioGPT Generation',
        icon: <FaRobot />,
        color: '#ed8936',
        description: 'The BioGPT model, a specialized language model trained on biomedical text, generates a comprehensive medical report based on the input prompt.',
        details: {
          modelArchitecture: 'BioGPT is based on the GPT (Generative Pre-trained Transformer) architecture. It uses decoder-only transformer blocks with multi-head attention mechanisms and feed-forward neural networks.',
          specialization: 'Unlike general-purpose language models, BioGPT is fine-tuned on vast amounts of biomedical literature, including medical textbooks, journal articles, and radiology reports. This specialization enables it to understand and generate medically accurate text with appropriate terminology.',
          generation: 'The model generates text autoregressively, predicting one token at a time based on previous tokens. Techniques like beam search, temperature sampling, and top-p filtering are used to improve the quality and relevance of the generated text.'
        },
        codeExample: `# Generate report with BioGPT
from transformers import AutoTokenizer, AutoModelForCausalLM

def generate_medical_report(prompt):
    """Generate medical report using BioGPT"""
    # Load model and tokenizer
    tokenizer = AutoTokenizer.from_pretrained("microsoft/biogpt")
    model = AutoModelForCausalLM.from_pretrained("microsoft/biogpt")
    
    # Tokenize the prompt
    inputs = tokenizer(prompt, return_tensors="pt")
    
    # Generate text
    output = model.generate(
        inputs["input_ids"],
        max_length=1000,
        num_beams=4,
        temperature=0.8,
        top_p=0.92,
        do_sample=True,
        no_repeat_ngram_size=2,
        length_penalty=1.0
    )
    
    # Decode the generated text
    generated_text = tokenizer.decode(output[0], skip_special_tokens=True)
    
    # Remove the prompt from the generated text
    report = generated_text.replace(prompt, "").strip()
    
    return report

# Example usage
medical_report = generate_medical_report(biogpt_prompt)
print(f"Generated Medical Report:\\n{medical_report[:300]}...")  # Preview`,
        visualization: {
          type: 'llm',
          content: 'generation'
        }
      },
      {
        id: 'reportStructuring',
        name: 'Report Structuring',
        icon: <FaMicroscope />,
        color: '#9f7aea',
        description: 'The generated text is formatted into a professionally structured radiology report with standardized sections including findings, impressions, and recommendations.',
        details: {
          sections: 'A standard radiology report includes: Clinical Information (reason for exam), Technique (how the image was obtained), Findings (detailed observations), Impression (summary interpretation), and Recommendations (next steps).',
          formatting: 'The report is formatted with clear section headers, proper spacing, and organized bullet points or numbered lists where appropriate. The formatting enhances readability for healthcare providers.',
          qualityAssurance: 'The structured report undergoes post-processing to ensure adherence to radiology reporting standards. This may include adding missing sections, fixing inconsistencies, and ensuring the impression aligns with the findings.'
        },
        codeExample: `# Structure and format the medical report
import re

def structure_report(raw_report):
    """Structure and format the BioGPT-generated report"""
    # Define expected sections
    sections = [
        "CLINICAL INFORMATION",
        "TECHNIQUE",
        "FINDINGS",
        "IMPRESSION",
        "RECOMMENDATIONS"
    ]
    
    # Create structured report
    structured_report = ""
    
    # Check if sections are present and add them if missing
    for section in sections:
        section_pattern = re.compile(f"{section}:?\\s", re.IGNORECASE)
        if section_pattern.search(raw_report):
            # Extract section content
            match = section_pattern.search(raw_report)
            start_idx = match.start()
            
            # Find the end of this section (start of next section or end of text)
            next_section_match = None
            for next_section in sections:
                if next_section == section:
                    continue
                next_pattern = re.compile(f"{next_section}:?\\s", re.IGNORECASE)
                next_match = next_pattern.search(raw_report, start_idx + len(section))
                if next_match and (next_section_match is None or next_match.start() < next_section_match.start()):
                    next_section_match = next_match
            
            end_idx = next_section_match.start() if next_section_match else len(raw_report)
            
            # Extract and format section content
            content = raw_report[start_idx:end_idx].strip()
            structured_report += f"{section}:\\n{content.replace(section+':', '').strip()}\\n\\n"
        else:
            # Add missing section with placeholder
            structured_report += f"{section}:\\n"
            if section == "CLINICAL INFORMATION":
                structured_report += "Chest X-ray examination performed to evaluate abnormalities seen on imaging.\\n\\n"
            elif section == "TECHNIQUE":
                structured_report += "PA and lateral chest radiographs obtained using standard technique.\\n\\n"
            elif section == "FINDINGS":
                structured_report += "Please refer to the detailed findings section.\\n\\n"
            elif section == "IMPRESSION":
                structured_report += "Based on the findings described above.\\n\\n"
            elif section == "RECOMMENDATIONS":
                structured_report += "Clinical correlation advised.\\n\\n"
    
    return structured_report

# Example usage
final_report = structure_report(medical_report)
print(f"Final Structured Report:\\n{final_report}")`,
        visualization: {
          type: 'document',
          content: 'report'
        }
      }
    ]
  };
  
  // Handle stage click
  const handleStageClick = (stageId) => {
    setActiveStage(activeStage === stageId ? null : stageId);
    setActiveTab('overview');
    
    // If clicking on an active stage, scroll to it (useful on mobile)
    if (activeStage === stageId && stageRefs.current[stageId]) {
      stageRefs.current[stageId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  // Play animation through the pipeline
  const playAnimation = () => {
    setAnimationPlaying(true);
    setActiveStage(null);
    
    const currentPipeline = pipelineStages[activePipeline];
    let currentStageIndex = 0;
    
    // Clear any existing animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    // Function to move to next stage
    const animateNextStage = () => {
      if (currentStageIndex < currentPipeline.length) {
        setActiveStage(currentPipeline[currentStageIndex].id);
        currentStageIndex++;
        animationRef.current = setTimeout(animateNextStage, animationSpeed);
      } else {
        setAnimationPlaying(false);
      }
    };
    
    // Start animation
    animateNextStage();
  };
  
  // Stop animation
  const stopAnimation = () => {
    setAnimationPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };
  
  // Change pipeline
  const handlePipelineChange = (pipeline) => {
    setActivePipeline(pipeline);
    setActiveStage(null);
  };
  
  // Change animation speed
  const handleSpeedChange = (e) => {
    setAnimationSpeed(parseInt(e.target.value));
  };
  
  // Change sample image
  const handleSampleChange = (e) => {
    setSampleImage(parseInt(e.target.value));
  };
  
  // Toggle model details
  const toggleModelDetails = () => {
    setShowModelDetails(!showModelDetails);
  };
  
  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);
  
  // Get current pipeline stages
  const currentPipelineStages = pipelineStages[activePipeline];
  
  // Find current active stage
  const currentStage = currentPipelineStages.find(stage => stage.id === activeStage);
  
  // Get visualization content for stage
  const getVisualizationContent = (stage) => {
    if (!stage || !stage.visualization) return null;
    
    switch (stage.visualization.type) {
      case 'image':
        return (
          <div className="visualization-image">
            <img src={stage.visualization.content} alt={stage.name} />
          </div>
        );
      case 'text':
        return (
          <div className="visualization-text">
            {stage.visualization.content === 'caption' && (
              <div className="caption-display">
                <h4>Generated Caption:</h4>
                <p className="caption-text">
                  The chest X-ray shows patchy opacities in the right upper lobe, mild cardiomegaly, and small right pleural effusion. No evidence of pneumothorax or nodules.
                </p>
              </div>
            )}
            {stage.visualization.content === 'prompt' && (
              <div className="prompt-display">
                <h4>Formatted Prompt:</h4>
                <div className="prompt-text">
                  <p><strong>Chest X-ray Findings:</strong> The chest X-ray shows patchy opacities in the right upper lobe, mild cardiomegaly, and small right pleural effusion. No evidence of pneumothorax or nodules.</p>
                  <p>Based on these findings, generate a detailed radiology report with the following sections:</p>
                  <ol>
                    <li>CLINICAL INFORMATION</li>
                    <li>TECHNIQUE</li>
                    <li>FINDINGS</li>
                    <li>IMPRESSION</li>
                    <li>RECOMMENDATIONS</li>
                  </ol>
                  <p>Ensure the report is detailed, follows standard radiological terminology, and provides a clear interpretation of the findings.</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'transformation':
        return (
          <div className="visualization-transformation">
            <div className="transform-before">
              <h4>Original Image</h4>
              <div className="image-container">
                <img src="/sample_xray.jpg" alt="Original X-ray" />
                <p>3000×3000 pixels</p>
              </div>
            </div>
            <div className="transform-arrow">→</div>
            <div className="transform-after">
              <h4>Preprocessed Image</h4>
              <div className="image-container">
                <img src="/sample_xray_processed.jpg" alt="Processed X-ray" />
                <p>224×224 pixels, normalized</p>
              </div>
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="visualization-network">
            <h4>DenseNet Architecture</h4>
            <div className="network-diagram">
              <img src="/densenet_architecture.png" alt="DenseNet Architecture" />
              <p>121-layer network with dense connections</p>
            </div>
            <div className="feature-map">
              <h4>Feature Activation Maps</h4>
              <div className="activation-grid">
                <div className="activation-map">
                  <img src="/activation_map1.png" alt="Activation Map 1" />
                </div>
                <div className="activation-map">
                  <img src="/activation_map2.png" alt="Activation Map 2" />
                </div>
                <div className="activation-map">
                  <img src="/activation_map3.png" alt="Activation Map 3" />
                </div>
                <div className="activation-map">
                  <img src="/activation_map4.png" alt="Activation Map 4" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'findings':
        return (
          <div className="visualization-findings">
            <h4>Detected Findings</h4>
            <div className="findings-container">
              <div className="findings-heatmap">
                <img src="/xray_heatmap.png" alt="Findings Heatmap" />
                <p>Activation heatmap highlighting relevant regions</p>
              </div>
              <div className="findings-list">
                <table className="findings-table">
                  <thead>
                    <tr>
                      <th>Finding</th>
                      <th>Probability</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="positive-finding">
                      <td>Opacity</td>
                      <td>0.87</td>
                      <td>POSITIVE</td>
                    </tr>
                    <tr className="positive-finding">
                      <td>Cardiomegaly</td>
                      <td>0.72</td>
                      <td>POSITIVE</td>
                    </tr>
                    <tr className="positive-finding">
                      <td>Effusion</td>
                      <td>0.65</td>
                      <td>POSITIVE</td>
                    </tr>
                    <tr>
                      <td>Pneumothorax</td>
                      <td>0.12</td>
                      <td>Negative</td>
                    </tr>
                    <tr>
                      <td>Nodule</td>
                      <td>0.18</td>
                      <td>Negative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'llm':
        return (
          <div className="visualization-llm">
            <h4>BioGPT Text Generation</h4>
            <div className="llm-visualization">
              <div className="token-generation">
                <p className="token-title">Token-by-Token Generation:</p>
                <div className="token-sequence">
                  <span className="token">CLINICAL</span>
                  <span className="token">INFORMATION</span>
                  <span className="token">:</span>
                  <span className="token">Chest</span>
                  <span className="token">X</span>
                  <span className="token">-ray</span>
                  <span className="token">examination</span>
                  <span className="token active-token">performed</span>
                  <span className="token next-token">to</span>
                  <span className="token next-token">evaluate</span>
                  <span className="token-placeholder">...</span>
                </div>
              </div>
              <div className="generation-params">
                <h5>Generation Parameters:</h5>
                <ul className="params-list">
                  <li><span>Temperature:</span> 0.8</li>
                  <li><span>Top-p:</span> 0.92</li>
                  <li><span>Beam Size:</span> 4</li>
                  <li><span>No Repeat Ngram Size:</span> 2</li>
                  <li><span>Length Penalty:</span> 1.0</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="visualization-document">
            <h4>Structured Radiology Report</h4>
            <div className="report-document">
              <div className="report-header">
                <h3>CHEST X-RAY REPORT</h3>
                <p>Patient ID: XR-2025062</p>
                <p>Date: May 2, 2025</p>
              </div>
              <div className="report-section">
                <h5>CLINICAL INFORMATION:</h5>
                <p>Chest X-ray examination performed to evaluate abnormalities seen on imaging.</p>
              </div>
              <div className="report-section">
                <h5>TECHNIQUE:</h5>
                <p>PA and lateral chest radiographs obtained using standard technique.</p>
              </div>
              <div className="report-section">
                <h5>FINDINGS:</h5>
                <p>Patchy opacities are noted in the right upper lobe, consistent with pneumonic infiltrate. The cardiac silhouette is mildly enlarged, with a cardiothoracic ratio of approximately 0.55. There is a small right pleural effusion. The left lung is clear. No pneumothorax is identified. The visualized bony structures are unremarkable.</p>
              </div>
              <div className="report-section">
                <h5>IMPRESSION:</h5>
                <p>1. Right upper lobe pneumonia.</p>
                <p>2. Mild cardiomegaly.</p>
                <p>3. Small right pleural effusion, likely related to infection.</p>
              </div>
              <div className="report-section">
                <h5>RECOMMENDATIONS:</h5>
                <p>1. Clinical correlation advised.</p>
                <p>2. Follow-up imaging in 4-6 weeks to ensure resolution of pneumonia, if clinically indicated.</p>
                <p>3. Consider cardiac evaluation for cardiomegaly.</p>
              </div>
            </div>
          </div>
        );
      default:
        return <p>Visualization not available</p>;
    }
  };
  
  return (
    <div className="pipeline-explorer-page">
      <div className="hero-section">
        <div className="container">
          <h1>Medical AI Pipeline Explorer</h1>
          <p>Interactive visualization of the CheXNet to BioGPT medical report generation process</p>
        </div>
      </div>
      
      <div className="container">
        <div className="pipeline-controls">
          <div className="pipeline-selector">
            <button 
              className={`pipeline-button ${activePipeline === 'chexnet' ? 'active' : ''}`}
              onClick={() => handlePipelineChange('chexnet')}
            >
              <FaBrain className="pipeline-icon" />
              <span>CheXNet Pipeline</span>
            </button>
            <button 
              className={`pipeline-button ${activePipeline === 'biogpt' ? 'active' : ''}`}
              onClick={() => handlePipelineChange('biogpt')}
            >
              <FaRobot className="pipeline-icon" />
              <span>BioGPT Pipeline</span>
            </button>
          </div>
          
          <div className="animation-controls">
            {!animationPlaying ? (
              <button className="play-button" onClick={playAnimation} disabled={animationPlaying}>
                <FaServer /> Play Animation
              </button>
            ) : (
              <button className="stop-button" onClick={stopAnimation}>
                <FaServer /> Stop Animation
              </button>
            )}
            
            <div className="speed-control">
              <label htmlFor="speedControl">Animation Speed:</label>
              <input 
                type="range" 
                id="speedControl"
                min="500" 
                max="3000" 
                step="500"
                value={animationSpeed}
                onChange={handleSpeedChange}
                disabled={animationPlaying}
              />
              <span className="speed-value">{animationSpeed}ms</span>
            </div>
            
            <div className="sample-control">
              <label htmlFor="sampleControl">Sample Case:</label>
              <select 
                id="sampleControl"
                value={sampleImage}
                onChange={handleSampleChange}
                disabled={animationPlaying}
              >
                <option value="1">Case 1: Pneumonia</option>
                <option value="2">Case 2: Cardiomegaly</option>
                <option value="3">Case 3: Normal Study</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="pipeline-diagram">
          <div className={`pipeline-section ${activePipeline === 'chexnet' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>CheXNet Image Processing Pipeline</h2>
              <p>Deep learning-based analysis of chest X-ray images</p>
            </div>
            <div className="stages-container">
              {pipelineStages.chexnet.map((stage, index) => (
                <div 
                  key={stage.id}
                  ref={el => stageRefs.current[stage.id] = el}
                  className={`pipeline-stage ${activeStage === stage.id ? 'active' : ''} ${hoveredStage === stage.id ? 'hovered' : ''}`}
                  onClick={() => handleStageClick(stage.id)}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  style={{
                    backgroundColor: activeStage === stage.id ? stage.color + '20' : '',
                    borderColor: activeStage === stage.id ? stage.color : '',
                  }}
                >
                  <div className="stage-icon" style={{ backgroundColor: stage.color }}>
                    {stage.icon}
                  </div>
                  <div className="stage-info">
                    <h3>{stage.name}</h3>
                    <p>{stage.description}</p>
                  </div>
                  {index < pipelineStages.chexnet.length - 1 && (
                    <div className="stage-arrow">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className={`pipeline-section ${activePipeline === 'biogpt' ? 'active' : ''}`}>
            <div className="section-header">
              <h2>BioGPT Report Generation Pipeline</h2>
              <p>Natural language generation of detailed medical reports</p>
            </div>
            <div className="stages-container">
              {pipelineStages.biogpt.map((stage, index) => (
                <div 
                  key={stage.id}
                  ref={el => stageRefs.current[stage.id] = el}
                  className={`pipeline-stage ${activeStage === stage.id ? 'active' : ''} ${hoveredStage === stage.id ? 'hovered' : ''}`}
                  onClick={() => handleStageClick(stage.id)}
                  onMouseEnter={() => setHoveredStage(stage.id)}
                  onMouseLeave={() => setHoveredStage(null)}
                  style={{
                    backgroundColor: activeStage === stage.id ? stage.color + '20' : '',
                    borderColor: activeStage === stage.id ? stage.color : '',
                  }}
                >
                  <div className="stage-icon" style={{ backgroundColor: stage.color }}>
                    {stage.icon}
                  </div>
                  <div className="stage-info">
                    <h3>{stage.name}</h3>
                    <p>{stage.description}</p>
                  </div>
                  {index < pipelineStages.biogpt.length - 1 && (
                    <div className="stage-arrow">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="pipeline-connector">
            <div className="connector-line"></div>
            <div className="connector-label">
              Features transferred between pipelines
            </div>
          </div>
        </div>
        
        {activeStage && currentStage && (
          <div className="stage-details">
            <div className="stage-details-header">
              <div className="stage-title">
                <div className="stage-icon-large" style={{ backgroundColor: currentStage.color }}>
                  {currentStage.icon}
                </div>
                <h2>{currentStage.name}</h2>
              </div>
              <button className="close-button" onClick={() => setActiveStage(null)}>×</button>
            </div>
            
            <div className="stage-tabs">
              <button 
                className={`stage-tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <FaInfoCircle /> Overview
              </button>
              <button 
                className={`stage-tab ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                <FaServer /> Technical Details
              </button>
              <button 
                className={`stage-tab ${activeTab === 'code' ? 'active' : ''}`}
                onClick={() => setActiveTab('code')}
              >
                <FaCode /> Code Example
              </button>
              <button 
                className={`stage-tab ${activeTab === 'visualization' ? 'active' : ''}`}
                onClick={() => setActiveTab('visualization')}
              >
                <FaChartLine /> Visualization
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <p className="overview-description">{currentStage.description}</p>
                  <div className="quick-facts">
                    <div className="fact">
                      <FaNetworkWired className="fact-icon" />
                      <div className="fact-content">
                        <h4>Pipeline Role</h4>
                        <p>{activePipeline === 'chexnet' ? 'Image Analysis' : 'Text Generation'} Stage</p>
                      </div>
                    </div>
                    <div className="fact">
                      <FaLightbulb className="fact-icon" />
                      <div className="fact-content">
                        <h4>Key Insight</h4>
                        <p>{
                          {
                            'input': 'Quality of input image directly affects the accuracy of all subsequent analysis.',
                            'preprocessing': 'Standardization of images is crucial for consistent neural network performance.',
                            'featureExtraction': 'Deep features encode complex patterns that human radiologists also use for diagnosis.',
                            'findingAnalysis': 'Multi-label classification allows detection of multiple concurrent conditions.',
                            'captionGeneration': 'Translating visual findings to text bridges the image and language domains.',
                            'promptEngineering': 'Prompt design heavily influences the structure and quality of the generated report.',
                            'biogptGeneration': 'Domain-specific training allows for medically accurate text generation.',
                            'reportStructuring': 'Following standard medical formats improves clinical utility.'
                          }[currentStage.id]
                        }</p>
                      </div>
                    </div>
                    <div className="fact">
                      <FaQuestionCircle className="fact-icon" />
                      <div className="fact-content">
                        <h4>Common Challenge</h4>
                        <p>{
                          {
                            'input': 'Variations in X-ray quality, positioning, and exposure between different imaging systems.',
                            'preprocessing': 'Balancing information preservation with standardization requirements.',
                            'featureExtraction': 'Ensuring the model focuses on medically relevant features rather than artifacts.',
                            'findingAnalysis': 'Handling rare conditions with limited training examples.',
                            'captionGeneration': 'Generating accurate descriptions that include spatial relationships.',
                            'promptEngineering': 'Creating prompts that produce consistent report structures.',
                            'biogptGeneration': 'Avoiding hallucinations when describing unseen or ambiguous findings.',
                            'reportStructuring': 'Maintaining consistency between findings and impression sections.'
                          }[currentStage.id]
                        }</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'technical' && (
                <div className="technical-tab">
                  {Object.entries(currentStage.details).map(([key, value]) => (
                    <div key={key} className="technical-detail">
                      <h3>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h3>
                      {typeof value === 'string' ? (
                        <p>{value}</p>
                      ) : Array.isArray(value) ? (
                        <ul>
                          {value.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>Details not available</p>
                      )}
                    </div>
                  ))}
                  
                  <div className="model-details-toggle">
                    <button onClick={toggleModelDetails}>
                      {showModelDetails ? 'Hide Detailed Technical Specifications' : 'Show Detailed Technical Specifications'}
                    </button>
                  </div>
                  
                  {showModelDetails && (
                    <div className="model-details">
                      {currentStage.id === 'featureExtraction' && (
                        <div className="model-specifications">
                          <h3>DenseNet121 Architecture Specifications</h3>
                          <table className="specs-table">
                            <tbody>
                              <tr>
                                <th>Total Layers</th>
                                <td>121 (Convolutional + Batch Norm + Pooling)</td>
                              </tr>
                              <tr>
                                <th>Parameters</th>
                                <td>~7 million</td>
                              </tr>
                              <tr>
                                <th>Dense Blocks</th>
                                <td>4</td>
                              </tr>
                              <tr>
                                <th>Growth Rate</th>
                                <td>32</td>
                              </tr>
                              <tr>
                                <th>Compression Factor</th>
                                <td>0.5</td>
                              </tr>
                              <tr>
                                <th>Feature Dimension</th>
                                <td>1024-dimensional vector</td>
                              </tr>
                              <tr>
                                <th>Training Dataset</th>
                                <td>ChestX-ray14 (112,120 frontal-view X-ray images from 30,805 patients)</td>
                              </tr>
                              <tr>
                                <th>Training Strategy</th>
                                <td>Transfer learning from ImageNet, weighted loss for class imbalance</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {currentStage.id === 'biogptGeneration' && (
                        <div className="model-specifications">
                          <h3>BioGPT Model Specifications</h3>
                          <table className="specs-table">
                            <tbody>
                              <tr>
                                <th>Architecture</th>
                                <td>Decoder-only Transformer</td>
                              </tr>
                              <tr>
                                <th>Parameters</th>
                                <td>~1.5 billion</td>
                              </tr>
                              <tr>
                                <th>Context Length</th>
                                <td>1024 tokens</td>
                              </tr>
                              <tr>
                                <th>Layers</th>
                                <td>24 transformer blocks</td>
                              </tr>
                              <tr>
                                <th>Hidden Size</th>
                                <td>2048</td>
                              </tr>
                              <tr>
                                <th>Attention Heads</th>
                                <td>16</td>
                              </tr>
                              <tr>
                                <th>Training Corpus</th>
                                <td>PubMed abstracts, PMC articles, medical textbooks, radiology reports</td>
                              </tr>
                              <tr>
                                <th>Vocabulary Size</th>
                                <td>42,000 tokens (includes specialized medical terminology)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'code' && (
                <div className="code-tab">
                  <div className="code-header">
                    <h3>Implementation Example</h3>
                    <div className="code-language">Python / PyTorch</div>
                  </div>
                  <pre className="code-block">
                    <code>{currentStage.codeExample}</code>
                  </pre>
                </div>
              )}
              
              {activeTab === 'visualization' && (
                <div className="visualization-tab">
                  {getVisualizationContent(currentStage)}
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="pipeline-info">
          <h2>How It Works: From X-ray to Medical Report</h2>
          <p>
            This interactive visualization demonstrates the end-to-end process of generating a 
            radiological report from a chest X-ray image using deep learning models. The process 
            is divided into two main pipelines:
          </p>
          <ul>
            <li>
              <strong>CheXNet Pipeline:</strong> Processes the X-ray image to identify potential 
              medical findings using a convolutional neural network architecture.
            </li>
            <li>
              <strong>BioGPT Pipeline:</strong> Generates a comprehensive, structured medical report 
              based on the findings using a specialized biomedical language model.
            </li>
          </ul>
          <p>
            Click on any stage to explore detailed information about its role in the pipeline, 
            including technical details, code examples, and visualizations. You can also use the 
            animation controls to walk through the entire process step by step.
          </p>
          
          <div className="practical-applications">
            <h3>Practical Applications</h3>
            <div className="applications-grid">
              <div className="application-card">
                <div className="application-icon">
                  <FaStethoscope />
                </div>
                <h4>Clinical Decision Support</h4>
                <p>
                  Assists radiologists by providing preliminary findings and reports, 
                  potentially reducing reading time and improving consistency.
                </p>
              </div>
              <div className="application-card">
                <div className="application-icon">
                  <FaServer />
                </div>
                <h4>Remote Healthcare</h4>
                <p>
                  Enables rapid analysis in remote or underserved areas where specialist 
                  radiologists may not be immediately available.
                </p>
              </div>
              <div className="application-card">
                <div className="application-icon">
                  <FaChartLine />
                </div>
                <h4>Research & Education</h4>
                <p>
                  Supports medical research and education by automating annotation of 
                  large datasets and providing consistent analysis.
                </p>
              </div>
              <div className="application-card">
                <div className="application-icon">
                  <FaUsers />
                </div>
                <h4>Triaging & Workflow</h4>
                <p>
                  Helps prioritize urgent cases by flagging potential critical findings 
                  that require immediate attention.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="try-it-section">
          <h2>Experience the Technology</h2>
          <p>
            Upload your own chest X-ray images and see how our AI generates detailed medical reports 
            using the same pipeline visualized here.
          </p>
          <Link to="/dashboard" className="try-button">
            Try the Image Analysis Tool <FaArrowRight />
          </Link>
          <p className="disclaimer">
            <FaInfoCircle /> <strong>Disclaimer:</strong> This application is for educational 
            and research purposes only. It is not intended for clinical use or to provide 
            medical advice. Always consult with qualified healthcare professionals for 
            proper medical evaluation and interpretation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PipelineExplorerPage;