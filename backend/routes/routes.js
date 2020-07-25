var express = require('express');
var router = express.Router();
let Routes = require('../models/routes.model').Routes;


//GET List of Routes
router.route('/get-routes').get(function (req, res) {
	Routes.find(function (err, routes) {
        if (err) {
            res.status(500).json(err.stack);
        }
        res.status(200).json({
            routes: routes,
            message: "Routes aquired successfully!"
        });
    })
});

//Post INSTERT A NEW route
router.route('/insert-routes').post(function (req, res) {
	let routes = new Routes();
	routes.trck = req.body;
	routes.save(function (err) {
	    if (err) {
	        res.status(500).json(err.stack);
	        return;
	    }
	    res.status(200).json({ message: 'Route Added Successfully' });
	});
});

//Delete a route
router.route('/delete-route/:id').delete(function (req, res) {
    Routes.deleteOne({ _id: req.params.id }, function (err, route) {
        if (err) {
            res.status(500).json(err.stack);
            return;
        }
        res.status(200).json({ message: 'Route Deleted Successfully' });
    });
});
module.exports = router;