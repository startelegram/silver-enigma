import React from 'react';
import Head from 'next/head';
import DDoSAttackTool from '../components/DDoSAttackTool';
import WebVulnerabilityScanner from '../components/WebVulnerabilityScanner';
import SecurityDashboard from '../components/SecurityDashboard';
import AdvancedSecurityTools from '../components/AdvancedSecurityTools';

const AdvancedSecurityToolsPage = () => {
  return (
    <div className="min-h-screen bg-primary">
      <Head>
        <title>Advanced Security Tools - Green Hat</title>
        <meta name="description" content="Advanced security tools for ethical hacking and penetration testing" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Advanced Security Tools</h1>
          <p className="text-gray-400 max-w-3xl">
            Professional-grade security tools for ethical hackers, penetration testers, and security researchers.
            These tools are provided for educational and authorized testing purposes only.
          </p>
        </div>

        {/* Security Dashboard */}
        <section className="mb-8">
          <SecurityDashboard />
        </section>

        {/* DDoS Attack Tool */}
        <section className="mb-8">
          <DDoSAttackTool />
        </section>

        {/* Web Vulnerability Scanner */}
        <section className="mb-8">
          <WebVulnerabilityScanner />
        </section>

        {/* Other Advanced Security Tools */}
        <section className="mb-8">
          <AdvancedSecurityTools />
        </section>

        {/* Disclaimer */}
        <section className="bg-gray-900 rounded-lg p-6 border-l-4 border-red-500 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Important Disclaimer</h2>
          <p className="text-gray-300">
            All tools provided on this page are intended for educational and research purposes only. 
            The use of these tools for illegal activities is strictly prohibited. Users are responsible for ensuring 
            their activities comply with applicable laws and regulations. Green Hat is not responsible for any misuse 
            of the provided tools and information.
          </p>
        </section>

        {/* Feature Suggestions */}
        <section className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Additional Security Features</h2>
          <p className="text-gray-300 mb-4">
            Here are some additional security tools and features that might interest you:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Network Traffic Analyzer</h3>
              <p className="text-gray-400 text-sm">
                Real-time analysis of network traffic to detect anomalies, intrusions, and suspicious activities.
                Includes packet inspection, protocol analysis, and traffic visualization.
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Exploit Development Framework</h3>
              <p className="text-gray-400 text-sm">
                Advanced framework for developing and testing custom exploits in a controlled environment.
                Includes debugging tools, shellcode generators, and payload encoders.
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Password Cracking Suite</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive password analysis and recovery tools including dictionary attacks,
                brute force methods, rainbow tables, and hash identification capabilities.
              </p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Wireless Network Auditor</h3>
              <p className="text-gray-400 text-sm">
                Tools for assessing the security of wireless networks, including detection of rogue access points,
                weak encryption, and authentication vulnerabilities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdvancedSecurityToolsPage;