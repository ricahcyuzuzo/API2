const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

const {expect} = chai;
const should = chai.should();

chai.use(chaiHttp);

describe('Testing The whole API', () => {
    // Testing the all GET methods.
    describe('Testing The GET method', () => {
        it('Should welcome the user on The API', (done) => {
            chai.request(app)
                .get('/api')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it('Should retrieve all students', (done) => {
            chai.request(app)
                .get('/api/students')
                .end((ree, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });

        it('Should retrieve one student', (done) => {
            chai.request(app)
                .get('/api/students/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        });

        it('Should check the user existances', (done) => {
            chai.request(app)
                .get('/api/students/135623527')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User not Found!!');
                    done();
                })
        });
    });

    // Testing the POST method
    describe('Testing the POST method', () => {
        const newStudent = {
            id: 4, 
            name: "Richard Cyuzuzo", 
            option: "IT"
        }
        it('Should create a new student', (done) => {
            chai.request(app)
                .post('/api/students')
                .send(newStudent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('A new student added!');
                    res.body.should.have.property('data').eql(newStudent);
                    done();
                })
        });
    });

    // Testing the PUT method
    describe('Testing the PUT method', () => {
        const updatedStudent = {
            id: 1,
            name: "Richard Cyuzuzo",
            option: "IT"
        }

        it('Should check the user existances', (done) => {
            chai.request(app)
                .put('/api/students/135623527')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User not Found!!');
                    done();
                })
        });

        it('Should update a user', (done) => {
            chai.request(app)
                .put('/api/students/1')
                .send(updatedStudent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Student Updated!');
                    res.body.should.have.property('data').eql(updatedStudent);
                    done();
                })
        });
    });

    // Testing the Delete method
    describe('Testing the DELETE method', () => {
        it('Should delete the student', (done) => {
            chai.request(app)
                .delete('/api/students/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Student Deleted!!');
                    done();
                })
        });

        it('Should check the user existances', (done) => {
            chai.request(app)
                .delete('/api/students/135623527')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('User not Found!!');
                    done();
                })
        });
    });
});