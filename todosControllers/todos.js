/* eslint-disable class-methods-use-this */
import db from '../db/db';

class TodosController {
    // GET ALL TODOS
    getALlTodos(req, res) {
        return res.status(200).send({
            success: true,
            message: 'Got All Items',
            todos: db
        });
    }

    //GET ONE ITEM
    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        db.map((todo) => {
            if (todo.id == id) {
                return res.status(200).send({
                    success: true,
                    message: 'Item Found',
                    todo
                });
            }
        });

        return res.status(400).send({
            success: false,
            message: 'Item doesn\'t exist'
        });
    }

    //CREATE ITEM
    createTodo(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: false,
                message: 'Title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: false,
                message: 'Description is required'
            });
        }

        const todo = {
            id: db.length + 1,
            title: req.body.title,
            description: req.body.description
        }
        db.push(todo);

        return res.status(201).send({
            success: true,
            message: 'Todo created successfully;'
        });
    }

    // UPDATE TO-DO
    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        let todoFound;
        let itemIndex;

        db.map((todo, index) => {
            if (todo.id == id) {
                todoFound = todo;
                itemIndex = index;
            }
        });

        if (!todoFound) {
            return res.status(400).send({
                success: false,
                message: 'Item not found'
            });
        }

        if (!req.body.title) {
            return res.status(400).send({
                success: false,
                message: 'Title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: false,
                message: 'Description is required'
            });
        }

        const newTodo = {
            id: todoFound.id,
            title: req.body.title || todoFound.title,
            description: req.body.description || todoFound.description
        }

        db.splice(itemIndex, 1, newTodo);

        return res.status(201).send({
            success: true,
            message: 'Item Updated successfully',
            newTodo
        });

    }

    // DELETE item
    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);

        let todoFound;
        let itemIndex;

        db.map((todo, index) => {
            if (todo.id == id) {
                todoFound = todo;
                itemIndex = index;
            }
        })

        if (!todoFound) {
            return res.status(400).send({
                success: false,
                message: 'Item Doesn\'t exist'
            });
        }

        db.splice(itemIndex, 1);

        return res.status(200).send({
            success: true,
            message: 'Item Deleted successfully'
        });
    }
}

const todoController = new TodosController();

export default todoController;