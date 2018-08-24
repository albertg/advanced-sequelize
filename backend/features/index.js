var employeeRoutes = require('./employee/routes');
var buRoutes = require('./businessUnit/routes');
var practiceRoutes = require('./practice/routes');

var registerRoutes = (app, db) => {
    "use strict";
    employeeRoutes(app, db);
    buRoutes(app, db);
    practiceRoutes(app, db);
};

module.exports = registerRoutes;