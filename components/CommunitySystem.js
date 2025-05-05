import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CommunitySystem = () => {
  const [activeTab, setActiveTab] = useState('collaboration');
  const [sharedTools, setSharedTools] = useState([]);
  const [messages, setMessages] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for shared tools
  useEffect(() => {
    const mockSharedTools = [
      {
        id: 1,
        name: 'Network Vulnerability Scanner',
        author: 'CyberHunter',
        authorVerified: true,
        description: 'Advanced scanner that identifies network vulnerabilities with detailed remediation steps.',
        rating: 4.8,
        downloads: 1243,
        tags: ['network', 'scanner', 'security'],
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString() // 2 days ago
      },
      {
        id: 2,
        name: 'Encryption Toolkit',
        author: 'SecureCoder',
        authorVerified: true,
        description: 'Comprehensive toolkit for implementing various encryption algorithms in your applications.',
        rating: 4.6,
        downloads: 987,
        tags: ['encryption', 'cryptography', 'security'],
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString() // 5 days ago
      },
      {
        id: 3,
        name: 'Password Strength Analyzer',
        author: 'SecurityNinja',
        authorVerified: false,
        description: 'Tool to analyze password strength against various attack vectors.',
        rating: 4.2,
        downloads: 756,
        tags: ['password', 'authentication', 'security'],
        timestamp: new Date(Date.now() - 86400000 * 7).toISOString() // 7 days ago
      },
      {
        id: 4,
        name: 'API Security Tester',
        author: 'APIGuardian',
        authorVerified: true,
        description: 'Automated tool for testing API endpoints for common security vulnerabilities.',
        rating: 4.9,
        downloads: 1567,
        tags: ['api', 'testing', 'security'],
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString() // 1 day ago
      },
    ];
    setSharedTools(mockSharedTools);
    
    // Mock messages
    const mockMessages = [
      {
        id: 1,
        sender: 'CyberHunter',
        senderVerified: true,
        subject: 'Collaboration on Network Scanner',
        preview: 'I saw your recent contributions to the vulnerability database...',
        content: 'I saw your recent contributions to the vulnerability database and was impressed with your methodology. Would you be interested in collaborating on an enhanced version of my Network Vulnerability Scanner? I believe your expertise in API security could significantly improve the tool\'s capabilities.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        read: false,
        encrypted: true
      },
      {
        id: 2,
        sender: 'SecurityAdmin',
        senderVerified: true,
        subject: 'Your recent challenge submission',
        preview: 'Congratulations on completing the Advanced XSS Challenge...',
        content: 'Congratulations on completing the Advanced XSS Challenge! Your solution was particularly elegant and efficient. We\'ve awarded you the "XSS Master" badge and added 500 points to your profile. Keep up the excellent work!',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
        read: true,
        encrypted: true
      },
      {
        id: 3,
        sender: 'SecureCoder',
        senderVerified: true,
        subject: 'Question about your Encryption Toolkit',
        preview: 'I\'ve been using your Encryption Toolkit and had a question about...',
        content: 'I\'ve been using your Encryption Toolkit and had a question about implementing the AES-256 module in a Node.js environment. I\'m encountering some issues with the initialization vector handling. Could you provide some guidance on the correct implementation approach?',
        timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
        read: true,
        encrypted: true
      },
    ];
    setMessages(mockMessages);
    
    // Mock challenges
    const mockChallenges = [
      {
        id: 1,
        title: 'Advanced SQL Injection',
        description: 'Exploit SQL injection vulnerabilities in a hardened database system.',
        difficulty: 'Hard',
        participants: 128,
        points: 500,
        endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        completed: false
      },
      {
        id: 2,
        title: 'Secure Code Review Challenge',
        description: 'Identify and fix security vulnerabilities in the provided code snippets.',
        difficulty: 'Medium',
        participants: 256,
        points: 300,
        endDate: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
        completed: false
      },
      {
        id: 3,
        title: 'Network Traffic Analysis',
        description: 'Analyze network packet captures to identify malicious activities.',
        difficulty: 'Medium',
        participants: 192,
        points: 350,
        endDate: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
        completed: true
      },
    ];
    setChallenges(mockChallenges);
  }, []);

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(prev => 
      prev.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedMessage) return;
    
    // In a real app, this would send the message to the API
    alert(`Message sent to ${selectedMessage.sender}: ${messageInput}`);
    setMessageInput('');
  };

  const filteredTools = sharedTools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-800">
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'collaboration' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('collaboration')}
        >
          Tool Collaboration
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'messaging' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('messaging')}
        >
          Secure Messaging
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'challenges' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('challenges')}
        >
          Security Challenges
        </button>
      </div>

      <div className="p-6">
        {/* Tool Collaboration Tab */}
        {activeTab === 'collaboration' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Community Shared Tools</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5 pl-10"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-bold">{tool.name}</h4>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-gray-400 text-sm">{tool.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="text-gray-400 text-sm mr-2">By {tool.author}</span>
                    {tool.authorVerified && (
                      <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">{tool.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tool.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{tool.downloads} downloads</span>
                    <span>Shared {new Date(tool.timestamp).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1.5 rounded text-sm transition-colors flex-1">
                      Download
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm transition-colors flex-1">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                Share Your Tool
              </button>
            </div>
          </div>
        )}

        {/* Secure Messaging Tab */}
        {activeTab === 'messaging' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Secure Encrypted Messaging</h3>
            <p className="text-gray-400 mb-6">
              All messages are end-to-end encrypted. Only you and the recipient can read the contents.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Message List */}
              <div className="md:col-span-1 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                <div className="p-3 border-b border-gray-700 bg-gray-800">
                  <h4 className="text-white font-medium">Messages</h4>
                </div>
                <div className="divide-y divide-gray-700 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`p-3 cursor-pointer transition-colors ${selectedMessage?.id === message.id ? 'bg-gray-700' : message.read ? 'bg-gray-800 hover:bg-gray-700/50' : 'bg-gray-700/30 hover:bg-gray-700/50'}`}
                      onClick={() => handleMessageSelect(message)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center">
                          <span className="text-white font-medium">{message.sender}</span>
                          {message.senderVerified && (
                            <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-gray-500 text-xs">{new Date(message.timestamp).toLocaleDateString()}</span>
                      </div>
                      <div className="text-white text-sm font-medium mb-1">{message.subject}</div>
                      <p className="text-gray-400 text-xs truncate">{message.preview}</p>
                      {!message.read && (
                        <div className="mt-2 flex justify-end">
                          <span className="bg-accent rounded-full h-2 w-2"></span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Content */}
              <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                {selectedMessage ? (
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-white font-bold">{selectedMessage.subject}</h4>
                        <div className="flex items-center">
                          {selectedMessage.encrypted && (
                            <span className="mr-2 bg-blue-900/30 text-blue-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              Encrypted
                            </span>
                          )}
                          <span className="text-gray-400 text-xs">{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-300">From: {selectedMessage.sender}</span>
                        {selectedMessage.senderVerified && (
                          <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 flex-grow">
                      <p className="text-gray-300 whitespace-pre-line">{selectedMessage.content}</p>
                    </div>
                    
                    <div className="p-4 border-t border-gray-700 bg-gray-800">
                      <div className="flex items-center">
                        <input
                          type="text"
                          placeholder="Type your reply..."
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-l-lg focus:ring-accent focus:border-accent block p-2.5"
                        />
                        <button 
                          onClick={handleSendMessage}
                          className="bg-accent hover:bg-accent-dark text-white px-4 py-2.5 rounded-r-lg transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <p className="text-gray-500">Select a message to view</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Security Challenges Tab */}
        {activeTab === 'challenges' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Weekly Security Challenges</h3>
              <div className="flex items-center">
                <div className="mr-4">
                  <span className="text-gray-400 text-sm">Your Rank: </span>
                  <span className="text-white font-bold">42</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Points: </span>
                  <span className="text-white font-bold">1,250</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                  <div className={`p-4 border-b border-gray-700 ${challenge.completed ? 'bg-green-900/20' : 'bg-gray-700/20'}`}>
                    <div className="flex justify-between items-center">
                      <h4 className="text-white font-bold">{challenge.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${challenge.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-4">{challenge.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                      <span>{challenge.participants} participants</span>
                      <span>{challenge.points} points</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 text-sm">Ends in: {Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days</span>
                      {challenge.completed && (
                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    
                    <button 
                      className={`w-full py-2 rounded text-sm ${challenge.completed ? 'bg-gray-700 text-gray-300' : 'bg-accent hover:bg-accent-dark text-white'}`}
                    >
                      {challenge.completed ? 'View Solution' : 'Start Challenge'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="text-white font-bold mb-3">Leaderboard</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-900">
                    <tr>
                      <th scope="col" className="px-4 py-3">Rank</th>
                      <th scope="col" className="px-4 py-3">User</th>
                      <th scope="col" className="px-4 py-3">Challenges Completed</th>
                      <th scope="col" className="px-4 py-3">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-3 text-white">1</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-white">CyberHunter</span>
                          <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">✓</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">32</td>
                      <td className="px-4 py-3 text-white font-bold">4,250</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-3 text-white">2</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-white">SecureCoder</span>
                          <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">✓</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">28</td>
                      <td className="px-4 py-3 text-white font-bold">3,820</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="px-4 py-3 text-white">3</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-white">HackMaster</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">25</td>
                      <td className="px-4 py-3 text-white font-bold">3,450</td>
                    </tr>
                    <tr className="border-b border-gray-700 bg-gray-700/20">
                      <td className="px-4 py-3 text-accent">42</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-accent">You</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-accent">8</td>
                      <td className="px-4 py-3 text-accent font-bold">1,250</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitySystem;