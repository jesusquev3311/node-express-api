import express from 'express';
import db from '../db/db';

const router = express.Router();

// get all todos

router.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: true,
        message: 'todos retrieved succesfully',
        todos: db
    })
});

// Create a  Todos

router.post('/api/v1/todos', (req, res) => {
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
router.get('/api/v1/todos/:id', (req, res) => {

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
router.delete('/api/v1/todos/:id', (req, res)=>{
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

//Update to-do
router.put('/api/v1/todos/:id', (req,res)=>{
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index)=>{
        if(todo.id == id){
            todoFound = todo;
            itemIndex = index;
        }

        if(!todoFound){
            return res.status(400).send({
                success: false,
                message: 'item doesn\'t exist'
            });
        }

        if(!req.body.title){
            return res.status(400).send({
                success: false,
                message: 'Title is required'
            });
        } else if(!req.body.description){
            return res.status(400).send({
                success: false,
                message: 'Item Description is required'
            });
        }

        const updatedTodo = {
            id: todoFound.id,
            title: req.body.title || todoFound.title,
            description: req.body.description || todoFound.description
        }

        db.splice(itemIndex, 1, updatedTodo);
        return res.status(200).send({
            success: true,
            message: 'Item updated successfully',
            updatedTodo
        });

    });
});


export default router;