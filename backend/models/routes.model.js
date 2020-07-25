var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutesSchema = new Schema({
	trck: [[Number, Number]],
});

const Routes = mongoose.model('routes', RoutesSchema);

module.exports = {
    RoutesSchema: RoutesSchema,
    Routes: Routes
};