import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

//set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// get all todos

app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'todos retrieved succesfully',
        todos: db
    })
});

// Create a  Todos

app.post('/api/v1/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: false,
            message: 'Title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).semd({
            success: false,
            message: 'Description is required'
        });
    }

    const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description
    };


    /* send the new to-do */
    db.push(todo);

    return res.status(201).send({
        success: true,
        message: 'Todo added successfully',
        todo
    });

});

//get one to-do
app.get('/api/v1/todos/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);

    db.map((todo) => {
        if (todo.id == id) {
            return res.status(200).send({
                success: true,
                message: 'todo retrieved successfully',
                todo
            });
        }

    });

    return res.status(400).send({
        success: false,
        message: 'Item doesn\'t exist'
    });
});

//delete to-do
app.delete('/api/v1/todos/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);
    db.map((todo, index)=>{
        if (todo.id == id){
            db.splice(index, 1);
            return res.status(200).send({
                success: true,
                message:'Todo deleted successfuly'
            });
        }
    });
});


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});