const express = require('express');
const AnimalController = require('./controllers/animal-controller');
const TypesController = require ('./controllers/type-controller')
const bodyParser = require('body-parser');


class Application {
	constructor() {
		try {
			this.app = express();
			this.init();

		} catch(e) {
			throw new Error(e);
		}
	}

	init() {
		console.log('init')
		this.app.use(function (req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
			next();
		});
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		const animalController = new AnimalController();
		const typeController = new TypesController();
		this.app.listen(3012, () => {
			console.log('Server running')});
		this.app.use(animalController.router);
		this.app.use(typeController.router);
	}
}

module.exports = Application;

