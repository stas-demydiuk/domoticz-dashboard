const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 9000;
const HOST = process.env.HOST || '0.0.0.0';

const app = express();

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use('/dashboard', require('./dashboard'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/config.json', (req, res) => {
    const server = JSON.parse(fs.readFileSync('./config/server.json'));
    const dashboard = JSON.parse(fs.readFileSync('./config/dashboard.json'));

    res.json({
        server,
        dashboard,
    });
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
