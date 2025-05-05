import React, { useState } from 'react';

const SocialEngineeringSimulator = () => {
  const [campaignName, setCampaignName] = useState('');
  const [targetAudience, setTargetAudience] = useState('corporate');
  const [attackType, setAttackType] = useState('phishing');
  const [customizationLevel, setCustomizationLevel] = useState('medium');
  const [templates, setTemplates] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState(null);
  const [simulationLogs, setSimulationLogs] = useState([]);

  // Predefined email templates
  const emailTemplates = {
    corporate: [
      { id: 1, name: 'IT Password Reset', successRate: '68%' },
      { id: 2, name: 'Urgent CEO Request', successRate: '72%' },
      { id: 3, name: 'HR Document Review', successRate: '65%' },
      { id: 4, name: 'Company Benefits Update', successRate: '59%' },
    ],
    personal: [
      { id: 5, name: 'Bank Account Alert', successRate: '74%' },
      { id: 6, name: 'Package Delivery Notice', successRate: '70%' },
      { id: 7, name: 'Tax Refund Notification', successRate: '67%' },
      { id: 8, name: 'Social Media Security Alert', successRate: '63%' },
    ],
    government: [
      { id: 9, name: 'Tax Authority Notice', successRate: '76%' },
      { id: 10, name: 'Court Appearance Notification', successRate: '79%' },
      { id: 11, name: 'Government Benefits Update', successRate: '71%' },
      { id: 12, name: 'Voter Registration Confirmation', successRate: '64%' },
    ],
  };

  // Attack types with descriptions
  const attackTypes = [
    { value: 'phishing', label: 'Phishing Email Campaign', description: 'Create deceptive emails that mimic legitimate organizations to steal credentials or personal information.' },
    { value: 'spear-phishing', label: 'Spear Phishing', description: 'Targeted phishing attacks customized for specific individuals using personal information.' },
    { value: 'vishing', label: 'Voice Phishing (Vishing)', description: 'Simulate voice call scripts that trick targets into revealing sensitive information.' },
    { value: 'smishing', label: 'SMS Phishing (Smishing)', description: 'Create fraudulent text messages with malicious links or requests for information.' },
    { value: 'pretexting', label: 'Pretexting Scenarios', description: 'Develop fictional scenarios to build trust and extract information from targets.' },
  ];

  // Load templates when target audience changes
  const handleAudienceChange = (e) => {
    setTargetAudience(e.target.value);
    setTemplates(emailTemplates[e.target.value] || []);
  };

  // Start simulation
  const startSimulation = () => {
    if (!campaignName) {
      alert('Please enter a campaign name');
      return;
    }

    setIsSimulating(true);
    setSimulationLogs([]);
    
    // Add initial log
    addSimulationLog(`Starting ${attackType} simulation campaign: ${campaignName}`);
    
    // Simulate the attack process with realistic logs
    simulateAttackProcess();
  };

  // Add a log entry with timestamp
  const addSimulationLog = (message) => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setSimulationLogs(prevLogs => [...prevLogs, { timestamp, message }]);
  };

  // Simulate the attack process with realistic steps and timing
  const simulateAttackProcess = () => {
    // Step 1: Campaign setup
    addSimulationLog('Initializing campaign parameters and target profiles');
    
    setTimeout(() => {
      addSimulationLog('Generating customized attack vectors based on target audience profile');
      
      // Step 2: Template customization
      setTimeout(() => {
        addSimulationLog(`Applying ${customizationLevel} customization level to templates`);
        
        // Step 3: Deployment simulation
        setTimeout(() => {
          addSimulationLog('Simulating deployment to target audience');
          
          // Step 4: Response tracking
          setTimeout(() => {
            addSimulationLog('Tracking target responses and interaction patterns');
            
            // Step 5: Results compilation
            setTimeout(() => {
              const successRate = Math.floor(40 + Math.random() * 45); // Random success rate between 40-85%
              const clickRate = Math.floor(30 + Math.random() * 50); // Random click rate between 30-80%
              const dataSubmissionRate = Math.floor(20 + Math.random() * 40); // Random submission rate between 20-60%
              
              addSimulationLog('Compiling simulation results and vulnerability statistics');
              
              // Generate final results
              setSimulationResults({
                campaignName,
                targetAudience,
                attackType,
                successRate: `${successRate}%`,
                clickRate: `${clickRate}%`,
                dataSubmissionRate: `${dataSubmissionRate}%`,
                vulnerabilityScore: Math.floor(successRate * 0.8), // Calculate vulnerability score
                completedAt: new Date().toLocaleString(),
                recommendations: generateRecommendations(successRate),
              });
              
              setIsSimulating(false);
            }, 2000);
          }, 2000);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  // Generate recommendations based on success rate
  const generateRecommendations = (successRate) => {
    if (successRate > 70) {
      return [
        'Implement urgent security awareness training for all personnel',
        'Deploy advanced email filtering and verification systems',
        'Establish strict verification protocols for sensitive requests',
        'Conduct regular phishing simulations to improve awareness'
      ];
    } else if (successRate > 50) {
      return [
        'Enhance existing security awareness training program',
        'Improve email security filtering rules',
        'Implement two-factor authentication for all accounts',
        'Develop clear procedures for verifying unusual requests'
      ];
    } else {
      return [
        'Continue regular security awareness refresher courses',
        'Maintain current email security measures',
        'Conduct periodic phishing tests to ensure continued vigilance',
        'Review and update security policies annually'
      ];
    }
  };

  // Reset the simulation
  const resetSimulation = () => {
    setSimulationResults(null);
    setSimulationLogs([]);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Social Engineering Simulator</h2>
      <p className="text-gray-400 mb-6">
        Create realistic social engineering attack simulations to test security awareness and identify human vulnerabilities in your organization.
      </p>

      {!simulationResults ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Campaign Configuration */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Campaign Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Target Audience</label>
                <select
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  value={targetAudience}
                  onChange={handleAudienceChange}
                >
                  <option value="corporate">Corporate Employees</option>
                  <option value="personal">Personal/Consumer</option>
                  <option value="government">Government Personnel</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Attack Type</label>
                <select
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  value={attackType}
                  onChange={(e) => setAttackType(e.target.value)}
                >
                  {attackTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {attackTypes.find(t => t.value === attackType)?.description}
                </p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Customization Level</label>
                <select
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                  value={customizationLevel}
                  onChange={(e) => setCustomizationLevel(e.target.value)}
                >
                  <option value="low">Low - Generic templates</option>
                  <option value="medium">Medium - Some personalization</option>
                  <option value="high">High - Highly targeted content</option>
                </select>
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <label className="block text-gray-300 mb-2">Available Templates</label>
              <div className="bg-gray-800 border border-gray-700 rounded p-4 h-64 overflow-y-auto">
                {templates.length > 0 ? (
                  <div className="space-y-3">
                    {templates.map(template => (
                      <div key={template.id} className="flex items-center p-2 hover:bg-gray-700 rounded">
                        <input
                          type="radio"
                          name="template"
                          id={`template-${template.id}`}
                          className="mr-2"
                        />
                        <label htmlFor={`template-${template.id}`} className="flex-1 cursor-pointer">
                          <div className="text-white">{template.name}</div>
                          <div className="text-sm text-gray-400">Historical success rate: {template.successRate}</div>
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center mt-10">Select a target audience to view available templates</p>
                )}
              </div>
            </div>
          </div>

          {/* Attack Type Description */}
          <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Attack Method: {attackTypes.find(t => t.value === attackType)?.label}</h3>
            <p className="text-gray-400">{attackTypes.find(t => t.value === attackType)?.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              onClick={() => {
                setCampaignName('');
                setTargetAudience('corporate');
                setAttackType('phishing');
                setCustomizationLevel('medium');
              }}
            >
              Reset Form
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center"
              onClick={startSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Simulating...
                </>
              ) : (
                'Start Simulation'
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Simulation Results */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-700 px-4 py-3">
              <h3 className="text-xl font-semibold text-white">Simulation Results</h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-400">Campaign Name:</p>
                  <p className="text-white font-medium">{simulationResults.campaignName}</p>
                </div>
                <div>
                  <p className="text-gray-400">Completed At:</p>
                  <p className="text-white font-medium">{simulationResults.completedAt}</p>
                </div>
                <div>
                  <p className="text-gray-400">Target Audience:</p>
                  <p className="text-white font-medium">
                    {targetAudience === 'corporate' ? 'Corporate Employees' : 
                     targetAudience === 'personal' ? 'Personal/Consumer' : 'Government Personnel'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Attack Type:</p>
                  <p className="text-white font-medium">{attackTypes.find(t => t.value === attackType)?.label}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-red-500">{simulationResults.successRate}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Click Rate</p>
                  <p className="text-2xl font-bold text-yellow-500">{simulationResults.clickRate}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Data Submission</p>
                  <p className="text-2xl font-bold text-orange-500">{simulationResults.dataSubmissionRate}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">Vulnerability Score</h4>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${simulationResults.vulnerabilityScore > 70 ? 'bg-red-500' : simulationResults.vulnerabilityScore > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${simulationResults.vulnerabilityScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low Risk</span>
                  <span>Medium Risk</span>
                  <span>High Risk</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-300">
                  {simulationResults.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Simulation Logs */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="bg-gray-700 px-4 py-3 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Simulation Logs</h3>
              <span className="text-xs text-gray-400">{simulationLogs.length} entries</span>
            </div>
            <div className="p-2 max-h-60 overflow-y-auto font-mono text-sm">
              {simulationLogs.map((log, index) => (
                <div key={index} className="py-1 px-2 hover:bg-gray-700">
                  <span className="text-gray-500">[{log.timestamp}]</span>{' '}
                  <span className="text-gray-300">{log.message}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
              onClick={resetSimulation}
            >
              Run New Simulation
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              onClick={() => {
                // Export functionality would go here
                alert('Report exported successfully!');
              }}
            >
              Export Report
            </button>
          </div>
        </div>
      )}

      {/* Legal Disclaimer */}
      <div className="mt-8 pt-4 border-t border-gray-800">
        <p className="text-xs text-gray-500">
          <strong>Legal Disclaimer:</strong> This tool is provided for educational and authorized security testing purposes only. 
          Always obtain proper authorization before conducting any social engineering simulations. Unauthorized testing may violate 
          applicable laws and regulations.
        </p>
      </div>
    </div>
  );
};

export default SocialEngineeringSimulator;