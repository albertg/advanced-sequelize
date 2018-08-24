var BusinessUnitController = require('./businessUnitController');

const buRoutes = (app, db) => {
    "use strict";
    const controller = new BusinessUnitController(db);

    app.route('/api/bu/create')
    .post((req, res) => {
        controller.insertBusinessUnit(req.body)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });

    app.route('/api/bu/:id/details')
    .get((req, res) => {
        controller.getBUDetails(req.params.id)
        .then(result => {
            res.json(result);
        }).catch(err => {
            res.status(500).json({ error: err.toString() });
        });
    });
};

module.exports = buRoutes;
