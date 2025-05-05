import React, { useState } from 'react';

const AdvancedCommunitySystem = () => {
  const [activeTab, setActiveTab] = useState('reputation');
  const [showChallengeDetails, setShowChallengeDetails] = useState(false);
  const [joinedRoom, setJoinedRoom] = useState(null);
  const [roomPassword, setRoomPassword] = useState('');
  const [roomMessage, setRoomMessage] = useState('');
  const [roomMessages, setRoomMessages] = useState([]);
  
  // Mock reputation data
  const reputationData = {
    level: 'Shadow Elite',
    points: 2750,
    rank: 142,
    contributions: 37,
    badges: [
      { name: 'Code Breaker', description: 'Successfully reversed 10 encryption challenges', icon: '🔓' },
      { name: 'Ghost Protocol', description: 'Maintained complete anonymity for 30 days', icon: '👻' },
      { name: 'Network Sentinel', description: 'Identified 5 network vulnerabilities', icon: '🛡️' },
      { name: 'Dark Scholar', description: 'Contributed 20 valuable resources to the knowledge base', icon: '📚' },
    ],
    recentActivity: [
      { type: 'contribution', description: 'Shared a new encryption technique', points: 50, date: '2 days ago' },
      { type: 'challenge', description: 'Completed the "Phantom Network" challenge', points: 100, date: '5 days ago' },
      { type: 'review', description: 'Verified a security tool submission', points: 25, date: '1 week ago' },
    ]
  };
  
  // Mock marketplace items
  const marketplaceItems = [
    {
      id: 1,
      title: 'Advanced Port Scanner',
      description: 'A sophisticated port scanning tool with stealth capabilities and fingerprinting features.',
      author: 'phantom_dev',
      authorRep: 'Shadow Elite',
      price: '500 credits',
      category: 'Network Tools',
      rating: 4.8,
      reviews: 24
    },
    {
      id: 2,
      title: 'Encryption Masterclass',
      description: 'Comprehensive guide to modern encryption techniques and how to implement them securely.',
      author: 'crypto_sage',
      authorRep: 'Digital Phantom',
      price: '750 credits',
      category: 'Educational',
      rating: 4.9,
      reviews: 37
    },
    {
      id: 3,
      title: 'Secure Communication Protocol',
      description: 'Implementation of a custom communication protocol designed for maximum privacy.',
      author: 'secure_vector',
      authorRep: 'Code Wraith',
      price: '1200 credits',
      category: 'Communication',
      rating: 4.7,
      reviews: 19
    },
    {
      id: 4,
      title: 'Vulnerability Database - Q2 2023',
      description: 'Curated database of recent vulnerabilities with exploitation techniques and mitigation strategies.',
      author: 'breach_hunter',
      authorRep: 'Shadow Elite',
      price: '900 credits',
      category: 'Security Research',
      rating: 4.6,
      reviews: 31
    },
  ];
  
  // Mock discussion rooms
  const discussionRooms = [
    {
      id: 'room1',
      name: 'Zero-Day Vulnerabilities',
      participants: 14,
      timeRemaining: '47 minutes',
      securityLevel: 'High',
      requiresPassword: true
    },
    {
      id: 'room2',
      name: 'Quantum Encryption Techniques',
      participants: 8,
      timeRemaining: '23 minutes',
      securityLevel: 'Medium',
      requiresPassword: false
    },
    {
      id: 'room3',
      name: 'Anonymous Network Infrastructure',
      participants: 11,
      timeRemaining: '59 minutes',
      securityLevel: 'High',
      requiresPassword: true
    },
    {
      id: 'room4',
      name: 'Social Engineering Countermeasures',
      participants: 6,
      timeRemaining: '35 minutes',
      securityLevel: 'Medium',
      requiresPassword: false
    },
  ];
  
  // Mock security challenges
  const securityChallenges = [
    {
      id: 'challenge1',
      title: 'Phantom Network',
      difficulty: 'Advanced',
      category: 'Network Security',
      participants: 78,
      reward: '1000 credits',
      timeRemaining: '3 days',
      description: 'Navigate through a complex network infrastructure while maintaining anonymity. Identify vulnerabilities without triggering any alerts.',
      objectives: [
        'Establish a covert connection to the target network',
        'Map the network architecture without detection',
        'Identify at least 3 critical vulnerabilities',
        'Document your methodology and findings'
      ]
    },
    {
      id: 'challenge2',
      title: 'Cryptic Cipher',
      difficulty: 'Expert',
      category: 'Cryptography',
      participants: 42,
      reward: '1500 credits',
      timeRemaining: '5 days',
      description: 'Decrypt a series of increasingly complex encrypted messages using various cryptographic techniques.',
      objectives: [
        'Identify the encryption algorithms used',
        'Develop tools to automate the decryption process',
        'Recover the hidden key from the decrypted messages',
        'Use the key to access the final challenge'
      ]
    },
    {
      id: 'challenge3',
      title: 'Shadow Defense',
      difficulty: 'Intermediate',
      category: 'Defense Techniques',
      participants: 103,
      reward: '800 credits',
      timeRemaining: '2 days',
      description: 'Set up a secure environment that can withstand various attack vectors. Your defense will be tested by other participants.',
      objectives: [
        'Configure a secure server environment',
        'Implement intrusion detection and prevention systems',
        'Set up honeypots to trap attackers',
        'Maintain service availability during attacks'
      ]
    },
  ];
  
  // Handle room join
  const handleJoinRoom = (roomId) => {
    const room = discussionRooms.find(room => room.id === roomId);
    
    if (room.requiresPassword) {
      // In a real app, this would verify the password
      if (roomPassword.length < 4) {
        alert('Please enter a valid password');
        return;
      }
    }
    
    setJoinedRoom(room);
    setRoomPassword('');
    
    // Mock initial messages
    setRoomMessages([
      { user: 'system', message: `Welcome to the "${room.name}" discussion room. This room will automatically close in ${room.timeRemaining}.`, timestamp: 'just now' },
      { user: 'phantom_user', message: 'Has anyone looked into the latest CVE reports?', timestamp: '2 minutes ago' },
      { user: 'security_analyst', message: 'Yes, I\'ve been analyzing CVE-2023-1234. It has some interesting implications.', timestamp: '1 minute ago' },
    ]);
  };
  
  // Handle sending a message in the room
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (roomMessage.trim() === '') return;
    
    // Add message to the chat
    setRoomMessages(prev => [
      ...prev,
      { user: 'you', message: roomMessage, timestamp: 'just now' }
    ]);
    
    setRoomMessage('');
  };
  
  // Handle challenge details toggle
  const handleChallengeDetails = (challengeId) => {
    setShowChallengeDetails(showChallengeDetails === challengeId ? null : challengeId);
  
    // Simulate a response after a short delay
    setTimeout(() => {
      setRoomMessages(prev => [
        ...prev,
        { user: 'data_wraith', message: 'Interesting point. Have you considered the implications for zero-trust architectures?', timestamp: 'just now' },
      ]);
    }, 3000);
  };
  
  // Handle leaving a room
  const handleLeaveRoom = () => {
    setJoinedRoom(null);
    setRoomMessages([]);
  };

  // Component render
  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Advanced Community System</h2>
      
      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'reputation' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('reputation')}
        >
          Encrypted Reputation
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'marketplace' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('marketplace')}
        >
          Knowledge Exchange
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'discussions' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('discussions')}
        >
          Temporary Rooms
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'challenges' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('challenges')}
        >
          Security Challenges
        </button>
      </div>
      
      {/* Reputation System */}
      {activeTab === 'reputation' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Your Encrypted Reputation</h3>
              <p className="text-gray-400 text-sm mb-4">
                Your contributions and activities are anonymously tracked to build your reputation without revealing your identity.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-purple-500 text-2xl font-bold">{reputationData.level}</div>
              <div className="text-gray-400 text-sm">Current Level</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-blue-400 text-xl font-bold">{reputationData.points}</div>
              <div className="text-gray-400 text-sm">Reputation Points</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-blue-400 text-xl font-bold">#{reputationData.rank}</div>
              <div className="text-gray-400 text-sm">Global Rank</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-blue-400 text-xl font-bold">{reputationData.contributions}</div>
              <div className="text-gray-400 text-sm">Total Contributions</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-medium mb-3">Earned Badges</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {reputationData.badges.map((badge, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-2">{badge.icon}</div>
                  <div className="text-white font-medium text-sm mb-1">{badge.name}</div>
                  <div className="text-gray-400 text-xs">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Recent Activity</h4>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              {reputationData.recentActivity.map((activity, index) => (
                <div key={index} className="p-3 border-b border-gray-700 last:border-0 flex justify-between items-center">
                  <div>
                    <div className="text-white text-sm">{activity.description}</div>
                    <div className="text-gray-500 text-xs">{activity.date}</div>
                  </div>
                  <div className="text-green-500 font-medium">+{activity.points} pts</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Knowledge Exchange Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Knowledge Exchange Market</h3>
              <p className="text-gray-400 text-sm">
                Exchange tools, research, and knowledge with other community members using reputation points or cryptocurrency.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-gray-800 rounded-lg px-4 py-2 text-center">
                <div className="text-white text-sm">Your Balance</div>
                <div className="text-green-500 font-bold">3,250 credits</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketplaceItems.map(item => (
              <div key={item.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium">{item.title}</h4>
                  <div className="bg-purple-900 text-purple-300 text-xs px-2 py-1 rounded">{item.category}</div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="mr-1">By</span>
                    <span className="text-blue-400">{item.author}</span>
                    <span className="mx-1">•</span>
                    <span>{item.authorRep}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{item.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{item.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-green-500 font-medium">{item.price}</div>
                  <button className="bg-purple-700 hover:bg-purple-600 text-white text-xs px-3 py-1 rounded transition duration-300">
                    Purchase
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300">
              Browse More Items
            </button>
          </div>
        </div>
      )}
      
      {/* Temporary Discussion Rooms */}
      {activeTab === 'discussions' && !joinedRoom && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Temporary Discussion Rooms</h3>
            <p className="text-gray-400 text-sm">
              Join encrypted discussion rooms that automatically delete all content after a set time period.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discussionRooms.map(room => (
              <div key={room.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium">{room.name}</h4>
                  <div className={`text-xs px-2 py-1 rounded ${room.securityLevel === 'High' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {room.securityLevel} Security
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <div>{room.participants} participants</div>
                  <div>Closes in {room.timeRemaining}</div>
                </div>
                
                {room.requiresPassword ? (
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Enter room password"
                      className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                      onChange={(e) => setRoomPassword(e.target.value)}
                    />
                  </div>
                ) : null}
                
                <button 
                  onClick={() => handleJoinRoom(room.id)}
                  className="w-full bg-purple-700 hover:bg-purple-600 text-white py-2 rounded transition duration-300"
                >
                  Join Room
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300">
              Create New Room
            </button>
          </div>
        </div>
      )}
      
      {/* Inside a discussion room */}
      {activeTab === 'discussions' && joinedRoom && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{joinedRoom.name}</h3>
              <p className="text-gray-400 text-sm">
                This room will close in {joinedRoom.timeRemaining}. All messages will be permanently deleted.
              </p>
            </div>
            <button 
              onClick={handleLeaveRoom}
              className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded transition duration-300"
            >
              Leave Room
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 h-64 mb-4 overflow-y-auto">
            {roomMessages.map((msg, index) => (
              <div key={index} className={`mb-3 ${msg.user === 'you' ? 'text-right' : 'text-left'}`}>
                <div className="inline-block max-w-3/4">
                  {msg.user !== 'system' && (
                    <div className={`text-xs mb-1 ${msg.user === 'you' ? 'text-blue-400' : 'text-purple-400'}`}>
                      {msg.user === 'you' ? 'You' : msg.user}
                    </div>
                  )}
                  <div className={`rounded-lg px-3 py-2 text-sm ${msg.user === 'system' ? 'bg-gray-700 text-gray-300' : msg.user === 'you' ? 'bg-blue-900 text-white' : 'bg-gray-700 text-white'}`}>
                    {msg.message}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={roomMessage}
              onChange={(e) => setRoomMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button 
              type="submit"
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r transition duration-300"
            >
              Send
            </button>
          </form>
          
          <div className="mt-4 text-xs text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            End-to-end encrypted. Messages will be permanently deleted when the room closes.
          </div>
        </div>
      )}
      
      {/* Security Challenges */}
      {activeTab === 'challenges' && (
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Security Challenges</h3>
            <p className="text-gray-400 text-sm">
              Test your skills with weekly security challenges. Earn reputation points and cryptocurrency rewards.
            </p>
          </div>
          
          <div className="space-y-6">
            {securityChallenges.map(challenge => (
              <div key={challenge.id} className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white font-medium">{challenge.title}</h4>
                  <div className={`text-xs px-2 py-1 rounded ${challenge.difficulty === 'Expert' ? 'bg-red-900 text-red-300' : challenge.difficulty === 'Advanced' ? 'bg-orange-900 text-orange-300' : 'bg-yellow-900 text-yellow-300'}`}>
                    {challenge.difficulty}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{challenge.category}</div>
                  <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{challenge.participants} participants</div>
                  <div className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">Ends in {challenge.timeRemaining}</div>
                  <div className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">{challenge.reward}</div>
                </div>
                
                <p className="text-gray-400 text-sm mb-3">{challenge.description}</p>
                
                <div className="flex justify-between items-center">
                  <button 
                    onClick={() => setShowChallengeDetails(challenge.id)}
                    className="text-purple-400 text-sm hover:text-purple-300 transition duration-300"
                  >
                    {showChallengeDetails === challenge.id ? 'Hide Details' : 'View Details'}
                  </button>
                  
                  <button className="bg-purple-700 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded transition duration-300">
                    Join Challenge
                  </button>
                </div>
                
                {showChallengeDetails === challenge.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <h5 className="text-white font-medium mb-2">Challenge Objectives:</h5>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                      {challenge.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300">
              View All Challenges
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedCommunitySystem;