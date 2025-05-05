import React, { useState } from 'react';
import Link from 'next/link';

const PrivacyFeatures = () => {
  const [activeTab, setActiveTab] = useState('onion');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [messageLifetime, setMessageLifetime] = useState(5); // minutes
  const [messages, setMessages] = useState([]);

  // Handle emergency button click
  const handleEmergencyExit = () => {
    setEmergencyMode(true);
    // Clear local storage
    localStorage.clear();
    // Show emergency exit message
    setTimeout(() => {
      window.location.href = 'https://www.google.com'; // Redirect to innocent website
    }, 1500);
  };

  // Handle self-destructing message
  const handleSendMessage = () => {
    if (!messageContent.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      content: messageContent,
      sender: 'You',
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + messageLifetime * 60 * 1000)
    };
    
    setMessages([...messages, newMessage]);
    setMessageContent('');
    
    // Set self-destruct timer
    setTimeout(() => {
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== newMessage.id));
    }, messageLifetime * 60 * 1000);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Advanced Privacy Features</h2>
        <button
          onClick={handleEmergencyExit}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Emergency Exit
        </button>
      </div>

      {emergencyMode && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="text-white text-center">
            <h2 className="text-2xl mb-4">Wiping all data...</h2>
            <div className="w-16 h-16 border-4 border-gray-700 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}

      {/* Privacy Features Tabs */}
      <div className="mb-6">
        <div className="flex overflow-x-auto scrollbar-hide mb-4 border-b border-gray-800">
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'onion' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('onion')}
          >
            Onion Routing
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'messages' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('messages')}
          >
            Self-Destructing Messages
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'crypto' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('crypto')}
          >
            Crypto Payments
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${activeTab === 'verification' ? 'text-accent border-b-2 border-accent' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab('verification')}
          >
            Multi-Verification
          </button>
        </div>

        {/* Onion Routing Tab */}
        {activeTab === 'onion' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Onion Routing Protection</h3>
            <p className="text-gray-400 mb-4">
              Your connection is now routed through multiple encrypted layers, similar to Tor network. This ensures your anonymity and protects against traffic analysis.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-400 font-medium">Onion Routing Active</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-gray-700 rounded p-2 text-xs text-gray-300 text-center">Layer 1: Encrypted</div>
                <div className="bg-gray-700 rounded p-2 text-xs text-gray-300 text-center">Layer 2: Encrypted</div>
                <div className="bg-gray-700 rounded p-2 text-xs text-gray-300 text-center">Layer 3: Encrypted</div>
              </div>
              <div className="text-xs text-gray-500">Your traffic is being routed through 3 encrypted layers</div>
            </div>
            
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
              <div>
                <div className="text-sm text-gray-400">Current IP Address:</div>
                <div className="font-mono text-green-400">***.***.***.***</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Exit Node Location:</div>
                <div className="font-mono text-green-400">Unknown</div>
              </div>
              <button className="bg-accent hover:bg-accent-dark text-white text-sm px-3 py-1 rounded transition duration-300">
                Change Circuit
              </button>
            </div>
          </div>
        )}

        {/* Self-Destructing Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Self-Destructing Messages</h3>
            <p className="text-gray-400 mb-4">
              Send encrypted messages that automatically delete themselves after being read or after a specified time period.
            </p>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-gray-400 mr-2">Message Lifetime:</span>
                <select 
                  value={messageLifetime}
                  onChange={(e) => setMessageLifetime(Number(e.target.value))}
                  className="bg-gray-800 border border-gray-700 text-white rounded px-2 py-1 text-sm"
                >
                  <option value="1">1 minute</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </div>
              
              <div className="flex mb-2">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Type your secure message..."
                  className="flex-grow bg-gray-800 border border-gray-700 text-white rounded-l px-3 py-2"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-r transition duration-300"
                >
                  Send
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-gray-500 text-center py-4">No messages yet. Your messages will appear here and self-destruct after the specified time.</div>
              ) : (
                <div className="space-y-3">
                  {messages.map(message => (
                    <div key={message.id} className="bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-accent text-sm">{message.sender}</span>
                        <span className="text-xs text-gray-500">
                          Self-destructs in {Math.max(0, Math.floor((new Date(message.expiresAt) - new Date()) / 60000))} min
                        </span>
                      </div>
                      <p className="text-white">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Crypto Payments Tab */}
        {activeTab === 'crypto' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Cryptocurrency Payments</h3>
            <p className="text-gray-400 mb-4">
              Make anonymous payments using cryptocurrencies. We support Bitcoin, Monero, and other privacy-focused cryptocurrencies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">₿</div>
                  <span className="text-white font-medium">Bitcoin</span>
                </div>
                <div className="bg-gray-700 rounded p-2 mb-2">
                  <div className="text-xs text-gray-400 mb-1">Deposit Address:</div>
                  <div className="font-mono text-sm text-white break-all">bc1q8c6t5r7vr9dt7f8vxkgzh5xvh7yssnp7qqetgv</div>
                </div>
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-2 rounded transition duration-300">
                  Make Payment
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold">ꭙ</div>
                  <span className="text-white font-medium">Monero</span>
                </div>
                <div className="bg-gray-700 rounded p-2 mb-2">
                  <div className="text-xs text-gray-400 mb-1">Deposit Address:</div>
                  <div className="font-mono text-sm text-white break-all">44AFFq5kSiGBoZ4NMDwYtN18obc8AemS...</div>
                </div>
                <button className="w-full bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 rounded transition duration-300">
                  Make Payment
                </button>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Transaction History</h4>
              <div className="text-gray-500 text-center py-2">No transactions yet</div>
            </div>
          </div>
        )}

        {/* Multi-Verification Tab */}
        {activeTab === 'verification' && (
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Multi-Factor Verification</h3>
            <p className="text-gray-400 mb-4">
              Secure your account with multiple verification methods without revealing your personal information.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">PGP Key Authentication</span>
                  </div>
                  <span className="text-green-500 text-sm">Enabled</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Time-based OTP</span>
                  </div>
                  <span className="text-green-500 text-sm">Enabled</span>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Hardware Key</span>
                  </div>
                  <button className="text-accent hover:text-accent-dark text-sm transition duration-300">
                    Enable
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">Dead Man's Switch</span>
                  </div>
                  <button className="text-accent hover:text-accent-dark text-sm transition duration-300">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivacyFeatures;