import React, { useState } from 'react';

const DarkWebTools = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [linkToCheck, setLinkToCheck] = useState('');
  const [linkStatus, setLinkStatus] = useState(null);
  const [generatedOnion, setGeneratedOnion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [networkTraffic, setNetworkTraffic] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Mock search results for dark web search
  const mockSearchResults = [
    {
      title: "Hidden Wiki - The Original Hidden Wiki",
      url: "http://zqktlwiuavvvqqt4ybvgvi7tyo4hjl5xgfuvpdf6otjiycgwqbym2qad.onion",
      description: "The Hidden Wiki is a dark web directory that contains .onion links to various websites and services.",
      status: "verified"
    },
    {
      title: "Dark Web News - Latest Dark Web Updates",
      url: "http://darkzzx4avcsuofgfez5zq75cqc4mprjvfqywo45dfcaxrwqg6qrlfid.onion",
      description: "Stay updated with the latest news and developments from the dark web community.",
      status: "verified"
    },
    {
      title: "SecureDrop - Anonymous Document Sharing",
      url: "http://sdolvtfhatvsysc6l34d65ymdwxcujausv7k5jk4cy5ttzhjoi6fzvyd.onion",
      description: "A platform for secure and anonymous document sharing used by whistleblowers and journalists.",
      status: "verified"
    },
    {
      title: "Torch - Dark Web Search Engine",
      url: "http://xmh57jrzrnw6insl.onion",
      description: "One of the oldest and most comprehensive search engines for the dark web.",
      status: "unverified"
    },
    {
      title: "DarkNet Live - Dark Web News and Market Updates",
      url: "http://darknetlidvrsli6iso7my54rjayjursyw6ptannrtyio4iumrb3kezyd.onion",
      description: "News, guides, and information about dark web markets and services.",
      status: "verified"
    }
  ];

  // Handle dark web search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;
    
    // Filter mock results based on search query
    const filteredResults = mockSearchResults.filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  };

  // Handle onion link check
  const handleLinkCheck = (e) => {
    e.preventDefault();
    if (linkToCheck.trim() === '') return;
    
    setLinkStatus('checking');
    
    // Simulate link checking process
    setTimeout(() => {
      // Check if the link is a valid .onion format
      const isValidOnionFormat = /^[a-z2-7]{16,56}\.onion$/.test(linkToCheck.replace(/^https?:\/\//, '')) || 
                               /^[a-z2-7]{16,56}\.onion/.test(linkToCheck);
      
      if (isValidOnionFormat) {
        // Randomly determine if the link is safe or suspicious for demo purposes
        const randomStatus = Math.random() > 0.3 ? 'safe' : 'suspicious';
        setLinkStatus(randomStatus);
      } else {
        setLinkStatus('invalid');
      }
    }, 1500);
  };

  // Generate .onion address
  const generateOnionAddress = () => {
    setIsGenerating(true);
    setGeneratedOnion('');
    
    // Simulate address generation
    setTimeout(() => {
      // Generate a random v3 onion address (56 characters)
      const chars = 'abcdefghijklmnopqrstuvwxyz234567';
      let result = '';
      for (let i = 0; i < 56; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      
      setGeneratedOnion(result + '.onion');
      setIsGenerating(false);
    }, 2000);
  };

  // Analyze network traffic
  const analyzeNetworkTraffic = () => {
    setIsAnalyzing(true);
    setNetworkTraffic([]);
    
    // Simulate network traffic analysis
    setTimeout(() => {
      const mockTraffic = [
        { timestamp: '2023-06-15 14:32:45', source: '192.168.1.1', destination: 'Entry Node', protocol: 'TLS', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:46', source: 'Entry Node', destination: 'Middle Node', protocol: 'TLS', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:47', source: 'Middle Node', destination: 'Exit Node', protocol: 'TLS', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:48', source: 'Exit Node', destination: 'darkzzx4avcsuofgfez5zq75cqc4mprjvfqywo45dfcaxrwqg6qrlfid.onion', protocol: 'HTTP', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:50', source: 'darkzzx4avcsuofgfez5zq75cqc4mprjvfqywo45dfcaxrwqg6qrlfid.onion', destination: 'Exit Node', protocol: 'HTTP', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:51', source: 'Exit Node', destination: 'Middle Node', protocol: 'TLS', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:52', source: 'Middle Node', destination: 'Entry Node', protocol: 'TLS', status: 'Encrypted' },
        { timestamp: '2023-06-15 14:32:53', source: 'Entry Node', destination: '192.168.1.1', protocol: 'TLS', status: 'Encrypted' }
      ];
      
      setNetworkTraffic(mockTraffic);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6">Dark Web Tools</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dark Web Search Engine */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Dark Web Search
          </h3>
          <p className="text-gray-400 mb-4">
            Search the dark web safely for legal content. Results are filtered to exclude illegal materials.
          </p>
          
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the dark web..."
                className="flex-grow bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button 
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r transition duration-300"
              >
                Search
              </button>
            </div>
          </form>
          
          {searchResults.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="text-sm text-gray-400 mb-2">{searchResults.length} results found</div>
              
              {searchResults.map((result, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-700 last:border-0 last:mb-0 last:pb-0">
                  <div className="flex items-center mb-1">
                    <div className={`w-2 h-2 rounded-full mr-2 ${result.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <h4 className="text-blue-400 font-medium">{result.title}</h4>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">{result.url}</div>
                  <p className="text-sm text-gray-400">{result.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Onion Link Checker */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Onion Link Checker
          </h3>
          <p className="text-gray-400 mb-4">
            Verify the safety and validity of .onion links before visiting them.
          </p>
          
          <form onSubmit={handleLinkCheck} className="mb-4">
            <div className="flex">
              <input
                type="text"
                value={linkToCheck}
                onChange={(e) => setLinkToCheck(e.target.value)}
                placeholder="Enter .onion link to check..."
                className="flex-grow bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button 
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-r transition duration-300"
              >
                Check
              </button>
            </div>
          </form>
          
          {linkStatus && (
            <div className="bg-gray-800 rounded-lg p-4">
              {linkStatus === 'checking' ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span className="ml-2 text-white">Checking link safety...</span>
                </div>
              ) : linkStatus === 'safe' ? (
                <div className="flex items-center text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>This link appears to be safe. No known threats detected.</span>
                </div>
              ) : linkStatus === 'suspicious' ? (
                <div className="flex items-center text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Warning: This link has been flagged as potentially suspicious. Proceed with caution.</span>
                </div>
              ) : (
                <div className="flex items-center text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Invalid onion link format. Please enter a valid .onion address.</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Onion Address Generator */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Onion Address Generator
          </h3>
          <p className="text-gray-400 mb-4">
            Generate v3 .onion addresses for hidden services. These addresses are more secure and provide better anonymity.
          </p>
          
          <div className="mb-4">
            <button 
              onClick={generateOnionAddress}
              disabled={isGenerating}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Generating...
                </>
              ) : 'Generate .onion Address'}
            </button>
          </div>
          
          {generatedOnion && (
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-2">Generated .onion Address:</div>
              <div className="font-mono text-green-400 break-all bg-gray-700 p-2 rounded">
                {generatedOnion}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                This is a randomly generated v3 onion address. In a real implementation, this would be cryptographically generated based on your service's private key.
              </div>
            </div>
          )}
        </div>
        
        {/* Network Traffic Analyzer */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Network Traffic Analyzer
          </h3>
          <p className="text-gray-400 mb-4">
            Analyze your network traffic to detect any potential data leaks or security issues.
          </p>
          
          <div className="mb-4">
            <button 
              onClick={analyzeNetworkTraffic}
              disabled={isAnalyzing}
              className="bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Analyzing...
                </>
              ) : 'Analyze Network Traffic'}
            </button>
          </div>
          
          {networkTraffic.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="text-sm text-gray-400 mb-2">Traffic Analysis Results:</div>
              
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-500 border-b border-gray-700">
                    <th className="text-left pb-2">Timestamp</th>
                    <th className="text-left pb-2">Source</th>
                    <th className="text-left pb-2">Destination</th>
                    <th className="text-left pb-2">Protocol</th>
                    <th className="text-left pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {networkTraffic.map((traffic, index) => (
                    <tr key={index} className="border-b border-gray-700 last:border-0">
                      <td className="py-2 text-gray-400">{traffic.timestamp}</td>
                      <td className="py-2 text-gray-400">{traffic.source}</td>
                      <td className="py-2 text-gray-400">{traffic.destination}</td>
                      <td className="py-2 text-gray-400">{traffic.protocol}</td>
                      <td className="py-2 text-green-400">{traffic.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-2 text-xs text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No data leaks detected. Your connection is secure.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkWebTools;