const Types = require('../models/model-mongo/types');
const express = require('express');



class TypesController {
    constructor() {
        this.app = express();
		this.router = express.Router();
		this.router.get('/types', this.getTypes);
		
        
	}
    
    getTypes(req, res) {
        //console.log("------ get type type-controller");
        Types.getTypes()
            .then((response) => {
                res.send(response);
            })
            .catch((e) => {
                console.log("type animals error", e);
            });
    }

 }

module.exports = TypesController;

