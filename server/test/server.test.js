const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// needed otherwide before each will emit all data and GET won't get anything
const todos = [{
		text : "Dummy 1"
	}, {
		text : "Dummy 2"
}];

// To clear the Data from DB before executing test suite
beforeEach((done) =>{
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
});

describe('POST /todos', () => {
	
	it('should create a new Todo', (done) => {
		var text = "Go Carting";
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((result) => {
				expect(result.body.text).toBe(text);
			})
			.end((error, result) => {
				if(error) {
					return done(error);
				}
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((error) =>{
					done(error);
				});
			});
	});

	it('should not create Todo with invalid data', (done) => {
		var text = "ewe";
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((error, result) => {
				if(error){
					done(error);
				}
				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((error) => done(error));
			});
	});
});

describe('GET /todos', () => {
	it("should get all Todos", (done) => {
		request(app)
			.get('./todos')
			.expect(201)
			.expect((response) => {
				expect(response.body.todos.length).toBe(2);
			})
			.end(done);
	});
});
