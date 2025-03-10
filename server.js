const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));

// Validate input parameters
const validateEndpoint = (endpoint) => {
    // Validate endpoint URL format
    const urlPattern = /^https?:\/\/[\w\.-]+(:\d+)?(\/[\w\.-]*)*\/?$/;
    return urlPattern.test(endpoint);
};

const validateToken = (token) => {
    // Validate token contains only allowed characters
    return /^[\w\-\.]+$/.test(token);
};

const validateControlPlaneName = (name) => {
    // Validate control plane name contains only allowed characters
    return /^[\w\-\.]+$/.test(name);
};

// Execute deck command directly on host
const executeDeckCommand = (commandArgs, res) => {
    // Execute deck command directly on host system
    const deckCommand = 'deck';
    
    exec(deckCommand + ' ' + commandArgs.join(' '), (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error}`);
            return res.status(500).json({ error: `Command execution failed: ${error.message}` });
        }
        res.json({ output: stdout || stderr });
    });
};

// API endpoint for Kong Enterprise operations
app.post('/api/enterprise/:operation', (req, res) => {
    const { operation } = req.params;
    const { endpoint, token } = req.body;
    
    // Validate operation
    if (!['ping', 'dump'].includes(operation)) {
        return res.status(400).json({ error: 'Invalid operation. Supported operations: ping, dump' });
    }
    
    // Validate required parameters
    if (!endpoint) {
        return res.status(400).json({ error: 'Kong Admin API endpoint is required' });
    }
    
    // Validate endpoint format
    if (!validateEndpoint(endpoint)) {
        return res.status(400).json({ error: 'Invalid endpoint format' });
    }
    
    // Validate token if provided
    if (token && !validateToken(token)) {
        return res.status(400).json({ error: 'Invalid token format' });
    }
    
    // Build command arguments array
    const commandArgs = ['gateway', operation, '--kong-addr', endpoint];
    
    // Add token if provided
    if (token) {
        commandArgs.push('--headers', `"kong-admin-token: ${token}"`);
    }
    
    // Execute command
    executeDeckCommand(commandArgs, res);
});

// API endpoint for Konnect operations
app.post('/api/konnect/:operation', (req, res) => {
    const { operation } = req.params;
    const { controlPlane, pat } = req.body;
    
    // Validate operation
    if (!['ping', 'dump'].includes(operation)) {
        return res.status(400).json({ error: 'Invalid operation. Supported operations: ping, dump' });
    }
    
    // Validate required parameters
    if (!controlPlane) {
        return res.status(400).json({ error: 'Konnect Control Plane name is required' });
    }
    
    // Validate control plane name
    if (!validateControlPlaneName(controlPlane)) {
        return res.status(400).json({ error: 'Invalid control plane name format' });
    }
    
    // Validate PAT if provided
    if (pat && !validateToken(pat)) {
        return res.status(400).json({ error: 'Invalid PAT format' });
    }
    
    // Build command arguments array
    const commandArgs = ['gateway', operation, '--konnect-control-plane-name', controlPlane];
    
    // Add PAT if provided
    if (pat) {
        commandArgs.push('--konnect-token', pat);
    }
    
    // Execute command
    executeDeckCommand(commandArgs, res);
});

// Legacy endpoint - deprecated, will be removed in future versions
app.get('/execute', (req, res) => {
    return res.status(410).json({ 
        error: 'This endpoint is deprecated for security reasons. Please use the new API endpoints: POST /api/enterprise/:operation or POST /api/konnect/:operation' 
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});