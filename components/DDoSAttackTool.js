import React, { useState, useEffect } from 'react';

const DDoSAttackTool = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [attackMethod, setAttackMethod] = useState('http-flood');
  const [threads, setThreads] = useState(10);
  const [duration, setDuration] = useState(60);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackStatus, setAttackStatus] = useState(null);
  const [attackStats, setAttackStats] = useState({
    requestsSent: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0,
    targetStatus: 'Unknown'
  });
  const [logs, setLogs] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [showWarning, setShowWarning] = useState(true);
  const [confirmedLegal, setConfirmedLegal] = useState(false);

  // Attack methods with descriptions
  const attackMethods = [
    { id: 'http-flood', name: 'HTTP Flood', description: 'Overwhelms target with HTTP GET/POST requests' },
    { id: 'syn-flood', name: 'SYN Flood', description: 'Sends TCP SYN packets without completing handshake' },
    { id: 'udp-flood', name: 'UDP Flood', description: 'Floods target with UDP packets to random ports' },
    { id: 'slowloris', name: 'Slowloris', description: 'Keeps connections open by sending partial HTTP requests' },
    { id: 'dns-amplification', name: 'DNS Amplification', description: 'Uses DNS servers to amplify attack traffic' }
  ];

  // Update countdown timer
  useEffect(() => {
    let timer;
    if (isAttacking && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        
        // Simulate attack statistics updates
        updateAttackStats();
        
        // Add log entry every few seconds
        if (countdown % 5 === 0 || countdown <= 10) {
          addLogEntry(`Attack in progress - ${countdown}s remaining`);
        }
      }, 1000);
    } else if (isAttacking && countdown === 0) {
      stopAttack();
    }
    
    return () => clearTimeout(timer);
  }, [isAttacking, countdown]);

  // Simulate updating attack statistics
  const updateAttackStats = () => {
    const newRequestsSent = attackStats.requestsSent + Math.floor(Math.random() * threads * 10);
    const newSuccessful = Math.floor(newRequestsSent * (0.7 + Math.random() * 0.2)); // 70-90% success rate
    const newFailed = newRequestsSent - newSuccessful;
    
    setAttackStats({
      requestsSent: newRequestsSent,
      successfulRequests: newSuccessful,
      failedRequests: newFailed,
      averageResponseTime: Math.floor(100 + Math.random() * 900), // 100-1000ms
      targetStatus: Math.random() > 0.7 ? 'Degraded' : 'Online' // Simulate target status changes
    });
  };

  // Add a log entry with timestamp
  const addLogEntry = (message) => {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    setLogs(prevLogs => [{ timestamp, message }, ...prevLogs].slice(0, 100)); // Keep last 100 logs
  };

  // Start the attack
  const startAttack = () => {
    if (!targetUrl || !confirmedLegal) return;
    
    setIsAttacking(true);
    setAttackStatus('initializing');
    setCountdown(duration);
    setAttackStats({
      requestsSent: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      targetStatus: 'Online'
    });
    
    // Clear previous logs
    setLogs([]);
    
    // Add initial log entries
    addLogEntry(`Attack initiated against ${targetUrl}`);
    addLogEntry(`Using method: ${attackMethod}`);
    addLogEntry(`Threads: ${threads}, Duration: ${duration}s`);
    
    // Simulate initialization phase
    setTimeout(() => {
      setAttackStatus('running');
      addLogEntry('Attack is now running at full capacity');
    }, 2000);
  };

  // Stop the attack
  const stopAttack = () => {
    setIsAttacking(false);
    setAttackStatus('stopped');
    setCountdown(0);
    addLogEntry('Attack stopped');
    
    // Simulate final status
    if (attackStats.targetStatus === 'Degraded') {
      addLogEntry('Target service was successfully degraded');
    } else {
      addLogEntry('Target remained stable throughout the attack');
    }
  };

  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
        DDoS Attack Simulator
      </h2>
      
      {/* Legal Warning */}
      {showWarning && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Legal Warning</h3>
              <p className="text-gray-300 mb-3">
                This tool is provided for educational and authorized security testing purposes only. Unauthorized DDoS attacks are illegal and unethical.
                Only use this tool against systems you own or have explicit permission to test.
              </p>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="legal-confirmation" 
                  checked={confirmedLegal}
                  onChange={() => setConfirmedLegal(!confirmedLegal)}
                  className="mr-2"
                />
                <label htmlFor="legal-confirmation" className="text-gray-300 text-sm">
                  I confirm I will only use this tool for legal and authorized testing
                </label>
              </div>
              <div className="mt-3 flex justify-end">
                <button 
                  onClick={() => setShowWarning(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Attack Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Target URL</label>
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-accent"
                disabled={isAttacking}
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Attack Method</label>
              <select
                value={attackMethod}
                onChange={(e) => setAttackMethod(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-accent"
                disabled={isAttacking}
              >
                {attackMethods.map(method => (
                  <option key={method.id} value={method.id}>{method.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                {attackMethods.find(m => m.id === attackMethod)?.description}
              </p>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Threads</label>
              <input
                type="range"
                min="1"
                max="100"
                value={threads}
                onChange={(e) => setThreads(parseInt(e.target.value))}
                className="w-full"
                disabled={isAttacking}
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1</span>
                <span>{threads}</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Duration (seconds)</label>
              <input
                type="number"
                min="5"
                max="300"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-accent"
                disabled={isAttacking}
              />
            </div>
            
            <div className="pt-4">
              {!isAttacking ? (
                <button
                  onClick={startAttack}
                  disabled={!targetUrl || !confirmedLegal}
                  className={`w-full py-2 px-4 rounded font-medium ${!targetUrl || !confirmedLegal ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600 text-white'}`}
                >
                  Start Attack
                </button>
              ) : (
                <button
                  onClick={stopAttack}
                  className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded font-medium"
                >
                  Stop Attack
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Attack Status and Statistics */}
        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-4">
          {/* Status Indicator */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Attack Status</h3>
            {isAttacking && (
              <div className="flex items-center">
                <div className="animate-pulse w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-red-400 font-medium">ATTACK IN PROGRESS</span>
                <span className="ml-3 text-gray-400">{countdown}s remaining</span>
              </div>
            )}
          </div>
          
          {/* Attack Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Requests Sent</div>
              <div className="text-xl font-bold text-white">{formatNumber(attackStats.requestsSent)}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Success Rate</div>
              <div className="text-xl font-bold text-green-500">
                {attackStats.requestsSent > 0 ? Math.round((attackStats.successfulRequests / attackStats.requestsSent) * 100) : 0}%
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Avg Response</div>
              <div className="text-xl font-bold text-white">{attackStats.averageResponseTime} ms</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="text-gray-400 text-sm mb-1">Target Status</div>
              <div className={`text-xl font-bold ${attackStats.targetStatus === 'Degraded' ? 'text-yellow-500' : 'text-green-500'}`}>
                {attackStats.targetStatus}
              </div>
            </div>
          </div>
          
          {/* Attack Method Info */}
          {attackMethod && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-white mb-2">{attackMethods.find(m => m.id === attackMethod)?.name} Attack</h4>
              <p className="text-gray-400 text-sm">
                {attackMethods.find(m => m.id === attackMethod)?.description}. 
                {attackMethod === 'http-flood' && ' This method sends a large number of HTTP requests to overwhelm the target server\'s resources.'}
                {attackMethod === 'syn-flood' && ' This attack exploits the TCP handshake process by sending SYN packets without completing the connection.'}
                {attackMethod === 'slowloris' && ' This technique keeps connections open for as long as possible by sending partial HTTP requests, eventually exceeding the server\'s connection pool.'}
              </p>
            </div>
          )}
          
          {/* Attack Logs */}
          <div>
            <h4 className="font-medium text-white mb-2">Attack Logs</h4>
            <div className="bg-black rounded-lg p-2 h-48 overflow-y-auto font-mono text-xs">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-500">[{log.timestamp}]</span> <span className="text-green-400">{log.message}</span>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">No logs yet. Start an attack to see activity.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DDoSAttackTool;