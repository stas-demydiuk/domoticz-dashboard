const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DASHBOARD_FILE = path.join(__dirname, '../config/dashboard.json');

router.put('/pages/:page/layout/:type', (req, res) => {
    const { page, type } = req.params;
    const layout = req.body;
    const dashboard = JSON.parse(fs.readFileSync(DASHBOARD_FILE));

    dashboard[page].widgets = dashboard[page].widgets.map((widget, index) => ({
        ...widget,
        layout: {
            ...widget.layout,
            [type]: layout[index],
        },
    }));

    fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(dashboard));

    res.sendStatus(200);
});

router.post('/pages/:page/widgets', (req, res) => {
    const page = req.params.page;
    const dashboard = JSON.parse(fs.readFileSync(DASHBOARD_FILE));

    dashboard[page].widgets.push(req.body);
    fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(dashboard));

    res.sendStatus(201);
});

router.patch('/pages/:page/widgets/:index', (req, res) => {
    const page = req.params.page;
    const widgetIndex = parseInt(req.params.index, 10);
    const dashboard = JSON.parse(fs.readFileSync(DASHBOARD_FILE));

    dashboard[page].widgets[widgetIndex] = {
        ...dashboard[page].widgets[widgetIndex],
        ...req.body,
    };

    fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(dashboard));

    res.sendStatus(200);
});

router.delete('/pages/:page/widgets/:index', (req, res) => {
    const page = req.params.page;
    const widgetIndex = parseInt(req.params.index, 10);
    const dashboard = JSON.parse(fs.readFileSync(DASHBOARD_FILE));

    dashboard[page].widgets = dashboard[page].widgets.filter((widget, index) => index !== widgetIndex);
    fs.writeFileSync(DASHBOARD_FILE, JSON.stringify(dashboard));

    res.sendStatus(200);
});

module.exports = router;
