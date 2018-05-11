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

	// delete many
	db.collection('Todos').deleteMany({text : "Eat Dinner"}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete many Tods with text: Eat Dinner");
	});

	// delete one
	db.collection('Todos').deleteOne({text : "Eat Lunch"}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete many Tods with text: Eat Lunch");
	});

	// find one and delete
	db.collection('Todos').findOneAndDelete({completed : false}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete many Tods with text: Eat Lunch");
	});

	db.collection("Users").deleteMany({name : "Archit"}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete many Users with name: Archit");
	});

	db.collection("Users").deleteOne({name : "Jen"}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete one User with name: Jen");
	});

	db.collection("Users").findOneAndDelete({_id : new ObjectID('5af5bb9fd9301ea4951f5123')}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable to delete one User with name: Jem");
	});

	// To close connection with MongoDB server
	client.close();
});