var PracticeController = require('./practiceController');

const practiceRoutes = (app, db) => {
    "use strict";
    const controller = new PracticeController(db);

    app.route('/api/practice/create').
    post((req, res) => {
        controller.insertPractice(req.body)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/practice/:id/head/:userId/assign').
    put((req, res) => {
        controller.assignPracticeHead(req.params.id, req.params.userId)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/practice/:id/manager/:userId/assign').
    put((req, res) => {
        controller.assignPracticeManager(req.params.id, req.params.userId)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/practice/:id/details').
    get((req, res) => {
        controller.getPractice(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });
};

module.exports = practiceRoutes;
