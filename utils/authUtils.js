/**
 * Utility functions for authentication and authorization
 */
import { supabase } from './supabaseClient';

/**
 * Verify if the user is authenticated
 * @param {Object} req - The request object
 * @returns {Promise<Object>} - The session object if authenticated, null otherwise
 */
export async function getSession(req) {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1] || '';
  
  if (!token) {
    return null;
  }
  
  try {
    // Verify the token with Supabase
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      console.error('Authentication error:', error);
      return null;
    }
    
    return {
      user: data.user,
      token
    };
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}

/**
 * Check if the user has the required permissions
 * @param {Object} session - The session object
 * @param {Array} requiredPermissions - Array of required permissions
 * @returns {Promise<boolean>} - True if the user has the required permissions
 */
export async function hasPermissions(session, requiredPermissions = []) {
  if (!session || !session.user) {
    return false;
  }
  
  // If no specific permissions are required, just being authenticated is enough
  if (requiredPermissions.length === 0) {
    return true;
  }
  
  try {
    // Get user permissions from the database
    const { data, error } = await supabase
      .from('user_permissions')
      .select('permission')
      .eq('user_id', session.user.id);
    
    if (error || !data) {
      console.error('Error fetching user permissions:', error);
      return false;
    }
    
    // Extract permission names
    const userPermissions = data.map(p => p.permission);
    
    // Check if the user has all required permissions
    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
}

/**
 * Middleware to protect API routes
 * @param {Function} handler - The API route handler
 * @param {Array} requiredPermissions - Array of required permissions
 * @returns {Function} - The protected handler
 */
export function withAuth(handler, requiredPermissions = []) {
  return async (req, res) => {
    // Get the session
    const session = await getSession(req);
    
    // Check if the user is authenticated
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Check if the user has the required permissions
    if (requiredPermissions.length > 0) {
      const hasAccess = await hasPermissions(session, requiredPermissions);
      
      if (!hasAccess) {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }
    
    // Add the session to the request object
    req.session = session;
    
    // Call the original handler
    return handler(req, res);
  };
}

/**
 * Get the current user's API keys
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} - Array of API keys
 */
export async function getUserApiKeys(userId) {
  if (!userId) {
    return [];
  }
  
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, created_at, last_used, permissions')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching API keys:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('API key fetch error:', error);
    return [];
  }
}

/**
 * Create a new API key for a user
 * @param {string} userId - The user ID
 * @param {string} name - The name of the API key
 * @param {Array} permissions - Array of permissions for this key
 * @returns {Promise<Object>} - The created API key
 */
export async function createApiKey(userId, name, permissions = []) {
  if (!userId || !name) {
    throw new Error('User ID and key name are required');
  }
  
  try {
    // Generate a secure random API key
    const key = generateSecureKey();
    const keyPrefix = key.substring(0, 8);
    
    // Store the hashed key in the database
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: userId,
        name,
        key_prefix: keyPrefix,
        key_hash: await hashKey(key),
        permissions
      })
      .select('id, name, key_prefix, created_at');
    
    if (error) {
      console.error('Error creating API key:', error);
      throw new Error('Failed to create API key');
    }
    
    // Return the full key only once (it won't be retrievable later)
    return {
      ...data[0],
      key: `sk-7e-${key}` // Format: sk-7e-{random_string}
    };
  } catch (error) {
    console.error('API key creation error:', error);
    throw error;
  }
}

/**
 * Generate a secure random API key
 * @returns {string} - A secure random string
 */
function generateSecureKey() {
  const crypto = require('crypto');
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash an API key for secure storage
 * @param {string} key - The API key to hash
 * @returns {Promise<string>} - The hashed key
 */
async function hashKey(key) {
  const crypto = require('crypto');
  return new Promise((resolve, reject) => {
    // Use a secure hashing algorithm with salt
    crypto.scrypt(key, process.env.API_KEY_SALT || 'se7eneyes-salt', 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
}