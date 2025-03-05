const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(express.static('public'));

// Handle deck command execution request
app.get('/execute', (req, res) => {
    const command = req.query.command;
    
    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    // Ensure command starts with 'deck' and contains only allowed characters
    if (!command.trim().startsWith('deck') || !/^[a-zA-Z0-9\s\-_="\/\.:]+$/.test(command)) {
        return res.status(400).json({ error: 'Invalid command format or characters' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error}`);
            return res.json({ error: `Command execution failed: ${error.message}` });
        }
        res.json({ output: stdout || stderr });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});