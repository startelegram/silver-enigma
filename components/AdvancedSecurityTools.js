import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AdvancedSecurityTools = () => {
  const [activeTab, setActiveTab] = useState('simulation');
  const [simulationStatus, setSimulationStatus] = useState('idle'); // idle, running, completed
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [threatData, setThreatData] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [virtualEnvironments, setVirtualEnvironments] = useState([
    { id: 1, name: 'Web Application Environment', status: 'ready', complexity: 'medium' },
    { id: 2, name: 'Network Infrastructure', status: 'ready', complexity: 'high' },
    { id: 3, name: 'IoT Device Network', status: 'ready', complexity: 'medium' },
    { id: 4, name: 'Cloud Infrastructure', status: 'ready', complexity: 'high' },
  ]);
  
  const securityTools = [
    {
      id: 1,
      name: 'Advanced Vulnerability Scanner',
      description: 'Comprehensive scanner that identifies vulnerabilities in web applications, networks, and systems with detailed remediation advice.',
      category: 'Scanning',
      complexity: 'Medium',
      icon: 'search'
    },
    {
      id: 2,
      name: 'Exploit Development Framework',
      description: 'Framework for developing and testing custom exploits in a controlled environment.',
      category: 'Exploitation',
      complexity: 'High',
      icon: 'code'
    },
    {
      id: 3,
      name: 'Network Traffic Analyzer',
      description: 'Advanced tool for analyzing network traffic patterns and identifying suspicious activities.',
      category: 'Analysis',
      complexity: 'Medium',
      icon: 'activity'
    },
    {
      id: 4,
      name: 'Secure Code Analyzer',
      description: 'Static and dynamic code analysis tool that identifies security vulnerabilities in source code.',
      category: 'Development',
      complexity: 'Medium',
      icon: 'shield'
    },
    {
      id: 5,
      name: 'Threat Intelligence Dashboard',
      description: 'Real-time dashboard displaying current threats and vulnerabilities from multiple intelligence sources.',
      category: 'Intelligence',
      complexity: 'Low',
      icon: 'alert-triangle'
    },
  ];

  // Simulated threat intelligence data
  useEffect(() => {
    // This would normally come from an API
    const mockThreatData = [
      { id: 1, type: 'Ransomware', severity: 'High', target: 'Healthcare', timestamp: new Date().toISOString() },
      { id: 2, type: 'SQL Injection', severity: 'Medium', target: 'E-commerce', timestamp: new Date().toISOString() },
      { id: 3, type: 'DDoS', severity: 'High', target: 'Financial', timestamp: new Date().toISOString() },
      { id: 4, type: 'Zero-day Exploit', severity: 'Critical', target: 'Government', timestamp: new Date().toISOString() },
      { id: 5, type: 'Phishing Campaign', severity: 'Medium', target: 'Education', timestamp: new Date().toISOString() },
    ];
    setThreatData(mockThreatData);
  }, []);

  const startSimulation = (environmentId) => {
    setSimulationStatus('running');
    setSimulationProgress(0);
    
    // Update the environment status
    setVirtualEnvironments(prev => 
      prev.map(env => 
        env.id === environmentId ? { ...env, status: 'running' } : env
      )
    );
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationStatus('completed');
          
          // Update the environment status back to ready
          setVirtualEnvironments(prev => 
            prev.map(env => 
              env.id === environmentId ? { ...env, status: 'ready' } : env
            )
          );
          
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 500);
  };

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  // Icon component based on name
  const Icon = ({ name, className }) => {
    switch (name) {
      case 'search':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        );
      case 'code':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case 'activity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        );
      case 'shield':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'alert-triangle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-800">
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'simulation' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('simulation')}
        >
          Security Simulation
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'tools' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('tools')}
        >
          Advanced Tools
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'intelligence' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('intelligence')}
        >
          Threat Intelligence
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'education' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('education')}
        >
          Educational Labs
        </button>
      </div>

      <div className="p-6">
        {/* Security Simulation Tab */}
        {activeTab === 'simulation' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Security Simulation Environment</h3>
            <p className="text-gray-400 mb-6">
              Practice security techniques in realistic virtual environments. Select an environment to start a simulation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {virtualEnvironments.map((env) => (
                <div key={env.id} className="bg-gray-800 border border-gray-700 rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-bold">{env.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${env.status === 'ready' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                      {env.status === 'ready' ? 'Ready' : 'Running'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">Complexity: {env.complexity}</p>
                  <button
                    onClick={() => startSimulation(env.id)}
                    disabled={env.status !== 'ready' || simulationStatus === 'running'}
                    className={`w-full py-2 rounded-md text-sm ${env.status === 'ready' && simulationStatus !== 'running' ? 'bg-accent hover:bg-accent-dark text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                  >
                    {env.status === 'ready' ? 'Start Simulation' : 'Simulation Running'}
                  </button>
                </div>
              ))}
            </div>
            
            {simulationStatus === 'running' && (
              <div className="bg-gray-800 border border-gray-700 rounded-md p-4 mb-4">
                <h4 className="text-white font-bold mb-2">Simulation in Progress</h4>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                  <div className="bg-accent h-2.5 rounded-full" style={{ width: `${simulationProgress}%` }}></div>
                </div>
                <p className="text-gray-400 text-sm">{simulationProgress}% complete</p>
              </div>
            )}
            
            {simulationStatus === 'completed' && (
              <div className="bg-green-900/20 border border-green-700 rounded-md p-4">
                <h4 className="text-green-400 font-bold mb-2">Simulation Completed</h4>
                <p className="text-gray-300 text-sm">The security simulation has been completed successfully. View the results in the report section.</p>
                <button className="mt-3 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  View Detailed Report
                </button>
              </div>
            )}
          </div>
        )}

        {/* Advanced Tools Tab */}
        {activeTab === 'tools' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Advanced Security Tools</h3>
            <p className="text-gray-400 mb-6">
              Specialized tools for security professionals. Select a tool to view details and launch it.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {securityTools.map((tool) => (
                <div 
                  key={tool.id} 
                  className={`bg-gray-800 border border-gray-700 rounded-md p-4 cursor-pointer transition-colors ${selectedTool?.id === tool.id ? 'border-accent' : 'hover:border-gray-600'}`}
                  onClick={() => handleToolSelect(tool)}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-gray-700 p-2 rounded-md mr-3">
                      <Icon name={tool.icon} className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="text-white font-bold">{tool.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{tool.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Category: {tool.category}</span>
                    <span className="text-gray-500">Complexity: {tool.complexity}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedTool && (
              <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                <h4 className="text-white font-bold mb-3">{selectedTool.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{selectedTool.description}</p>
                <div className="flex space-x-3">
                  <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm transition-colors">
                    Launch Tool
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Threat Intelligence Tab */}
        {activeTab === 'intelligence' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Threat Intelligence Dashboard</h3>
            <p className="text-gray-400 mb-6">
              Real-time threat intelligence from multiple sources. Stay informed about the latest security threats.
            </p>
            
            <div className="bg-gray-800 border border-gray-700 rounded-md p-4 mb-6">
              <h4 className="text-white font-bold mb-3">Current Threat Landscape</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-900">
                    <tr>
                      <th scope="col" className="px-4 py-3">Threat Type</th>
                      <th scope="col" className="px-4 py-3">Severity</th>
                      <th scope="col" className="px-4 py-3">Target Sector</th>
                      <th scope="col" className="px-4 py-3">Timestamp</th>
                      <th scope="col" className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {threatData.map((threat) => (
                      <tr key={threat.id} className="border-b border-gray-700">
                        <td className="px-4 py-3 text-white">{threat.type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${threat.severity === 'Critical' ? 'bg-red-900/30 text-red-400' : threat.severity === 'High' ? 'bg-orange-900/30 text-orange-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                            {threat.severity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400">{threat.target}</td>
                        <td className="px-4 py-3 text-gray-400">{new Date(threat.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button className="text-accent hover:text-accent-dark text-xs">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                <h4 className="text-white font-bold mb-3">Threat Distribution</h4>
                <div className="h-48 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Interactive threat distribution chart would appear here</p>
                </div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                <h4 className="text-white font-bold mb-3">Geographic Impact</h4>
                <div className="h-48 flex items-center justify-center">
                  <p className="text-gray-400 text-sm">Interactive geographic impact map would appear here</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Educational Labs Tab */}
        {activeTab === 'education' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Educational Security Labs</h3>
            <p className="text-gray-400 mb-6">
              Interactive learning environments for developing and testing security skills. Complete challenges to earn certifications.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 border-b border-gray-700">
                  <h4 className="text-white font-bold">Web Application Security</h4>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">Learn to identify and exploit common web vulnerabilities including XSS, CSRF, SQL Injection, and more.</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>10 Modules</span>
                    <span>Difficulty: Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Progress: 30%</span>
                    <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-xs transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-4 border-b border-gray-700">
                  <h4 className="text-white font-bold">Network Penetration Testing</h4>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">Master the techniques for network reconnaissance, scanning, exploitation, and post-exploitation.</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>8 Modules</span>
                    <span>Difficulty: Advanced</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Progress: 15%</span>
                    <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-xs transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-900/30 to-teal-900/30 p-4 border-b border-gray-700">
                  <h4 className="text-white font-bold">Malware Analysis</h4>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">Learn techniques for analyzing malicious software, understanding its behavior, and developing countermeasures.</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>12 Modules</span>
                    <span>Difficulty: Advanced</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Not Started</span>
                    <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-xs transition-colors">
                      Start
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 border-b border-gray-700">
                  <h4 className="text-white font-bold">Cryptography Fundamentals</h4>
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm mb-4">Understand encryption algorithms, cryptographic protocols, and how to implement secure communications.</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <span>6 Modules</span>
                    <span>Difficulty: Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Progress: 50%</span>
                    <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-md text-xs transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
              <h4 className="text-white font-bold mb-3">Weekly Security Challenge</h4>
              <p className="text-gray-400 text-sm mb-4">Test your skills with our weekly security challenge. Solve the challenge to earn points and climb the leaderboard.</p>
              <div className="bg-gray-900 p-4 rounded-md mb-4">
                <h5 className="text-white font-medium mb-2">Current Challenge: Secure Code Review</h5>
                <p className="text-gray-400 text-sm mb-3">Identify and fix security vulnerabilities in the provided code snippet. Focus on input validation, authentication, and access control issues.</p>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">Difficulty: Medium</span>
                  <span className="text-xs text-gray-500">Ends in: 3 days</span>
                </div>
              </div>
              <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm transition-colors">
                Start Challenge
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSecurityTools;