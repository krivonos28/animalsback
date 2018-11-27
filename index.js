const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const MongoClient = require('mongodb').MongoClient;


// Connection URLs
const url = 'mongodb://localhost:27017/animals';
const ObjectID = require('mongodb').ObjectID;



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/animals/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect((err, client) => {
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
                $match: { '_id' : {$eq : ObjectID(id) }}
            }
        ]).toArray((err, animals) => {

            res.send(animals);
            client.close();
        })
    })
})


app.get('/animals/', (req, res, next) => {

    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect((err, client) => {
        client.db('animals').collection('animals').aggregate([{
            $lookup:
            {
                from: 'types',
                localField: "type",
                foreignField: "typeId",
                as: 'typesName'
            }
        }
        ])
            .toArray((err, animals) => {
                console.log('end aggregation', animals);
                res.send(animals);
                client.close();
            }
            )
    })
})

app.post('/animals/', (req, res, next) => {
    console.log(req.body);
    var animalType = req.body.type;
    var animalAge = Number(req.body.age);
    var animalPrice = Number(req.body.price);
    var animalNickname = req.body.nickname;
    var creationDate = new Date();
    var editDate = new Date();
    var animal = { type: animalType, age: animalAge, price: animalPrice, nickname: animalNickname, createdAt: creationDate, updatedAt: editDate };
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect((err, client) => {
        client.db('animals').collection('animals').insertOne(animal, (err, result) => {
            if (err) console.log(err)
            res.send(animal);
            client.close();
        })
    })
})
app.delete('/animals/:id', (req, res) => {
    var id = req.params.id;
    var setting = {
        useNewUrlParser: true
    }
    const client = new MongoClient(url, setting);
    client.connect((err, client) => {
        client.db('animals').collection('animals').findOneAndDelete({ _id: ObjectID(id) }, (err, result) => {
            if (err) return res.status(400).send()
            res.send(result)
            client.close()
        })
    })

})


app.put('/animals/', (req, res) => {
    var animalType = req.body.type;
    var animalAge = Number(req.body.age);
    var animalPrice = Number(req.body.price);
    var animalNickname = req.body.nickname;
    var editDate = new Date();
    var id = req.body.id;
    var setting = {
        useNewUrlParser: true
    }
    const client = new MongoClient(url, setting);
    client.connect((err, client) => {
        client.db('animals').collection('animals').updateOne(
            { _id: ObjectID(id) },

            {
                $set: {
                    "type": animalType,
                    "age": animalAge,
                    "price": animalPrice,
                    "nickname": animalNickname,
                    "editDate": editDate
                }
            }, {
                upsert: true
            },
            function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(err);
                }

                client.close()
                res.send(result);
            })
    })
})

app.listen(3012, () => {
    console.log('Server running')
})