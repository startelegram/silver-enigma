import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import config from '../config';
import TemplateLibrary from '../components/TemplateLibrary';

const Builder = () => {
  const router = useRouter();
  const [concept, setConcept] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [buildStatus, setBuildStatus] = useState('ready'); // ready, building, completed, failed
  const [progress, setProgress] = useState(0);
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [userTools, setUserTools] = useState([]);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(config.limits.builder7e.dailyAttempts);
  const progressIntervalRef = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(router.asPath));
      return;
    }
    setIsLoggedIn(true);

    // Load user's previously created tools
    const savedTools = localStorage.getItem('user-tools');
    if (savedTools) {
      setUserTools(JSON.parse(savedTools));
    }
    
    // Check daily usage limit
    checkDailyUsageLimit();
  }, [router]);
  
  // Function to check daily usage limit
  const checkDailyUsageLimit = () => {
    const today = new Date().toDateString();
    const lastUsageDate = localStorage.getItem('builder7e-last-usage-date');
    const usageCount = localStorage.getItem('builder7e-usage-count');
    
    if (lastUsageDate !== today) {
      // Reset count for new day
      localStorage.setItem('builder7e-last-usage-date', today);
      localStorage.setItem('builder7e-usage-count', '0');
      setRemainingAttempts(config.limits.builder7e.dailyAttempts);
    } else {
      const currentCount = parseInt(usageCount || '0');
      setRemainingAttempts(Math.max(0, config.limits.builder7e.dailyAttempts - currentCount));
      
      if (currentCount >= config.limits.builder7e.dailyAttempts) {
        // User has reached daily limit
        setError(`You have reached the daily limit (${config.limits.builder7e.dailyAttempts} attempts) for using the Builder7e Tool Creator service. Please try again tomorrow.`);
        setBuildStatus('limited');
      }
    }
  };

  const simulateBuildProgress = () => {
    setBuildStatus('building');
    setProgress(0);
    
    // Simulate file generation
    const mockFiles = [
      { name: 'index.js', content: 'Main entry point', status: 'pending' },
      { name: 'tool.js', content: 'Tool implementation', status: 'pending' },
      { name: 'utils.js', content: 'Utility functions', status: 'pending' },
      { name: 'README.md', content: 'Documentation', status: 'pending' },
      { name: 'package.json', content: 'Dependencies', status: 'pending' }
    ];
    
    setGeneratedFiles(mockFiles);
    
    // Simulate progress updates
    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += Math.floor(Math.random() * 10) + 1;
        currentProgress = Math.min(currentProgress, 100);
        setProgress(currentProgress);
        
        // Update file generation status
        if (currentProgress > 20 && mockFiles[0].status === 'pending') {
          updateFileStatus(0, 'completed');
        }
        if (currentProgress > 40 && mockFiles[1].status === 'pending') {
          updateFileStatus(1, 'completed');
        }
        if (currentProgress > 60 && mockFiles[2].status === 'pending') {
          updateFileStatus(2, 'completed');
        }
        if (currentProgress > 80 && mockFiles[3].status === 'pending') {
          updateFileStatus(3, 'completed');
        }
        if (currentProgress === 100) {
          updateFileStatus(4, 'completed');
          clearInterval(progressIntervalRef.current);
          setBuildStatus('completed');
          
          // Create a real download URL that points to our API endpoint
          setDownloadUrl(`/api/download?tool=${encodeURIComponent(concept)}`);
          
          // Save to user's tools
          const newTool = {
            id: Date.now(),
            name: concept,
            createdAt: new Date().toISOString(),
            files: mockFiles.length
          };
          
          const updatedTools = [...userTools, newTool];
          setUserTools(updatedTools);
          localStorage.setItem('user-tools', JSON.stringify(updatedTools));
        }
      }
    }, 500);
  };

  const updateFileStatus = (index, status) => {
    setGeneratedFiles(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status };
      return updated;
    });
  };

  const handleBuild = async (e) => {
    e.preventDefault();
    
    if (!concept.trim()) {
      setError('Please enter a tool concept');
      return;
    }
    
    // Check if user has reached daily limit
    const today = new Date().toDateString();
    const lastUsageDate = localStorage.getItem('builder7e-last-usage-date');
    const usageCount = localStorage.getItem('builder7e-usage-count') || '0';
    const currentCount = parseInt(usageCount);
    
    if (lastUsageDate !== today) {
      // Reset count for new day
      localStorage.setItem('builder7e-last-usage-date', today);
      localStorage.setItem('builder7e-usage-count', '0');
    } else if (currentCount >= config.limits.builder7e.dailyAttempts) {
      // User has reached daily limit
      setError(`You have reached the daily limit (${config.limits.builder7e.dailyAttempts} attempts) for using the Builder7e Tool Creator service. Please try again tomorrow.`);
      setBuildStatus('limited');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Increment usage count
      localStorage.setItem('builder7e-usage-count', (currentCount + 1).toString());
      
      // Set building status and show progress
      setBuildStatus('building');
      setProgress(10);
      
      // Create initial file list to show progress
      const initialFiles = [
        { name: 'main.py', content: 'Main script file', status: 'pending' },
        { name: 'README.md', content: 'Documentation', status: 'pending' },
        { name: 'requirements.txt', content: 'Dependencies', status: 'pending' },
        { name: 'utils.py', content: 'Utility functions', status: 'pending' },
        { name: 'LICENSE', content: 'License file', status: 'pending' }
      ];
      setGeneratedFiles(initialFiles);
      
      // Update progress to show we're connecting to DevilGPT
      setProgress(30);
      updateFileStatus(0, 'in-progress');
      
      // Instead of simulating, we'll use DevilGPT to generate the tool
      // We'll import the function dynamically to avoid issues with SSR
      const { generateToolWithDevilGPT } = await import('../utils/devilGptToolGenerator');
      
      // Call DevilGPT to generate the tool content
      setProgress(50);
      const toolContent = await generateToolWithDevilGPT(concept);
      
      // Update progress and file status
      setProgress(80);
      updateFileStatus(0, 'completed');
      updateFileStatus(1, 'completed');
      updateFileStatus(2, 'completed');
      updateFileStatus(3, 'completed');
      
      // Create a real download URL that points to our API endpoint with the tool content
      // Add useDevilGPT=true parameter to ensure DevilGPT is used for generation
      setDownloadUrl(`/api/download?tool=${encodeURIComponent(concept)}&useDevilGPT=true`);
      
      // Save to user's tools
      const newTool = {
        id: Date.now(),
        name: concept,
        createdAt: new Date().toISOString(),
        files: toolContent.additionalFiles ? toolContent.additionalFiles.length + 2 : 2 // +2 for main file and README
      };
      
      const updatedTools = [...userTools, newTool];
      setUserTools(updatedTools);
      localStorage.setItem('user-tools', JSON.stringify(updatedTools));
      
      // Complete the build
      setProgress(100);
      updateFileStatus(4, 'completed');
      setBuildStatus('completed');
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error building tool with DevilGPT:', error);
      setError('Failed to build tool with DevilGPT. Falling back to template-based generation.');
      
      // Fall back to simulation if DevilGPT fails
      simulateBuildProgress();
      setIsLoading(false);
    }
  };
  
  const handleSelectTemplate = (template) => {
    setConcept(template.template);
    setShowTemplateLibrary(false);
    window.showToast(`Template "${template.name}" loaded successfully`, 'success');
  };

  const handleDownload = () => {
    // Redirect user to the actual download link
    if (concept) {
      // Use the actual API link for download with DevilGPT
      const downloadLink = `/api/download?tool=${encodeURIComponent(concept)}&useDevilGPT=true`;
      
      // Create a dummy link element for download
      const link = document.createElement('a');
      link.href = downloadLink;
      link.download = `${concept}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.showToast(`Downloading "${concept}"...`, 'success');
    } else {
      window.showToast('Download error occurred, please try again', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>Builder7e Tool Creator - Green Hat</title>
        <meta name="description" content="Create custom cybersecurity tools with AI" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Builder7e Tool Creator</h1>
          <p className="text-xl text-gray-400">Transform your ideas into functional tools with AI-powered generation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Tool Concept Input */}
          <div className="bg-secondary rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Tool Concept</h2>
                <div className="text-sm text-gray-400 mt-1">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Remaining attempts today: {remainingAttempts} of {config.limits.builder7e.dailyAttempts}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateLibrary(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded flex items-center transition-colors"
                disabled={buildStatus === 'limited'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                Choose Template
              </button>
            </div>
            <form onSubmit={handleBuild}>
              <div className="mb-4">
                <textarea
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  className="w-full h-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-accent text-white"
                  placeholder="Describe the tool you want to build in detail. For example: 'A network scanner that identifies open ports and potential vulnerabilities on a target system.'"
                  disabled={isLoading || buildStatus === 'building'}
                ></textarea>
              </div>

              {error && (
                <div className="bg-red-900 bg-opacity-20 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={`w-full bg-accent hover:bg-accent-dark text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ${(isLoading || buildStatus === 'building' || buildStatus === 'limited') ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading || buildStatus === 'building' || buildStatus === 'limited' || remainingAttempts <= 0}
              >
                {isLoading ? 'Initializing...' : buildStatus === 'building' ? 'Building...' : buildStatus === 'limited' ? 'Daily Limit Reached' : 'Build Tool'}
              </button>
            </form>

            {buildStatus === 'completed' && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleDownload}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition duration-300"
                >
                  Download Tool ZIP
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Build Status and Generated Files */}
          <div>
            {/* Generated Files Section */}
            <div className="bg-secondary rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Generated Files</h2>
              {generatedFiles.length > 0 ? (
                <div className="space-y-3">
                  {generatedFiles.map((file, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded">
                      <div>
                        <span className="text-white font-mono">{file.name}</span>
                        <p className="text-gray-400 text-sm">{file.content}</p>
                      </div>
                      <div>
                        {file.status === 'pending' && (
                          <span className="bg-yellow-900 text-yellow-500 text-xs px-2 py-1 rounded">Pending</span>
                        )}
                        {file.status === 'completed' && (
                          <span className="bg-green-900 text-green-500 text-xs px-2 py-1 rounded">Generated</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  Files will appear here as they're generated
                </div>
              )}
            </div>

            {/* Build Status Section */}
            <div className="bg-secondary rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">Build Status</h2>
              <div className="mb-2 flex justify-between">
                <span className="text-gray-400">
                  {buildStatus === 'ready' && 'Ready to build'}
                  {buildStatus === 'building' && 'Building your tool...'}
                  {buildStatus === 'completed' && 'Build completed!'}
                  {buildStatus === 'failed' && 'Build failed'}
                </span>
                {buildStatus === 'building' && (
                  <span className="text-accent">{progress}%</span>
                )}
              </div>
              {(buildStatus === 'building' || buildStatus === 'completed') && (
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-accent h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Your Created Tools Section */}
            <div className="bg-secondary rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Your Created Tools</h2>
              {userTools.length > 0 ? (
                <div className="space-y-3">
                  {userTools.map((tool) => (
                    <div key={tool.id} className="bg-gray-800 p-4 rounded">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-bold">{tool.name}</h3>
                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">{tool.files} files</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        Created on {new Date(tool.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center py-8">
                  You haven't created any tools yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-black border border-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm">
            All tools are built using end-to-end encryption and our zero logs policy.
            <br />
            Available on Tor Network: <span className="text-purple-500 font-mono">http://dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion/builder7e</span>
          </p>
        </div>
      </div>
      
      {showTemplateLibrary && (
        <TemplateLibrary 
          onSelectTemplate={handleSelectTemplate} 
          onClose={() => setShowTemplateLibrary(false)} 
        />
      )}
    </div>
  );
};

export default Builder;