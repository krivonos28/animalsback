const db = require('./db');
const ObjectID = require('mongodb').ObjectID;

class Animal {
	constructor() {
		this._id = '';
		this.nickname = '';
		this.type = {
			name: ''
		};
		this.createdAt = new Date();
		this.updatedAt = new Date();
		
	}

	create(animal) {
		const createAnimalPromise = new Promise ((resolve, reject)=>{
			db.connect((err, client) => {
				client.db('animals').collection('animals').insertOne(animal, (err, result) => {
					if (err) reject (err);
					resolve(res);
					res.send(animal);
					client.close();
				})
			})
			
		
		})	
	return createAnimalPromise.then((res) => {
		return (res);
	})
	}

	

	load(_id, res) {
		console.log(_id)
		const animalPromise = new Promise ((resolve, reject)=>{
			db.connect((err, client) => { 
			//const animalPromise = new Promise((resolve, reject) => {
			client.db('animals').collection('animals').aggregate([
				{
					$lookup:
					{
						from: 'types',
						localField: "type",
						foreignField: "typeId",
						as: 'typesName'
					}
				},
				{
					$match: { '_id' : {$eq : ObjectID(_id) }}
				}
			]).toArray((err, animals) => {
				if (err){
					reject(err)
				}
				resolve (animals)
				client.close();
			
		})
		
	})
	})
	return animalPromise.then((res) => {
		return (res);
	})
	}
	
	update() {
	}

	remove() {
	}

	static getAnimals(amount = 0) {
		
	}
}

module.exports = Animal;
