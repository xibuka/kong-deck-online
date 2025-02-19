const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 中间件设置
app.use(bodyParser.json());
app.use(express.static('public'));

// 处理deck命令执行请求
app.post('/execute', (req, res) => {
    const { command } = req.body;
    
    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }

    // 确保命令以 'deck' 开头
    if (!command.trim().startsWith('deck')) {
        return res.status(400).json({ error: 'Only deck commands are allowed' });
    }

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error}`);
            return res.json({ error: `Command execution failed: ${error.message}` });
        }
        res.json({ output: stdout || stderr });
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});