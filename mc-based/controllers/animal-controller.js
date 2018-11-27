const Animal = require('../models/animal');
const express = require('express');



class AnimalController {
	constructor() {
		this.app = express()

		this.router = express.Router();
		this.router.get('/animals/:id', this.getAnimal);
		this.router.get('/animals/:id', Animal.getAnimals);
		this.router.post('/animals', this.postAnimal)
	}

	getAnimal(req, res, next) {
		let animal = new Animal;
		animal

			.load(req.params.id)
			.then((response) => {
				console.log("get animal", response)
				res.send(response)
			})
			.catch((e) => {

			});
	}

	postAnimal(req, res, next) {
		let animal = new Animal;
		var animalType = req.body.type;
		var animalAge = Number(req.body.age);
		var animalPrice = Number(req.body.price);
		var animalNickname = req.body.nickname;
		var creationDate = new Date();
		var editDate = new Date();
		var animal = { type: animalType, age: animalAge, price: animalPrice, nickname: animalNickname, createdAt: creationDate, updatedAt: editDate };
		animal.create()
			.then

	}

	putAnimal() {

	}

	deleteAnimal() {

	}

	init() {

	}
}

module.exports = AnimalController;

