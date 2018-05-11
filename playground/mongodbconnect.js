//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// ES6 Feature - Object destructuring
var user = { name : "Archit", age : 25};
var {name} = user;
console.log(`Destructured : Name - ${name}`);

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

	// Collection 1- Todos Collection.
	db.collection('Todos').insertOne({
		text : "something to do",
		completed : false
	}, (error, result) => {
		if(error){
			return console.log("Unable to insert Todo", error);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	});

	db.collection('Users').insertOne({
		//_id : 123,
		name: "Archit",
		age: 31,
		location : "London"
	}, (error, result) => {
		if(error){
			return console.log("Unable to insert User", error);
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
		console.log(JSON.stringify(result.ops[0]._id));
		console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
	});

	// To close connection with MongoDB server
	client.close();
});