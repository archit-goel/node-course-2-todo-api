var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

// Addition of Todo & User using their models.
	/*var newTodo = new Todo({
		text: "Cook Dinner"
	});

	newTodo.save().then((doc) => {
			console.log('Saved' , doc);
		}, (error) =>{
			console.log('Unable to save');
	});

	var newTodo1 = new Todo({
		text: "Cook Lunch",
		completed : true,
		completedAt : 10
	});

	newTodo1.save().then((doc) => {
			console.log('Saved' , doc);
		}, (error) => {
			console.log('Unable to save');
	});

	var newUser = new User({
		//email : ''
		//email : ' s '
		email : 'agoel21@sapient.com'
	});

	newUser.save().then((doc) => {
			console.log('Saved' , doc);
		}, (error) => {
			console.log('Unable to save User');
	});*/

// Middleware
app.use(bodyParser.json());

app.post('/todos', (request, response) => {
	console.log(request.body);
	var newTodo = new Todo ({
		text : request.body.text
	});
	newTodo.save().then((doc) => {
			console.log('Saved' , doc);
			response.send(doc);
		}, (error) => {
			response.status(400);
			console.log('Unable to save User');
			response.send(error);
	});
});

/*app.get('/todos', (request, response) => {

});*/

app.listen(3000, () => {
	console.log('server started on port 3000');
});