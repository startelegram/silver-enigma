import React, { useState, useEffect } from 'react';

const DarkWebInterface = () => {
  const [terminalMode, setTerminalMode] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [secretSymbols, setSecretSymbols] = useState(false);
  
  // Available commands
  const commands = {
    help: 'Display available commands',
    clear: 'Clear terminal history',
    scan: 'Scan for vulnerabilities',
    connect: 'Connect to hidden service',
    encrypt: 'Encrypt a message',
    decrypt: 'Decrypt a message',
    exit: 'Exit terminal mode'
  };

  // Handle command execution
  const executeCommand = (cmd) => {
    const cmdLower = cmd.toLowerCase().trim();
    let response = '';
    
    switch(cmdLower) {
      case 'help':
        response = 'Available commands:\n' + 
          Object.entries(commands).map(([cmd, desc]) => `  ${cmd} - ${desc}`).join('\n');
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      case 'scan':
        response = 'Scanning for vulnerabilities...\n[+] Port scanning...\n[+] Service enumeration...\n[+] Vulnerability assessment...\n[+] Scan complete. 3 potential vulnerabilities found.';
        break;
      case 'connect':
        response = 'Establishing secure connection to hidden service...\n[+] Routing through Tor network...\n[+] Connection established. You are now connected to the hidden service.';
        break;
      case 'encrypt':
        response = 'Enter message to encrypt: [PLACEHOLDER]\nEncrypted message: U2FsdGVkX1+9UJxVzzzzzz9Zg0+1qTKLZr0PML9S+0M=';
        break;
      case 'decrypt':
        response = 'Enter encrypted message: [PLACEHOLDER]\nDecrypted message: The quick brown fox jumps over the lazy dog';
        break;
      case 'exit':
        setTerminalMode(false);
        response = 'Exiting terminal mode...';
        break;
      default:
        if (cmdLower === '') return;
        response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    // Add command and response to history
    setCommandHistory(prev => [...prev, 
      { type: 'command', content: cmd },
      { type: 'response', content: response }
    ]);
  };

  // Handle command input
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    executeCommand(commandInput);
    setCommandInput('');
  };

  // Trigger glitch effect
  const triggerGlitch = () => {
    setGlitchEffect(true);
    setTimeout(() => setGlitchEffect(false), 1000);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Dark Web Interface</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setSecretSymbols(!secretSymbols)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            {secretSymbols ? 'Hide Symbols' : 'Show Symbols'}
          </button>
          <button
            onClick={() => setTerminalMode(!terminalMode)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            {terminalMode ? 'Exit Terminal' : 'Terminal Mode'}
          </button>
          <button
            onClick={triggerGlitch}
            className="bg-purple-900 hover:bg-purple-800 text-white px-3 py-1 rounded transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Glitch Effect
          </button>
        </div>
      </div>

      {/* Terminal Mode */}
      {terminalMode ? (
        <div className={`bg-black rounded-lg p-4 font-mono text-sm ${glitchEffect ? 'animate-pulse' : ''}`}>
          <div className="mb-2 flex items-center">
            <span className="text-green-500 mr-1">root@greenhat:</span>
            <span className="text-blue-500">~#</span>
          </div>
          
          {/* Command History */}
          <div className="h-64 overflow-y-auto mb-4 text-green-500">
            {commandHistory.map((item, index) => (
              <div key={index} className={item.type === 'command' ? 'text-white' : 'text-green-500'}>
                {item.type === 'command' ? (
                  <div className="flex">
                    <span className="text-green-500 mr-1">root@greenhat:~#</span>
                    <span>{item.content}</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{item.content}</pre>
                )}
              </div>
            ))}
          </div>
          
          {/* Command Input */}
          <form onSubmit={handleCommandSubmit} className="flex items-center">
            <span className="text-green-500 mr-1">root@greenhat:</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              className="flex-grow bg-transparent border-none outline-none text-white"
              autoFocus
            />
          </form>
        </div>
      ) : (
        <div className={`${glitchEffect ? 'glitch-container' : ''}`}>
          {/* Dark Web UI Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Secret Symbols Section */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Secret Symbols</h3>
              <p className="text-gray-400 mb-4">
                Use these symbols to identify trusted members and services in the dark web community.
              </p>
              
              {secretSymbols ? (
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-purple-500 mb-1">Ψ</div>
                    <div className="text-xs text-gray-400">Verified Vendor</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-green-500 mb-1">Ω</div>
                    <div className="text-xs text-gray-400">Trusted Escrow</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-red-500 mb-1">Φ</div>
                    <div className="text-xs text-gray-400">Caution Required</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-yellow-500 mb-1">λ</div>
                    <div className="text-xs text-gray-400">New Identity</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-blue-500 mb-1">δ</div>
                    <div className="text-xs text-gray-400">Secure Drop</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-pink-500 mb-1">θ</div>
                    <div className="text-xs text-gray-400">Hidden Service</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-cyan-500 mb-1">π</div>
                    <div className="text-xs text-gray-400">Verified Buyer</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl text-orange-500 mb-1">σ</div>
                    <div className="text-xs text-gray-400">Exit Scammer</div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <p className="text-gray-500">Symbols are hidden. Click "Show Symbols" to reveal.</p>
                </div>
              )}
            </div>
            
            {/* Visual Effects Demo */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Visual Effects</h3>
              <p className="text-gray-400 mb-4">
                Experience the authentic dark web aesthetic with our visual effects.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Glitch Effect</span>
                    <button 
                      onClick={triggerGlitch}
                      className="bg-purple-900 hover:bg-purple-800 text-xs text-white px-2 py-1 rounded"
                    >
                      Trigger
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">Simulates data corruption and transmission errors</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">CRT Screen Effect</span>
                    <button className="bg-green-900 hover:bg-green-800 text-xs text-white px-2 py-1 rounded">
                      Enable
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">Old-school monitor with scan lines and glow</div>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">Matrix Rain</span>
                    <button className="bg-green-900 hover:bg-green-800 text-xs text-white px-2 py-1 rounded">
                      Enable
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">Falling code animation in background</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Encrypted Communication Section */}
          <div className="mt-6 bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Encrypted Communication</h3>
            <p className="text-gray-400 mb-4">
              All communications on this platform are end-to-end encrypted. Only you and your intended recipient can read the messages.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-400 font-medium">Encryption Active</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Your Public Key Fingerprint:</div>
                  <div className="font-mono text-xs text-white break-all bg-gray-700 p-2 rounded">
                    4A44 8A9A 397F 5D89 3987 6CD4 5665 8BBF 3B57 67F1
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Session Encryption:</div>
                  <div className="font-mono text-xs text-white break-all bg-gray-700 p-2 rounded">
                    AES-256-GCM + ChaCha20-Poly1305
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS for glitch effect */}
      <style jsx>{`
        .glitch-container {
          position: relative;
          overflow: hidden;
        }
        
        .glitch-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -10px;
          width: calc(100% + 20px);
          height: 100%;
          background: rgba(255, 0, 128, 0.1);
          animation: glitch-animation 1s infinite;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes glitch-animation {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DarkWebInterface;