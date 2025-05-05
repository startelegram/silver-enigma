import React from 'react';
import DarkWebInterface from '../components/DarkWebInterface';
import PrivacyFeatures from '../components/PrivacyFeatures';
import DarkWebTools from '../components/DarkWebTools';
import AdvancedCommunitySystem from '../components/AdvancedCommunitySystem';
import SpecializedEducationalFeatures from '../components/SpecializedEducationalFeatures';
import SpecializedAIModels from '../components/SpecializedAIModels';

const AdvancedFeatures = () => {
  return (
    // Layout removed to prevent duplicate navbar
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Green Hat Advanced Features</h1>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Explore our cutting-edge dark web tools and features designed for security professionals and ethical hackers.
          These advanced capabilities provide a comprehensive environment for security research and education.
        </p>
      </div>
      
      <div className="space-y-12">
        {/* Dark Web Interface */}
        <section>
          <DarkWebInterface />
        </section>
        
        {/* Privacy Features */}
        <section>
          <PrivacyFeatures />
        </section>
        
        {/* Dark Web Tools */}
        <section>
          <DarkWebTools />
        </section>
        
        {/* Advanced Community System */}
        <section>
          <AdvancedCommunitySystem />
        </section>
        
        {/* Specialized Educational Features */}
        <section>
          <SpecializedEducationalFeatures />
        </section>
        
        {/* Specialized AI Models */}
        <section>
          <SpecializedAIModels />
        </section>
        
        {/* Disclaimer */}
        <section className="bg-gray-900 rounded-lg p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-bold text-white mb-4">Important Disclaimer</h2>
          <p className="text-gray-300">
            All tools and features provided on Green Hat are intended for educational and research purposes only. 
            The use of these tools for illegal activities is strictly prohibited. Users are responsible for ensuring 
            their activities comply with applicable laws and regulations. Green Hat is not responsible for any misuse 
            of the provided tools and information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AdvancedFeatures;