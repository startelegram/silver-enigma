/**
 * Utility functions for handling model-related operations
 */

/**
 * Fetches available models from the API
 * @returns {Promise<Array>} Array of available models or null if error
 */
export const fetchAvailableModels = async () => {
  try {
    const response = await fetch("https://api.se7eneyes.org/v1/models", {
      method: "GET",
      headers: {
        "Authorization": "Bearer sk-7e-v1-622aafb37f01db6e5a937fb97a32047c"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the response based on different possible formats
    if (data.models) {
      return data.models;
    } else if (Array.isArray(data)) {
      return data;
    } else if (data.data && Array.isArray(data.data)) {
      return data.data;
    } else {
      // If we can't determine the format, return the raw data for client-side handling
      console.warn('Unexpected model data format:', data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching models:", error);
    return null;
  }
};

/**
 * Gets model details by ID
 * @param {string} modelId - The ID of the model to fetch
 * @returns {Promise<Object>} Model details or null if error
 */
export const getModelDetails = async (modelId) => {
  try {
    const response = await fetch(`https://api.se7eneyes.org/v1/models/${modelId}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer sk-7e-v1-622aafb37f01db6e5a937fb97a32047c"
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch model details: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for model ${modelId}:`, error);
    return null;
  }
};

/**
 * Checks if a model is available and ready for use
 * @param {string} modelId - The ID of the model to check
 * @returns {Promise<boolean>} True if model is available, false otherwise
 */
export const isModelAvailable = async (modelId) => {
  try {
    const modelDetails = await getModelDetails(modelId);
    return modelDetails && modelDetails.status === 'ready';
  } catch (error) {
    console.error(`Error checking availability for model ${modelId}:`, error);
    return false;
  }
};

/**
 * Gets the appropriate parameters for a specific model
 * @param {string} modelId - The ID of the model
 * @returns {Object} Model-specific parameters
 */
export const getModelParameters = (modelId) => {
  // Default parameters
  const defaultParams = {
    temperature: 0.7,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  };
  
  // Model-specific parameters
  const modelParams = {
    'hackergpt-v1': {
      temperature: 0.8,
      max_tokens: 1000
    },
    'hackergpt-v2': {
      temperature: 0.7,
      max_tokens: 2000,
      advanced_mode: true
    },
    'devilgpt': {
      temperature: 0.9,
      max_tokens: 1500,
      advanced_mode: true,
      tool_generation: true,
      security_level: "maximum"
    },
    'evil-gpt': {
      temperature: 0.85,
      max_tokens: 1200,
      advanced_mode: true
    }
  };
  
  return modelParams[modelId] || defaultParams;
};

/**
 * Formats the API request body based on the model type
 * @param {string} modelId - The ID of the model
 * @param {Array} messages - Array of message objects
 * @returns {Object} Formatted request body
 */
export const formatRequestBody = (modelId, messages) => {
  const params = getModelParameters(modelId);
  
  // Base request body
  const requestBody = {
    model: modelId,
    messages: messages,
    ...params
  };
  
  return requestBody;
};