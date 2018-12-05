const db = require('./db');
const ObjectID = require('mongodb').ObjectID;

class Animal {
	constructor(data) {
		this._id = '';
		this.nickname = '';
		this.type = '';
		this.price = 0;
		this.age = 0;
		this.createdAt = new Date();
		this.updatedAt = new Date();

		if (data) {
			try {
				this.fillModel(data);
			} catch (e) {
				throw new Error(e);
			}
		}
	}

	fillModel(data) {
		try {
			if (data._id) {
				if (ObjectID.isValid(data._id)) {
					this._id = new ObjectID(data._id);
				}
			}

			if (data.type) {
				this.type = data.type;
			}
			if (Number(data.age) >= 0) {
				this.age = Number(data.age);
			}
			if (Number(data.price) >= 0){
				this.price = Number(data.price);
			}

			if (data.nickname) {
				this.nickname = data.nickname.toString();
			}

			if (data.createdAt) {
				this.createdAt = data.createdAt;
			}

			if (data.updatedAt) {
				this.updatedAt = data.updatedAt;
			}
		} catch (e) {
			throw new Error(e);
		}
	}

	create() {
		let animal = {
			"type": 	 this.type,
			"age": 		 this.age,
			"price": 	 this.price,
			"nickname":  this.nickname,
			"createdAt": this.createdAt,
			"updatedAt": this.updatedAt
		}
		return new Promise((resolve, reject) => {
			db.getConnection().collection('animals').insertOne(animal, (err, result) => {
				if (err) reject(err);
				resolve(result);
			})
		})
	}

	load() {
		return new Promise((resolve, reject) => {
			db.getConnection().collection('animals').aggregate([
				{
					$lookup:
					{
						from: 			'types',
						localField: 	'type',
						foreignField: 	'typeId',
						as:   			'typesName'
					}
				},
				{ $unwind : "$typesName" } ,
				{
					$match: { '_id': { $eq: ObjectID(this._id) } }
				}
			]).toArray((err, animals) => {
				if (err) {
					console.log('err', err);
					reject(err);
				} else {
				resolve(animals);
				}
			});
		});
	}

	update() {
		return new Promise((resolve, reject) => {
			db.getConnection().collection('animals').updateOne(
				{ _id: this._id },
				{
					$set: {
						"type": 	 this.type,
						"age": 		 this.age,
						"price": 	 this.price,
						"nickname":  this.nickname,
						"updatedAt": new Date()
					}
				},
				{
					upsert: true
				},
				function (err, result) {
					if (err) {
						console.log('err', err);
						reject(err);
					} else {
					resolve(result);
					}
				})
		});
	}

	remove() {
		return new Promise((resolve, reject) => {
			db.getConnection().collection('animals').findOneAndDelete({ _id: ObjectID(this._id) }, (err, result) => {
				if (err) reject(err);
				resolve(result);
			})
		})
	}

	static getAnimals() {
		return new Promise((resolve, reject) => {
			db.getConnection().collection('animals').aggregate([{
				$lookup:
				{
					from: 'types',
					localField: "type",
					foreignField: "typeId",
					as: 'typesName'
				}
			},
				{ 
					$unwind : "$typesName" 
				} 
			])
				.toArray((err, animals) => {
					if (err) {
						reject(err)
					} else {
					resolve(animals);
					}
				});
		});
	}
}

module.exports = Animal;
