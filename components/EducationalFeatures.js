import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const EducationalFeatures = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([]);
  const [labs, setLabs] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null);
  
  // Mock data for courses
  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: 'Advanced Penetration Testing',
        description: 'Master the art of penetration testing with advanced techniques and methodologies.',
        level: 'Advanced',
        duration: '8 weeks',
        modules: 12,
        rating: 4.9,
        students: 1243,
        progress: 35,
        instructor: 'CyberHunter',
        instructorVerified: true,
        tags: ['penetration testing', 'ethical hacking', 'security']
      },
      {
        id: 2,
        title: 'Secure Coding Practices',
        description: 'Learn how to write secure code and prevent common vulnerabilities in your applications.',
        level: 'Intermediate',
        duration: '6 weeks',
        modules: 10,
        rating: 4.7,
        students: 987,
        progress: 60,
        instructor: 'SecureCoder',
        instructorVerified: true,
        tags: ['secure coding', 'development', 'security']
      },
      {
        id: 3,
        title: 'Malware Analysis and Reverse Engineering',
        description: 'Analyze malicious software and understand its behavior through reverse engineering techniques.',
        level: 'Advanced',
        duration: '10 weeks',
        modules: 15,
        rating: 4.8,
        students: 756,
        progress: 0,
        instructor: 'MalwareHunter',
        instructorVerified: true,
        tags: ['malware', 'reverse engineering', 'security']
      },
      {
        id: 4,
        title: 'Network Security Fundamentals',
        description: 'Build a solid foundation in network security principles and practices.',
        level: 'Beginner',
        duration: '4 weeks',
        modules: 8,
        rating: 4.6,
        students: 1567,
        progress: 100,
        instructor: 'NetworkNinja',
        instructorVerified: false,
        tags: ['network', 'security', 'fundamentals']
      },
    ];
    setCourses(mockCourses);
    
    // Mock labs
    const mockLabs = [
      {
        id: 1,
        title: 'Web Application Penetration Testing Lab',
        description: 'Practice penetration testing techniques on vulnerable web applications.',
        difficulty: 'Medium',
        environment: 'Web',
        scenarios: 8,
        status: 'ready',
        estimatedTime: '4 hours',
        tags: ['web', 'penetration testing', 'security']
      },
      {
        id: 2,
        title: 'Network Traffic Analysis Lab',
        description: 'Analyze network traffic to identify and respond to security incidents.',
        difficulty: 'Hard',
        environment: 'Network',
        scenarios: 6,
        status: 'ready',
        estimatedTime: '3 hours',
        tags: ['network', 'traffic analysis', 'security']
      },
      {
        id: 3,
        title: 'Malware Behavior Analysis Lab',
        description: 'Analyze malware behavior in a controlled environment.',
        difficulty: 'Hard',
        environment: 'Sandbox',
        scenarios: 5,
        status: 'ready',
        estimatedTime: '5 hours',
        tags: ['malware', 'analysis', 'security']
      },
      {
        id: 4,
        title: 'Secure Coding Practice Lab',
        description: 'Practice secure coding techniques and identify vulnerabilities in code.',
        difficulty: 'Medium',
        environment: 'Development',
        scenarios: 10,
        status: 'ready',
        estimatedTime: '6 hours',
        tags: ['coding', 'development', 'security']
      },
    ];
    setLabs(mockLabs);
    
    // Mock certifications
    const mockCertifications = [
      {
        id: 1,
        title: 'Certified Ethical Hacker (Advanced)',
        description: 'Demonstrate advanced knowledge and skills in ethical hacking and penetration testing.',
        requirements: ['Complete Advanced Penetration Testing course', 'Pass the certification exam with 80% or higher', 'Complete at least 5 related labs'],
        level: 'Advanced',
        examDuration: '3 hours',
        validity: '2 years',
        status: 'eligible'
      },
      {
        id: 2,
        title: 'Secure Code Developer',
        description: 'Certify your ability to write secure code and identify vulnerabilities in applications.',
        requirements: ['Complete Secure Coding Practices course', 'Pass the certification exam with 75% or higher', 'Submit a secure coding project for review'],
        level: 'Intermediate',
        examDuration: '2 hours',
        validity: '2 years',
        status: 'in progress'
      },
      {
        id: 3,
        title: 'Network Security Specialist',
        description: 'Validate your expertise in network security principles and practices.',
        requirements: ['Complete Network Security Fundamentals course', 'Pass the certification exam with 70% or higher', 'Complete at least 3 related labs'],
        level: 'Intermediate',
        examDuration: '2 hours',
        validity: '2 years',
        status: 'completed',
        completionDate: '2023-05-15'
      },
    ];
    setCertifications(mockCertifications);
  }, []);

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const handleLabSelect = (lab) => {
    setSelectedLab(lab);
  };

  // Function to render progress bar
  const ProgressBar = ({ progress, className }) => {
    return (
      <div className={`w-full bg-gray-700 rounded-full h-2 ${className}`}>
        <div 
          className="bg-accent h-2 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-800">
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'courses' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('courses')}
        >
          Interactive Courses
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'labs' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('labs')}
        >
          Virtual Labs
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'certifications' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
          onClick={() => setActiveTab('certifications')}
        >
          Certifications
        </button>
      </div>

      <div className="p-6">
        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Interactive Security Courses</h3>
            <p className="text-gray-400 mb-6">
              Comprehensive courses designed to enhance your security skills with hands-on exercises and real-world scenarios.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-colors ${selectedCourse?.id === course.id ? 'border-accent' : 'hover:border-gray-600'}`}
                  onClick={() => handleCourseSelect(course)}
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold">{course.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${course.level === 'Advanced' ? 'bg-red-900/30 text-red-400' : course.level === 'Intermediate' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-400 text-sm">By {course.instructor}</span>
                      {course.instructorVerified && (
                        <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                      <span>{course.modules} modules</span>
                      <span>Duration: {course.duration}</span>
                    </div>
                    
                    <ProgressBar progress={course.progress} className="mb-2" />
                    
                    <div className="flex justify-between items-center text-xs mb-4">
                      <span className="text-gray-400">Progress: {course.progress}%</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-gray-400">{course.rating} ({course.students} students)</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-accent hover:bg-accent-dark text-white py-2 rounded text-sm transition-colors">
                      {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedCourse && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <h4 className="text-white font-bold mb-3">{selectedCourse.title} - Course Details</h4>
                <p className="text-gray-300 text-sm mb-4">{selectedCourse.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Level</h5>
                    <p className="text-gray-300">{selectedCourse.level}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Duration</h5>
                    <p className="text-gray-300">{selectedCourse.duration}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Modules</h5>
                    <p className="text-gray-300">{selectedCourse.modules} modules</p>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h5 className="text-white text-sm font-medium mb-2">Course Outline</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Introduction to {selectedCourse.title}</li>
                    <li>• Core Concepts and Methodologies</li>
                    <li>• Practical Techniques and Tools</li>
                    <li>• Hands-on Exercises</li>
                    <li>• Advanced Scenarios</li>
                    <li>• Real-world Case Studies</li>
                    <li>• Final Assessment</li>
                  </ul>
                </div>
                
                <div className="flex space-x-3">
                  <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm transition-colors flex-1">
                    {selectedCourse.progress > 0 ? 'Continue Course' : 'Start Course'}
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    View Syllabus
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Labs Tab */}
        {activeTab === 'labs' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Virtual Security Labs</h3>
            <p className="text-gray-400 mb-6">
              Practice security techniques in realistic environments with guided scenarios and challenges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {labs.map((lab) => (
                <div 
                  key={lab.id} 
                  className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-colors ${selectedLab?.id === lab.id ? 'border-accent' : 'hover:border-gray-600'}`}
                  onClick={() => handleLabSelect(lab)}
                >
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-bold">{lab.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${lab.difficulty === 'Hard' ? 'bg-red-900/30 text-red-400' : lab.difficulty === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'}`}>
                        {lab.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm">{lab.environment} Environment</span>
                      <span className="ml-2 bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">
                        {lab.status === 'ready' ? 'Ready' : 'Maintenance'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-4">{lab.description}</p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                      <span>{lab.scenarios} scenarios</span>
                      <span>Est. time: {lab.estimatedTime}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lab.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full bg-accent hover:bg-accent-dark text-white py-2 rounded text-sm transition-colors">
                      Launch Lab
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedLab && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3">{selectedLab.title} - Lab Details</h4>
                <p className="text-gray-300 text-sm mb-4">{selectedLab.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Difficulty</h5>
                    <p className="text-gray-300">{selectedLab.difficulty}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Environment</h5>
                    <p className="text-gray-300">{selectedLab.environment}</p>
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <h5 className="text-white text-sm font-medium mb-1">Estimated Time</h5>
                    <p className="text-gray-300">{selectedLab.estimatedTime}</p>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h5 className="text-white text-sm font-medium mb-2">Scenarios</h5>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Scenario 1: Initial Assessment</li>
                    <li>• Scenario 2: Vulnerability Identification</li>
                    <li>• Scenario 3: Exploitation Techniques</li>
                    <li>• Scenario 4: Post-Exploitation</li>
                    <li>• Scenario 5: Remediation Strategies</li>
                    {selectedLab.scenarios > 5 && (
                      <li>• +{selectedLab.scenarios - 5} more scenarios</li>
                    )}
                  </ul>
                </div>
                
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <h5 className="text-white text-sm font-medium mb-2">Requirements</h5>
                  <p className="text-gray-300 text-sm">This lab requires basic knowledge of {selectedLab.environment.toLowerCase()} security concepts. Completion of related courses is recommended but not required.</p>
                </div>
                
                <div className="flex space-x-3">
                  <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-md text-sm transition-colors flex-1">
                    Launch Lab
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    View Prerequisites
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Security Certifications</h3>
            <p className="text-gray-400 mb-6">
              Validate your security skills with industry-recognized certifications. Complete courses and pass exams to earn credentials.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
                  <div className={`p-4 border-b border-gray-700 ${cert.status === 'completed' ? 'bg-green-900/20' : cert.status === 'in progress' ? 'bg-blue-900/20' : 'bg-gray-700/20'}`}>
                    <div className="flex justify-between items-start">
                      <h4 className="text-white font-bold">{cert.title}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cert.level === 'Advanced' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                        {cert.level}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-300 text-sm mb-4">{cert.description}</p>
                    
                    <div className="bg-gray-700 p-3 rounded-lg mb-4">
                      <h5 className="text-white text-sm font-medium mb-2">Requirements</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {cert.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
                      <span>Exam Duration: {cert.examDuration}</span>
                      <span>Validity: {cert.validity}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      {cert.status === 'completed' ? (
                        <span className="text-gray-400 text-sm">Completed on: {new Date(cert.completionDate).toLocaleDateString()}</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Status: {cert.status === 'in progress' ? 'In Progress' : 'Eligible'}</span>
                      )}
                      
                      {cert.status === 'completed' && (
                        <span className="bg-green-900/30 text-green-400 text-xs px-2 py-0.5 rounded-full">
                          Certified
                        </span>
                      )}
                    </div>
                    
                    <button 
                      className={`w-full py-2 rounded text-sm ${cert.status === 'completed' ? 'bg-gray-700 text-gray-300' : 'bg-accent hover:bg-accent-dark text-white'}`}
                    >
                      {cert.status === 'completed' ? 'View Certificate' : cert.status === 'in progress' ? 'Continue Certification' : 'Start Certification'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h4 className="text-white font-bold mb-3">Certification Path</h4>
              <p className="text-gray-300 text-sm mb-4">Follow our recommended certification path to build your security credentials progressively.</p>
              
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700"></div>
                
                <div className="ml-8 space-y-6">
                  <div className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-gray-800"></div>
                    <h5 className="text-white font-medium">Network Security Specialist</h5>
                    <p className="text-gray-400 text-sm">Beginner level certification - Completed</p>
                  </div>
                  
                  <div className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-gray-800"></div>
                    <h5 className="text-white font-medium">Secure Code Developer</h5>
                    <p className="text-gray-400 text-sm">Intermediate level certification - In Progress</p>
                  </div>
                  
                  <div className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                    <h5 className="text-white font-medium">Certified Ethical Hacker (Advanced)</h5>
                    <p className="text-gray-400 text-sm">Advanced level certification - Eligible</p>
                  </div>
                  
                  <div className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-gray-600 border-2 border-gray-800"></div>
                    <h5 className="text-white font-medium">Security Architect</h5>
                    <p className="text-gray-400 text-sm">Expert level certification - Not yet eligible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalFeatures;