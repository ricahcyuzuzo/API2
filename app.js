const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, name: "Richard Cyuzuzo", option: "IT"},
    {id: 2, name: "Divine Umulisa", option: "MCB"},
    {id: 3, name: "Kevine Muhorakeye", option: "BS"}
];

app.get('/api/', (req, res) => {
    res.send('Welcome to the api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(st => st.id === parseInt(req.params.id));
    if(!student) return res.status(404).send({message: "User not Found!!"});

    res.send(student);
});

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1, 
        name: req.body.name, 
        option: req.body.option
    }

    students.push(student);
    res.send({
        message: 'A new student added!',
        data: student
    });
});

app.put('/api/students/:id', (req, res) => {
    const student = students.find(st => st.id === parseInt(req.params.id));
    if (!student) return res.status(404).send({ message: "User not Found!!" });

    student.name = req.body.name;
    student.option = req.body.option;

    res.send({
        message: 'Student Updated!',
        data: student
    });
});

app.delete('/api/students/:id', (req, res) => {
    const student = students.find(st => st.id === parseInt(req.params.id));
    if (!student) return res.status(404).send({ message: "User not Found!!" });

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send({
        message:'Student Deleted!!',
        data: student
    })

});



const port = process.env.PORT || 5000;
app.listen(port, console.log(`The App is listening to "http://localhost:${port}/api"`));


module.exports = app;

