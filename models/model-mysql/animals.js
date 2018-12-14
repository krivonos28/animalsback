
class Animals {
    construcotor(data) {
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
				this.type = new ObjectID(data.type);
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
    
    selectUsers = () => {
        connection.query("SELECT * FROM customers", function (err, rows, fields) {
            if (err) throw err;
            console.log(rows);
        });
    }
    create = (age) => {

        console.log(age)
        let sql = 'INSERT INTO customers (`age`, `firstname`, `lastname`, `phone`) VALUES  ("' + age + '",  "firstname", "lastname", "p1asdf2312e1gxrw")';
        connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
    }

    deleteUser = () => {
        let sql = 'DELETE FROM customers WHERE id = 17';
        connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
    }
    updateUser = () => {
        let sql = "UPDATE customers SET firstname = 'Chack' WHERE id = 11";
        connection.query(sql, (err, res) => {
            if (err) console.log(err);
            console.log(res);
        })
    }
}