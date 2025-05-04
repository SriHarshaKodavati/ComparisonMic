import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLungs, FaHeartbeat, FaSearch, FaArrowRight, FaInfoCircle, 
  FaChartLine, FaExclamationTriangle, FaNotesMedical, FaBookMedical,
  FaRegLightbulb, FaUserMd, FaThList, FaTh
} from 'react-icons/fa';
import '../styles/ChexnetInfo.css';

const ChexnetInfoPage = () => {
  const [activeCondition, setActiveCondition] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTab, setSelectedTab] = useState('description');
  const [prevalenceData, setPrevalenceData] = useState({});
  const [showComparison, setShowComparison] = useState(false);
  const [compareConditions, setCompareConditions] = useState([]);
  const [difficulty, setDifficulty] = useState('beginner');
  
  const conditionRefs = useRef({});
  
  const conditions = [
    {
      id: 'atelectasis',
      name: 'Atelectasis',
      icon: <FaLungs />,
      description: 'Collapse of lung tissue affecting part or all of one lung, which prevents normal respiration.',
      features: 'Loss of lung volume, displacement of fissures, airways, vessels, and mediastinum. Increased opacity in the affected area.',
      significance: 'Can be caused by obstruction, compression, or surfactant deficiency. May lead to hypoxemia if severe.',
      prevalence: 28.5,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Shift of the mediastinum toward the affected side',
        'Elevation of the diaphragm on the affected side',
        'Compensatory hyperinflation of the unaffected lung',
        'Loss of volume in the affected part of the lung'
      ],
      differential_diagnosis: [
        'Pneumonia',
        'Pleural effusion',
        'Pulmonary fibrosis',
        'Pneumothorax (in certain presentations)'
      ],
      recommended_followup: 'CT scan may be needed to identify underlying cause such as obstructing lesion.',
      case_examples: [
        {
          title: 'Post-operative Atelectasis',
          description: 'Common in patients after surgery due to shallow breathing from pain medication. Usually resolves with breathing exercises.'
        },
        {
          title: 'Obstructive Atelectasis',
          description: 'Can occur when airway is blocked by a foreign body or tumor. Requires prompt intervention to remove obstruction.'
        }
      ]
    },
    {
      id: 'cardiomegaly',
      name: 'Cardiomegaly',
      icon: <FaHeartbeat />,
      description: 'Enlargement of the heart, often due to chronic underlying conditions affecting the heart muscle.',
      features: 'Cardiothoracic ratio greater than 0.5 on frontal chest radiograph. Heart shadow extends beyond normal borders.',
      significance: 'May indicate heart failure, valve problems, cardiomyopathy, or other cardiac conditions requiring clinical attention.',
      prevalence: 23.2,
      difficulty_level: 'beginner',
      key_diagnostic_features: [
        'Cardiothoracic ratio > 0.5 (heart width/chest width) on PA film',
        'Enlarged cardiac silhouette',
        'Obliteration of retrosternal space on lateral view',
        'Possible displaced apex'
      ],
      differential_diagnosis: [
        'Pericardial effusion',
        'Ventricular hypertrophy',
        'Dilated cardiomyopathy',
        'Congestive heart failure'
      ],
      recommended_followup: 'Echocardiogram to evaluate cardiac function and valve status.',
      case_examples: [
        {
          title: 'Chronic Hypertensive Cardiomegaly',
          description: 'Seen in patients with long-standing hypertension leading to ventricular hypertrophy.'
        },
        {
          title: 'Post-Myocardial Infarction Cardiomegaly',
          description: 'Heart enlargement following significant myocardial damage after a heart attack.'
        }
      ]
    },
    {
      id: 'effusion',
      name: 'Pleural Effusion',
      icon: <FaLungs />,
      description: 'Abnormal accumulation of fluid in the pleural space between the lungs and chest wall.',
      features: 'Blunting of costophrenic angles, fluid levels, and opacification of hemithorax. May obscure lung markings.',
      significance: 'Can be caused by heart failure, infection, malignancy, or other inflammatory conditions. May require drainage if symptomatic.',
      prevalence: 19.8,
      difficulty_level: 'beginner',
      key_diagnostic_features: [
        'Blunting of costophrenic angle',
        'Meniscus sign (curved upper border of fluid)',
        'Layering of fluid with upright positioning',
        'Possible mediastinal shift away from affected side in large effusions'
      ],
      differential_diagnosis: [
        'Empyema',
        'Hemothorax',
        'Chylothorax',
        'Transudative vs exudative effusion'
      ],
      recommended_followup: 'Thoracentesis for fluid analysis if cause is unknown.',
      case_examples: [
        {
          title: 'Congestive Heart Failure Effusion',
          description: 'Bilateral effusions that respond to diuretic therapy, often with accompanying cardiomegaly.'
        },
        {
          title: 'Malignant Pleural Effusion',
          description: 'Often unilateral and rapidly recurring, may require pleurodesis.'
        }
      ]
    },
    {
      id: 'infiltration',
      name: 'Infiltration',
      icon: <FaLungs />,
      description: 'Substances like fluid, cells, or other materials accumulating in lung tissues or airspaces.',
      features: 'Patchy or diffuse opacities with ill-defined borders, often preserving bronchovascular markings.',
      significance: 'May represent early pneumonia, edema, hemorrhage, or other inflammatory processes affecting the lung parenchyma.',
      prevalence: 24.6,
      difficulty_level: 'advanced',
      key_diagnostic_features: [
        'Patchy opacities with indistinct borders',
        'Preserved bronchovascular markings',
        'Variable distribution (focal, multifocal, or diffuse)',
        'May be associated with air bronchograms'
      ],
      differential_diagnosis: [
        'Infectious pneumonia',
        'Pulmonary edema',
        'Hemorrhage',
        'Aspiration'
      ],
      recommended_followup: 'Clinical correlation, consider follow-up imaging in 4-6 weeks to ensure resolution.',
      case_examples: [
        {
          title: 'Aspiration Pneumonitis',
          description: 'Common in patients with altered consciousness, often affects dependent lung segments.'
        },
        {
          title: 'Viral Pneumonia Infiltrates',
          description: 'Often bilateral and interstitial, may have ground glass appearance on CT.'
        }
      ]
    },
    {
      id: 'mass',
      name: 'Mass',
      icon: <FaLungs />,
      description: 'A solid lesion in the lung greater than 3 cm in diameter with well-defined borders.',
      features: 'Rounded opacity with distinct margins, may show cavitation or calcification. Often solitary.',
      significance: 'Concerning for primary lung cancer or metastatic disease. Requires follow-up imaging and possible biopsy.',
      prevalence: 8.4,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Well-circumscribed opacity >3cm',
        'May have smooth or irregular borders',
        'Possible cavitation or calcification',
        'May have associated pleural effusion or lymphadenopathy'
      ],
      differential_diagnosis: [
        'Primary lung cancer',
        'Metastatic disease',
        'Hamartoma',
        'Granuloma',
        'Lung abscess'
      ],
      recommended_followup: 'CT chest with contrast, PET/CT if cancer suspected, tissue biopsy.',
      case_examples: [
        {
          title: 'Solitary Pulmonary Nodule in Smoker',
          description: 'High risk for malignancy, especially if spiculated borders or upper lobe location.'
        },
        {
          title: 'Cavitating Mass',
          description: 'May represent squamous cell carcinoma, abscess, or fungal infection.'
        }
      ]
    },
    {
      id: 'nodule',
      name: 'Nodule',
      icon: <FaLungs />,
      description: 'A small, round opacity in the lung less than 3 cm in diameter that appears as a discrete, well-defined lesion.',
      features: 'Small, round or oval opacity with well-defined margins. May be solitary or multiple.',
      significance: 'May represent benign granuloma, hamartoma, or early malignancy. Follow-up often needed based on size and risk factors.',
      prevalence: 15.2,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Well-defined opacity <3cm',
        'May be solitary or multiple',
        'Solid, semi-solid, or ground-glass appearance',
        'Location and edge characteristics inform risk assessment'
      ],
      differential_diagnosis: [
        'Granuloma',
        'Early primary lung cancer',
        'Metastasis',
        'Hamartoma',
        'Arteriovenous malformation'
      ],
      recommended_followup: 'Follow Fleischner Society guidelines based on size, risk factors, and appearance.',
      case_examples: [
        {
          title: 'Incidental 5mm Nodule',
          description: 'Common finding, often requires follow-up CT in 6-12 months to ensure stability.'
        },
        {
          title: 'Multiple Bilateral Nodules',
          description: 'Concerning for metastatic disease, granulomatous infection, or hypersensitivity pneumonitis.'
        }
      ]
    },
    {
      id: 'pneumonia',
      name: 'Pneumonia',
      icon: <FaLungs />,
      description: 'Infection of the lung tissue causing inflammation and fluid-filled alveoli.',
      features: 'Patchy or lobar consolidation, air bronchograms, and sometimes pleural effusion. Can be unilateral or bilateral.',
      significance: 'Requires antibiotic treatment in bacterial cases. Can be severe in elderly or immunocompromised patients.',
      prevalence: 14.3,
      difficulty_level: 'beginner',
      key_diagnostic_features: [
        'Focal or diffuse airspace opacification',
        'Air bronchograms',
        'Lobar or segmental distribution',
        'May have associated pleural effusion'
      ],
      differential_diagnosis: [
        'Aspiration',
        'Pulmonary edema',
        'Hemorrhage',
        'Lung contusion',
        'ARDS (in diffuse cases)'
      ],
      recommended_followup: 'Clinical response monitoring, consider follow-up X-ray in 6-8 weeks to ensure resolution.',
      case_examples: [
        {
          title: 'Community Acquired Pneumonia',
          description: 'Often lobar distribution, typically responds to appropriate antibiotics within 48-72 hours.'
        },
        {
          title: 'Atypical Pneumonia',
          description: 'Often characterized by interstitial pattern rather than airspace disease, may have patchy distribution.'
        }
      ]
    },
    {
      id: 'pneumothorax',
      name: 'Pneumothorax',
      icon: <FaLungs />,
      description: 'Presence of air in the pleural space causing partial or complete lung collapse.',
      features: 'Visible visceral pleural line with absence of lung markings beyond it. Hyperlucency in the affected hemithorax.',
      significance: 'May be spontaneous, traumatic, or iatrogenic. Large pneumothoraces require chest tube placement.',
      prevalence: 5.7,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Visible visceral pleural line',
        'Absence of lung markings peripheral to the line',
        'Hyperlucency of affected hemithorax',
        'Possible mediastinal shift in tension pneumothorax'
      ],
      differential_diagnosis: [
        'Large emphysematous bullae',
        'Pneumomediastinum',
        'Skin folds mimicking pleural line',
        'Tension pneumothorax'
      ],
      recommended_followup: 'Size determines management - observation, aspiration, or chest tube placement.',
      case_examples: [
        {
          title: 'Spontaneous Pneumothorax in Young Adult',
          description: 'Often occurs in tall, thin males, may be associated with apical blebs.'
        },
        {
          title: 'Tension Pneumothorax',
          description: 'Medical emergency with mediastinal shift and hemodynamic compromise, requires immediate decompression.'
        }
      ]
    },
    {
      id: 'consolidation',
      name: 'Consolidation',
      icon: <FaLungs />,
      description: 'Alveolar air spaces filled with fluid or cells, creating a solid appearance on X-rays.',
      features: 'Homogeneous opacity with air bronchograms. May obscure vessels and heart borders if extensive.',
      significance: 'Common in pneumonia, pulmonary edema, and hemorrhage. Pattern and distribution help determine cause.',
      prevalence: 16.8,
      difficulty_level: 'beginner',
      key_diagnostic_features: [
        'Opacification of airspaces',
        'Air bronchograms',
        'Silhouette sign (loss of border visibility when adjacent structures have similar density)',
        'May be lobar, segmental, or patchy'
      ],
      differential_diagnosis: [
        'Bacterial pneumonia',
        'Organizing pneumonia',
        'Pulmonary edema',
        'Hemorrhage',
        'Radiation pneumonitis'
      ],
      recommended_followup: 'Depends on suspected etiology - antibiotics for infection, diuretics for edema, etc.',
      case_examples: [
        {
          title: 'Lobar Pneumonia',
          description: 'Classic bacterial pneumonia affecting an entire lobe with homogeneous consolidation.'
        },
        {
          title: 'Aspiration Pneumonia',
          description: 'Often affects dependent portions of lungs, can be bilateral, common in patients with altered consciousness.'
        }
      ]
    },
    {
      id: 'edema',
      name: 'Edema',
      icon: <FaLungs />,
      description: 'Abnormal accumulation of fluid in lung tissues and air spaces due to heart failure or other causes.',
      features: 'Bilateral perihilar opacities, Kerley B lines, and possibly pleural effusions. Can show "bat wing" pattern.',
      significance: 'Often indicates heart failure but can occur with renal failure, ARDS, and other conditions. Usually requires diuretic therapy.',
      prevalence: 12.5,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Bilateral perihilar "bat wing" opacities',
        'Kerley B lines (horizontal lines in periphery)',
        'Peribronchial cuffing',
        'Pleural effusions (often bilateral)'
      ],
      differential_diagnosis: [
        'Cardiogenic vs non-cardiogenic edema',
        'ARDS',
        'Viral pneumonia',
        'Atypical infection'
      ],
      recommended_followup: 'Echocardiogram if cardiogenic cause suspected, treatment of underlying cause.',
      case_examples: [
        {
          title: 'Acute Pulmonary Edema',
          description: 'Rapid onset, often with clinical symptoms of respiratory distress. Responds quickly to diuretic therapy.'
        },
        {
          title: 'ARDS',
          description: 'Non-cardiogenic edema with diffuse bilateral infiltrates, often has more peripheral distribution than cardiogenic edema.'
        }
      ]
    },
    {
      id: 'emphysema',
      name: 'Emphysema',
      icon: <FaLungs />,
      description: 'Chronic condition where the alveoli are damaged and enlarged, leading to reduced gas exchange.',
      features: 'Hyperinflation, flattened diaphragms, increased retrosternal airspace, and bullae. Decreased lung markings.',
      significance: 'Part of COPD spectrum. Associated with smoking and alpha-1 antitrypsin deficiency. Progressive and irreversible.',
      prevalence: 11.2,
      difficulty_level: 'intermediate',
      key_diagnostic_features: [
        'Hyperinflation with flattened diaphragms',
        'Increased lung lucency',
        'Decreased vascular markings',
        'Possible bullae (especially in upper lobes)'
      ],
      differential_diagnosis: [
        'Chronic bronchitis',
        'Asthma (reversible air trapping)',
        'Bronchiectasis',
        'Cystic fibrosis'
      ],
      recommended_followup: 'Pulmonary function tests, smoking cessation counseling, bronchodilator therapy.',
      case_examples: [
        {
          title: 'Severe Centrilobular Emphysema',
          description: 'Upper lobe predominant disease with significant hyperinflation, common in smokers.'
        },
        {
          title: 'Alpha-1 Antitrypsin Deficiency',
          description: 'Typically presents with lower lobe predominant emphysema, often at younger age than smoking-related disease.'
        }
      ]
    },
    {
      id: 'fibrosis',
      name: 'Fibrosis',
      icon: <FaLungs />,
      description: 'Scarring of lung tissue leading to thickening and stiffness, reducing lung capacity.',
      features: 'Reticular opacities, honeycombing, traction bronchiectasis, and volume loss. Often peripheral and basal.',
      significance: 'Can result from various interstitial lung diseases. Progressive condition that may require lung transplantation in severe cases.',
      prevalence: 8.1,
      difficulty_level: 'advanced',
      key_diagnostic_features: [
        'Reticular (net-like) opacities',
        'Volume loss with architectural distortion',
        'Honeycombing in advanced cases',
        'Traction bronchiectasis'
      ],
      differential_diagnosis: [
        'Idiopathic pulmonary fibrosis',
        'Connective tissue disease-related ILD',
        'Hypersensitivity pneumonitis',
        'Radiation-induced fibrosis',
        'Asbestosis'
      ],
      recommended_followup: 'High-resolution CT scan, pulmonary function tests, possible lung biopsy.',
      case_examples: [
        {
          title: 'Idiopathic Pulmonary Fibrosis',
          description: 'Peripheral and basilar predominant fibrosis with honeycombing, poor prognosis.'
        },
        {
          title: 'Radiation-induced Fibrosis',
          description: 'Develops in shape of radiation port, does not cross midline, may be stable for years.'
        }
      ]
    },
    {
      id: 'pleural_thickening',
      name: 'Pleural Thickening',
      icon: <FaLungs />,
      description: 'Thickening of the pleural layer surrounding the lungs, often due to previous inflammation or infection.',
      features: 'Smooth or nodular pleural thickening, may be focal or diffuse. Can calcify after chronic inflammation.',
      significance: 'May be related to previous infection, asbestos exposure, or malignancy. Restrictive lung defect can occur if extensive.',
      prevalence: 9.3,
      difficulty_level: 'advanced',
      key_diagnostic_features: [
        'Linear opacity paralleling chest wall',
        'May be focal or diffuse',
        'Possible calcification',
        'Potential volume loss on affected side'
      ],
      differential_diagnosis: [
        'Mesothelioma',
        'Pleural metastases',
        'Empyema',
        'Prior hemorrhage',
        'Asbestos-related pleural disease'
      ],
      recommended_followup: 'CT scan to better characterize, especially if nodular or concerning for malignancy.',
      case_examples: [
        {
          title: 'Asbestos-Related Pleural Plaques',
          description: 'Characteristic calcified plaques, often along diaphragm and lateral chest wall.'
        },
        {
          title: 'Post-inflammatory Pleural Thickening',
          description: 'Often seen after resolved empyema or hemothorax, may cause chronic pain or restrictive defect.'
        }
      ]
    },
    {
      id: 'hernia',
      name: 'Hiatal Hernia',
      icon: <FaLungs />,
      description: 'Protrusion of abdominal contents, usually stomach, into the thoracic cavity through the diaphragmatic hiatus.',
      features: 'Retrocardiac mass or air-fluid level, may resemble a mass in the lower chest/mediastinum.',
      significance: 'Usually incidental but can cause reflux symptoms. Rarely, large hernias may compress adjacent lung tissue.',
      prevalence: 3.8,
      difficulty_level: 'advanced',
      key_diagnostic_features: [
        'Retrocardiac air-fluid level or soft tissue opacity',
        'Widened mediastinum at level of diaphragm',
        'May contain gastric air bubble above diaphragm',
        'Best seen on lateral view'
      ],
      differential_diagnosis: [
        'Pericardial cyst',
        'Foregut duplication cyst',
        'Esophageal dilation',
        'Mediastinal mass'
      ],
      recommended_followup: 'Usually requires no specific follow-up unless symptomatic.',
      case_examples: [
        {
          title: 'Large Paraesophageal Hernia',
          description: 'May present with significant displacement of gastric contents into thorax, can cause compressive symptoms.'
        },
        {
          title: 'Sliding Hiatal Hernia',
          description: 'Most common type, gastroesophageal junction temporarily slides above diaphragm.'
        }
      ]
    }
  ];
  
  // Generate random prevalence data on initial load
  useEffect(() => {
    const years = ['2020', '2021', '2022', '2023', '2024'];
    const newData = {};
    
    conditions.forEach(condition => {
      newData[condition.id] = years.map(year => ({
        year,
        value: condition.prevalence + (Math.random() * 10 - 5)
      }));
    });
    
    setPrevalenceData(newData);
  }, []);
  
  const handleConditionClick = (id) => {
    setActiveCondition(activeCondition === id ? null : id);
    
    // Scroll to the condition if it's not already in view
    if (activeCondition !== id && conditionRefs.current[id]) {
      conditionRefs.current[id].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };
  
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };
  
  const handleToggleComparison = () => {
    setShowComparison(!showComparison);
    if (!showComparison) {
      // Reset selected conditions when enabling comparison
      setCompareConditions([]);
    }
  };
  
  const handleCompareSelect = (id) => {
    // Toggle selection of condition for comparison
    if (compareConditions.includes(id)) {
      setCompareConditions(compareConditions.filter(condId => condId !== id));
    } else {
      // Only allow comparing up to 3 conditions
      if (compareConditions.length < 3) {
        setCompareConditions([...compareConditions, id]);
      }
    }
  };
  
  const filteredConditions = conditions.filter(condition => {
    // Apply text search filter
    const textMatch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      condition.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply difficulty filter
    const difficultyMatch = difficulty === 'all' || condition.difficulty_level === difficulty;
    
    return textMatch && difficultyMatch;
  });
  
  const getSelectedConditions = () => {
    return conditions.filter(cond => compareConditions.includes(cond.id));
  };
  
  return (
    <div className="chexnet-info-page">
      <div className="info-hero">
        <div className="container">
          <h1>Understanding CheXNet</h1>
          <p>Exploring the 14 chest X-ray pathologies detectable by the CheXNet deep learning model</p>
        </div>
      </div>
      
      <div className="container">
        <div className="info-controls">
          <div className="left-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input 
                type="text"
                placeholder="Search conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="difficulty-selector">
              <label>Difficulty: </label>
              <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
                className="difficulty-select"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <div className="right-controls">
            <button 
              className={`compare-button ${showComparison ? 'active' : ''}`}
              onClick={handleToggleComparison}
            >
              {showComparison ? 'Exit Comparison' : 'Compare Conditions'}
            </button>
            
            <div className="view-toggle">
              <button 
                className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <FaTh /> Grid
              </button>
              <button 
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <FaThList /> List
              </button>
            </div>
          </div>
        </div>
        
        {showComparison && (
          <div className="comparison-container">
            <div className="comparison-header">
              <h3>Condition Comparison</h3>
              <p>Select up to 3 conditions to compare</p>
            </div>
            
            {compareConditions.length === 0 ? (
              <div className="empty-comparison">
                <FaExclamationTriangle className="warning-icon" />
                <p>No conditions selected. Click on conditions below to add them to comparison.</p>
              </div>
            ) : (
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      {getSelectedConditions().map(condition => (
                        <th key={condition.id}>{condition.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Description</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>{condition.description}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Radiographic Features</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>{condition.features}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Key Diagnostic Features</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>
                          <ul>
                            {condition.key_diagnostic_features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Differential Diagnosis</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>
                          <ul>
                            {condition.differential_diagnosis.map((diagnosis, index) => (
                              <li key={index}>{diagnosis}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Recommended Follow-up</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>{condition.recommended_followup}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Prevalence</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id}>{condition.prevalence}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Difficulty Level</td>
                      {getSelectedConditions().map(condition => (
                        <td key={condition.id} className={`difficulty-cell ${condition.difficulty_level}`}>
                          {condition.difficulty_level.charAt(0).toUpperCase() + condition.difficulty_level.slice(1)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        <div className="model-info">
          <div className="info-icon">
            <FaInfoCircle />
          </div>
          <div className="info-text">
            <h3>About CheXNet</h3>
            <p>
              CheXNet is a 121-layer convolutional neural network trained on over 100,000 chest X-rays 
              from the ChestX-ray14 dataset. It can detect 14 different pathologies with accuracy 
              comparable to practicing radiologists. These 14 conditions are presented below with detailed 
              information to help understand their radiographic appearance and clinical significance.
            </p>
          </div>
        </div>
        
        <div className={`conditions-container ${viewMode}`}>
          {filteredConditions.length === 0 ? (
            <div className="no-results">
              <p>No conditions match your search. Try a different term.</p>
            </div>
          ) : (
            filteredConditions.map((condition) => (
              <div 
                key={condition.id}
                className={`condition-card ${activeCondition === condition.id ? 'active' : ''} ${showComparison && compareConditions.includes(condition.id) ? 'selected-for-compare' : ''}`}
                onClick={() => showComparison ? handleCompareSelect(condition.id) : handleConditionClick(condition.id)}
                ref={el => conditionRefs.current[condition.id] = el}
              >
                <div className="condition-header">
                  <div className="condition-icon">
                    {condition.icon}
                  </div>
                  <h3>{condition.name}</h3>
                  <div className={`difficulty-badge ${condition.difficulty_level}`}>
                    {condition.difficulty_level}
                  </div>
                  {!showComparison && (
                    <span className="expand-icon">
                      {activeCondition === condition.id ? '−' : '+'}
                    </span>
                  )}
                  {showComparison && (
                    <div className="compare-checkbox">
                      <input 
                        type="checkbox" 
                        checked={compareConditions.includes(condition.id)} 
                        onChange={() => handleCompareSelect(condition.id)}
                        onClick={e => e.stopPropagation()}
                      />
                    </div>
                  )}
                </div>
                
                {activeCondition === condition.id && !showComparison && (
                  <div className="condition-details">
                    <div className="condition-tabs">
                      <button 
                        className={`condition-tab ${selectedTab === 'description' ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); handleTabChange('description');}}
                      >
                        <FaInfoCircle /> Overview
                      </button>
                      <button 
                        className={`condition-tab ${selectedTab === 'diagnostic' ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); handleTabChange('diagnostic');}}
                      >
                        <FaNotesMedical /> Diagnosis
                      </button>
                      <button 
                        className={`condition-tab ${selectedTab === 'clinical' ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); handleTabChange('clinical');}}
                      >
                        <FaUserMd /> Clinical
                      </button>
                      <button 
                        className={`condition-tab ${selectedTab === 'cases' ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); handleTabChange('cases');}}
                      >
                        <FaBookMedical /> Cases
                      </button>
                      <button 
                        className={`condition-tab ${selectedTab === 'trends' ? 'active' : ''}`}
                        onClick={(e) => {e.stopPropagation(); handleTabChange('trends');}}
                      >
                        <FaChartLine /> Trends
                      </button>
                    </div>
                    
                    <div className="tab-content">
                      {selectedTab === 'description' && (
                        <div className="description-tab">
                          <div className="detail-section">
                            <h4>Description</h4>
                            <p>{condition.description}</p>
                          </div>
                          
                          <div className="detail-section">
                            <h4>Radiographic Features</h4>
                            <p>{condition.features}</p>
                          </div>
                          
                          <div className="detail-section">
                            <h4>Clinical Significance</h4>
                            <p>{condition.significance}</p>
                          </div>
                          
                          <div className="prevalence-indicator">
                            <span>Prevalence:</span>
                            <div className="prevalence-bar-container">
                              <div 
                                className="prevalence-bar" 
                                style={{width: `${Math.min(100, condition.prevalence * 3)}%`}}
                              ></div>
                            </div>
                            <span className="prevalence-value">{condition.prevalence}%</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedTab === 'diagnostic' && (
                        <div className="diagnostic-tab">
                          <div className="detail-section">
                            <h4>Key Diagnostic Features</h4>
                            <ul className="feature-list">
                              {condition.key_diagnostic_features.map((feature, index) => (
                                <li key={index} className="feature-item">
                                  <FaRegLightbulb className="feature-icon" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="detail-section">
                            <h4>Differential Diagnosis</h4>
                            <div className="differential-grid">
                              {condition.differential_diagnosis.map((diagnosis, index) => (
                                <div key={index} className="differential-item">
                                  {diagnosis}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedTab === 'clinical' && (
                        <div className="clinical-tab">
                          <div className="detail-section">
                            <h4>Recommended Follow-up</h4>
                            <div className="followup-box">
                              <FaUserMd className="followup-icon" />
                              <p>{condition.recommended_followup}</p>
                            </div>
                          </div>
                          
                          <div className="detail-section">
                            <h4>Diagnostic Challenge Level</h4>
                            <div className={`challenge-level ${condition.difficulty_level}`}>
                              <span className="challenge-label">Level:</span>
                              <span className="challenge-value">
                                {condition.difficulty_level.charAt(0).toUpperCase() + condition.difficulty_level.slice(1)}
                              </span>
                              <div className="challenge-meter">
                                <div className={`challenge-fill ${condition.difficulty_level}`} style={{
                                  width: condition.difficulty_level === 'beginner' ? '33%' : 
                                         condition.difficulty_level === 'intermediate' ? '66%' : '100%'
                                }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedTab === 'cases' && (
                        <div className="cases-tab">
                          <div className="detail-section">
                            <h4>Case Examples</h4>
                            <div className="cases-list">
                              {condition.case_examples.map((caseExample, index) => (
                                <div key={index} className="case-item">
                                  <h5>{caseExample.title}</h5>
                                  <p>{caseExample.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedTab === 'trends' && (
                        <div className="trends-tab">
                          <div className="detail-section">
                            <h4>Prevalence Trends (2020-2024)</h4>
                            <div className="trend-chart">
                              <div className="y-axis">
                                <span>30%</span>
                                <span>20%</span>
                                <span>10%</span>
                                <span>0%</span>
                              </div>
                              <div className="chart-bars">
                                {prevalenceData[condition.id]?.map((dataPoint, index) => (
                                  <div key={index} className="chart-bar-container">
                                    <div 
                                      className="chart-bar"
                                      style={{height: `${Math.min(100, dataPoint.value * 3.3)}%`}}
                                    ></div>
                                    <span className="year-label">{dataPoint.year}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="trend-note">
                              <strong>Note:</strong> This prevalence data is simulated for educational purposes.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        
        <div className="info-footer">
          <div className="disclaimer">
            <p><strong>Note:</strong> This information is provided for educational purposes only and should not be used for diagnosis.</p>
          </div>
          <Link to="/dashboard" className="try-button">
            Try the Image Analysis Tool <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChexnetInfoPage;