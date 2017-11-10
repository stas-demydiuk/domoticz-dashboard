const express = require('express');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/config.json', (req, res) => {
    const server = require('./config/server.json');
    const dashboard = require('./config/dashboard.json');

    res.json({
        server,
        dashboard,
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
