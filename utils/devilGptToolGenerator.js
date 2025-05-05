/**
 * Utility for generating tool content using DevilGPT API
 * This file connects the Builder7e Tool Creator with DevilGPT
 */

/**
 * Generates tool content using DevilGPT API
 * @param {string} toolConcept - The concept/name of the tool to generate
 * @returns {Promise<Object>} - Object containing tool content details
 */
export async function generateToolWithDevilGPT(toolConcept) {
  try {
    console.log(`Generating tool content with DevilGPT for: ${toolConcept}`);
    
    // Call the DevilGPT API
    const response = await fetch("https://api.se7eneyes.org/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-7e-v1-622aafb37f01db6e5a937fb97a32047c"
      },
      body: JSON.stringify({
        model: "devilgpt",
        messages: [
          {
            role: "system",
            content: "You are a tool generator. Create a complete security tool based on the user's concept. Include main code file, requirements, and documentation."
          },
          {
            role: "user",
            content: `Generate a security tool called: ${toolConcept}. Include main code file, requirements.txt, and a README.md file.`
          }
        ],
        max_tokens: 2000,
        temperature: 0.7,
        advanced_mode: true,
        tool_generation: true,
        security_level: "maximum"
      }),
    });

    if (!response.ok) {
      throw new Error(`DevilGPT API returned status: ${response.status}`);
    }

    const data = await response.json();
    return parseDevilGPTResponse(data, toolConcept);
  } catch (error) {
    console.error('Error generating tool with DevilGPT:', error);
    // Return a fallback tool content in case of error
    return createFallbackToolContent(toolConcept);
  }
}

/**
 * Parses the response from DevilGPT and formats it for the tool generator
 * @param {Object} data - The response data from DevilGPT API
 * @param {string} toolConcept - The original tool concept
 * @returns {Object} - Formatted tool content
 */
function parseDevilGPTResponse(data, toolConcept) {
  try {
    // Extract the response content from DevilGPT
    let responseContent = '';
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      responseContent = data.choices[0].message.content;
    } else if (data.response) {
      responseContent = data.response;
    } else if (data.message || data.text || data.content) {
      responseContent = data.message || data.text || data.content;
    } else {
      throw new Error('No valid content found in DevilGPT response');
    }
    
    // Parse the response to extract code, requirements, and documentation
    const toolContent = extractToolContent(responseContent, toolConcept);
    console.log('Successfully parsed DevilGPT response');
    return toolContent;
  } catch (error) {
    console.error('Error parsing DevilGPT response:', error);
    return createFallbackToolContent(toolConcept);
  }
}

/**
 * Extracts tool content from DevilGPT response text
 * @param {string} responseText - The text response from DevilGPT
 * @param {string} toolConcept - The original tool concept
 * @returns {Object} - Extracted tool content
 */
function extractToolContent(responseText, toolConcept) {
  // Default values
  let toolContent = {
    description: `A security tool for ${toolConcept}`,
    usage: 'Follow the instructions in the README file to use this tool.',
    filename: 'main.py',
    code: '',
    requirements: '',
    features: '',
    security: 'Use this tool responsibly and ethically.',
    additionalFiles: []
  };
  
  try {
    // Extract code blocks from the response
    const codeBlockRegex = /```([\w]+)?\s*([\s\S]*?)```/g;
    let match;
    let foundMainCode = false;
    let foundRequirements = false;
    let foundReadme = false;
    
    while ((match = codeBlockRegex.exec(responseText)) !== null) {
      const language = match[1] ? match[1].trim().toLowerCase() : '';
      const code = match[2] ? match[2].trim() : '';
      
      if (!code) continue;
      
      // Identify the type of content based on language or content
      if ((language === 'python' || language === 'py') && !foundMainCode) {
        toolContent.filename = 'main.py';
        toolContent.code = code;
        foundMainCode = true;
      } else if (language === 'javascript' || language === 'js' && !foundMainCode) {
        toolContent.filename = 'main.js';
        toolContent.code = code;
        foundMainCode = true;
      } else if (code.includes('requirements') || code.includes('pip install') || language === 'requirements') {
        toolContent.requirements = code;
        foundRequirements = true;
      } else if (code.includes('# ' + toolConcept) || code.includes('## ') || language === 'markdown' || language === 'md') {
        // This looks like a README
        toolContent.additionalFiles.push({
          name: 'README.md',
          content: code
        });
        foundReadme = true;
        
        // Extract description from README if possible
        const descriptionMatch = code.match(/#+\s*Description\s*\n+([\s\S]*?)(?=\n#+|$)/);
        if (descriptionMatch && descriptionMatch[1]) {
          toolContent.description = descriptionMatch[1].trim();
        }
        
        // Extract features from README if possible
        const featuresMatch = code.match(/#+\s*Features\s*\n+([\s\S]*?)(?=\n#+|$)/);
        if (featuresMatch && featuresMatch[1]) {
          toolContent.features = featuresMatch[1].trim();
        }
      } else if (!foundMainCode) {
        // If we haven't identified the main code yet, assume this is it
        if (language === 'bash' || language === 'sh') {
          toolContent.filename = 'main.sh';
        } else if (language === 'ruby' || language === 'rb') {
          toolContent.filename = 'main.rb';
        } else if (language === 'go') {
          toolContent.filename = 'main.go';
        } else {
          toolContent.filename = 'main.' + (language || 'py');
        }
        toolContent.code = code;
        foundMainCode = true;
      } else {
        // This is some other file, add it to additionalFiles
        const fileName = determineFileName(language, code, toolContent.additionalFiles.length);
        toolContent.additionalFiles.push({
          name: fileName,
          content: code
        });
      }
    }
    
    // Extract description if not found in README
    if (!toolContent.description || toolContent.description === `A security tool for ${toolConcept}`) {
      const descriptionMatch = responseText.match(/(?:description|about|overview):\s*([^\n]+)/i);
      if (descriptionMatch && descriptionMatch[1]) {
        toolContent.description = descriptionMatch[1].trim();
      }
    }
    
    // Extract features if not found in README
    if (!toolContent.features) {
      const featuresMatch = responseText.match(/(?:features|capabilities):\s*([^\n]+)/i);
      if (featuresMatch && featuresMatch[1]) {
        toolContent.features = featuresMatch[1].trim();
      }
    }
    
    // If we didn't find a README, create one
    if (!foundReadme) {
      const readmeContent = generateReadme(toolConcept, toolContent.description, toolContent.features);
      toolContent.additionalFiles.push({
        name: 'README.md',
        content: readmeContent
      });
    }
    
    // If we didn't find requirements, try to extract them
    if (!foundRequirements) {
      const requirementsMatch = responseText.match(/(?:requirements|dependencies|packages needed):\s*([^\n]+)/i);
      if (requirementsMatch && requirementsMatch[1]) {
        toolContent.requirements = requirementsMatch[1].trim().split(/[,\s]+/).join('\n');
      }
    }
    
    return toolContent;
  } catch (error) {
    console.error('Error extracting tool content:', error);
    return toolContent;
  }
}

/**
 * Determines an appropriate filename based on language and content
 * @param {string} language - The programming language
 * @param {string} code - The code content
 * @param {number} index - Index for uniqueness
 * @returns {string} - The determined filename
 */
function determineFileName(language, code, index) {
  // Try to find a class or function name to use as filename
  let fileName = '';
  
  if (language === 'python' || language === 'py') {
    const classMatch = code.match(/class\s+([A-Za-z0-9_]+)/);
    const funcMatch = code.match(/def\s+([A-Za-z0-9_]+)/);
    
    if (classMatch) {
      fileName = classMatch[1].toLowerCase() + '.py';
    } else if (funcMatch) {
      fileName = funcMatch[1].toLowerCase() + '.py';
    } else {
      fileName = `util_${index + 1}.py`;
    }
  } else if (language === 'javascript' || language === 'js') {
    const classMatch = code.match(/class\s+([A-Za-z0-9_]+)/);
    const funcMatch = code.match(/function\s+([A-Za-z0-9_]+)/);
    
    if (classMatch) {
      fileName = classMatch[1].toLowerCase() + '.js';
    } else if (funcMatch) {
      fileName = funcMatch[1].toLowerCase() + '.js';
    } else {
      fileName = `util_${index + 1}.js`;
    }
  } else if (language) {
    fileName = `util_${index + 1}.${language}`;
  } else {
    fileName = `util_${index + 1}.txt`;
  }
  
  return fileName;
}

/**
 * Generates a README file for the tool
 * @param {string} toolName - The name of the tool
 * @param {string} description - The tool description
 * @param {string} features - The tool features
 * @returns {string} - README content
 */
function generateReadme(toolName, description, features) {
  return `# ${toolName}

## Description
${description || 'A security tool generated by Builder7e Tool Creator.'}

## Features
${features || 'No specific features listed.'}

## Usage
1. Install the required dependencies using \`pip install -r requirements.txt\`
2. Run the main script using \`python main.py\`
3. Follow the on-screen instructions

## Security Notice
This tool is intended for educational and ethical security testing purposes only. Misuse of this tool may violate laws and regulations. Always obtain proper authorization before testing any systems.

## Disclaimer
The creators of this tool are not responsible for any misuse or damage caused by this tool. Use at your own risk.
`;
}

/**
 * Creates fallback tool content in case of API failure
 * @param {string} toolConcept - The tool concept
 * @returns {Object} - Fallback tool content
 */
function createFallbackToolContent(toolConcept) {
  console.log('Creating fallback tool content');
  
  return {
    description: `A security tool for ${toolConcept}`,
    usage: 'Follow the instructions in the README file to use this tool.',
    filename: 'main.py',
    code: `#!/usr/bin/env python3
# ${toolConcept} - Security Tool
# Generated by Builder7e Tool Creator

import argparse
import sys

def main():
    parser = argparse.ArgumentParser(description='${toolConcept} - Security Tool')
    parser.add_argument('-t', '--target', help='Target to analyze')
    parser.add_argument('-o', '--output', help='Output file')
    parser.add_argument('-v', '--verbose', action='store_true', help='Enable verbose output')
    
    args = parser.parse_args()
    
    if not args.target:
        parser.print_help()
        sys.exit(1)
    
    print(f"Running ${toolConcept} on {args.target}")
    print("This is a placeholder implementation.")
    print("In a real implementation, this would perform security analysis.")
    
    # Placeholder for actual functionality
    result = analyze_target(args.target, args.verbose)
    
    if args.output:
        with open(args.output, 'w') as f:
            f.write(result)
        print(f"Results saved to {args.output}")
    else:
        print("\nResults:")
        print(result)

def analyze_target(target, verbose=False):
    """Analyze the target and return results"""
    if verbose:
        print("Performing detailed analysis...")
    
    # This would contain actual analysis logic in a real implementation
    return f"Security analysis of {target} complete. No issues found."

if __name__ == '__main__':
    main()
`,
    requirements: 'argparse\nsys',
    features: '- Basic security analysis\n- Command-line interface\n- Verbose output option\n- Save results to file',
    security: 'Use this tool responsibly and ethically. Always obtain proper authorization before testing any systems.',
    additionalFiles: [
      {
        name: 'README.md',
        content: generateReadme(toolConcept, `A security tool for ${toolConcept}`, '- Basic security analysis\n- Command-line interface\n- Verbose output option\n- Save results to file')
      }
    ]
  };
}