//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// Fetch ObjectID from MongoClient and customize it if needed.
var obj = new ObjectID();
console.log(obj);

// client(a,b) a = connection url, b= callback api for error scenarios
MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) =>{
	
	if(error){
		return console.log("Unable to connect to DB server");
	}

	console.log("success - connected to MongoDB server");
	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
			_id : new ObjectID('5af5bdbcd9301ea4951f5124') 
		}, {
			$set : { 
						completed : true
					}
		}, {
			returnOriginal : false
		}).then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		}, (error) => {
			console.log("Some Error - unable ot fudpate todos ");
	});

	db.collection('Users').findOneAndUpdate({
			name : "Jem" 
		}, {
			$set : { 
						name : "Archit"
					},
			$inc : {
						age : 1
					}
		}, {
			returnOriginal : false
		}).then((result) => {
			console.log(JSON.stringify(result, undefined, 2));
		}, (error) => {
			console.log("Some Error - unable ot fudpate todos ");
	});

	// To close connection with MongoDB server
	client.close();
});