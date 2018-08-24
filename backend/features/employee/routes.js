var EmployeeController = require('./employeeController');

const employeeRoutes = (app, db) => {
    "use strict";
    const controller = new EmployeeController(db);  
    
    app.route('/api/user/:id/practice/head')
    .get((req, res) => {
        controller.getPracticeHeadDetails(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/user/:id/practice/manager')
    .get((req, res) => {
        controller.getPracticeManagerDetails(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/user/:id/practice/mentor')
    .get((req, res) => {
        controller.getMentorDetails(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/user/:id/practice/mentee')
    .get((req, res) => {
        controller.getMenteeDetails(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/user/mentee/add')
    .post((req, res) => {
        controller.addUser(req.body)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });
};

module.exports = employeeRoutes;