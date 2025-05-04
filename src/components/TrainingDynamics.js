import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrainingDynamics = () => {
  const [chartType, setChartType] = useState('loss');
  
  // Simulated training dynamics based on code analysis and updated BLEU scores
  const data = Array.from({ length: 30 }, (_, i) => {
    // Epoch number
    const epoch = i + 1;
    
    // Method 1 (ChexNet) - starts with higher loss but converges well
    const method1Loss = 3.5 * Math.exp(-0.12 * epoch) + 0.8;
    const method1Bleu = 0.08 + 0.23 * (1 - Math.exp(-0.15 * epoch));
    
    // Method 2 (Inception) - updated to reflect the new BLEU-1 score
    const method2Loss = 3.8 * Math.exp(-0.08 * epoch) + 1.1;
    const method2Bleu = 0.05 + 0.17 * (1 - Math.exp(-0.10 * epoch));
    
    // Method 3 (ResNet18) - updated to reflect the new BLEU-1 score
    const method3Loss = 3.2 * Math.exp(-0.15 * epoch) + 0.9;
    const method3Bleu = 0.04 + 0.17 * (1 - Math.exp(-0.2 * epoch));
    
    return {
      epoch,
      method1Loss: epoch <= 20 ? method1Loss : null, // Method 1 trained for 20 epochs
      method2Loss: epoch <= 30 ? method2Loss : null, // Method 2 trained for 30 epochs
      method3Loss: epoch <= 15 ? method3Loss : null, // Method 3 trained for 15 epochs
      method1Bleu: epoch <= 20 ? method1Bleu : null,
      method2Bleu: epoch <= 30 ? method2Bleu : null,
      method3Bleu: epoch <= 15 ? method3Bleu : null,
    };
  });

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex justify-center space-x-4 mb-2">
        <button 
          className={`px-4 py-2 rounded-md ${chartType === 'loss' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setChartType('loss')}
        >
          Training Loss
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${chartType === 'bleu' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setChartType('bleu')}
        >
          BLEU-1 Score
        </button>
      </div>
      
      {chartType === 'loss' ? (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">Training Loss Comparison</h3>
          <div className="h-64 w-full bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'Loss', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="method1Loss" stroke="#8884d8" name="Method 1 (ChexNet)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="method2Loss" stroke="#82ca9d" name="Method 2 (Inception)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="method3Loss" stroke="#ffc658" name="Method 3 (ResNet18)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-center">BLEU-1 Score Progression</h3>
          <div className="h-64 w-full bg-white p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" label={{ value: 'Epoch', position: 'insideBottomRight', offset: -5 }} />
                <YAxis label={{ value: 'BLEU-1', angle: -90, position: 'insideLeft' }} domain={[0, 0.35]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="method1Bleu" stroke="#8884d8" name="Method 1 (ChexNet)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="method2Bleu" stroke="#82ca9d" name="Method 2 (Inception)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="method3Bleu" stroke="#ffc658" name="Method 3 (ResNet18)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      
      <p className="text-sm text-gray-600 mt-2 text-center">
        Note: These curves represent simulated training dynamics based on code analysis and final reported metrics.
        Final BLEU-1 scores: ChexNet (0.3102), Inception ResNet (0.2163), ResNet18 (0.2104).
      </p>
    </div>
  );
};

export default TrainingDynamics;