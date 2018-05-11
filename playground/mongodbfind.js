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

	// find() just return mongodb curser
	// If to fetch All,
	//db.collection('Todos').find().toArray().then((docs) => {

	// If fetch conditionally
	//db.collection('Todos').find({completed : false}).toArray().then((docs) => {

	// Below won't work as is value should be a an Object (and not string or number)
	//db.collection('Todos').find({_id : "5af5af6690c9ca3368771180"}).toArray().then((docs) => {
	db.collection('Todos').find({
		_id : new ObjectID('5af5af6690c9ca3368771180')
		}).toArray().then((docs) => {
		console.log("Todos");
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) =>{
		console.log("Some Error - unabelt ot fetch Todos");
	});


	// Count
	db.collection('Todos').find().count().then((count) => {
		console.log(`Todos count : ${count}`);
	}, (error) =>{
		console.log("Some Error - unabelt ot fetch Todos");
	});

	// Find all Users with name = Archit
	db.collection('Users').find({name : "Archit"}).toArray().then((docs) => {
		console.log("Users (with Name = Archit) -- ");
		console.log(JSON.stringify(docs, undefined, 2));
	}, (error) => {
		console.log("Some Error - unable ot fetch Users with name : Archit");
	})

	// To close connection with MongoDB server
	//client.close();
});