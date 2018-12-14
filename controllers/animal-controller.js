const Animal = require('../models/model-mongo/animal');
const express = require('express');



class AnimalController {
	constructor() {
		this.app = express();
		this.router = express.Router();
		this.router.get('/animals/:id', this.getAnimal);
		this.router.get('/animals', this.getAnimals);
		this.router.post('/animals', this.postAnimal);
		this.router.put('/animals', this.putAnimal);
		this.router.delete('/animals/:id', this.deleteAnimal);

	}

	getAnimal(req, res) {
		let animal = new Animal({ _id: req.params.id });
		animal
			.load()
			.then((response) => {
				setTimeout(()=>res.send(response), 2000);
			})
			.catch((e) => {
				console.log("get animal error",e);
			});
	}

	postAnimal(req, res, next) {	
		let animalAdded = { 
							type: req.body.type, 
							age: req.body.age, 
							price: req.body.price, 
							nickname: req.body.nickname
						};
		let animal = new Animal(animalAdded);

		animal.create()
			.then((response) => {
				res.send(response);
				return response;
			})
			.catch((e) => {
				console.log("create animal error",e);
			});
	}

	getAnimals(req, res) {
		Animal.getAnimals()
			.then((response) => {
				console.log('get animals ', response)
				setTimeout(()=> res.send(response), 2000);
			})
			.catch((e) => {
				console.log("get animals error", e);
			});
	}

	putAnimal(req, res) {
		console.log("----------------", req.body)
		let animal = new Animal(req.body);
		animal.update()
			.then((response) => {
				res.send(response)})
			.catch((e) => {
				console.log("put animal error", e);
			});
			

	}

	deleteAnimal(req, res) {
		console.log('delete animal', req.params.id)
		let animal = new Animal({ _id: req.params.id });
		animal.remove()
			.then((response)=>{
				res.send(response);
				return (response);
			})
			.catch((e) => {
				console.log(e);
			});
	}
}

module.exports = AnimalController;

