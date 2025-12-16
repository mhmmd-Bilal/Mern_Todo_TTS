import express from 'express'
import { createTodo, deleteTodo, getTodoById, getTodos } from '../controllers/todoController.js'

const todoRoute = express.Router()

// http://localhost:3000/api/todo
todoRoute.get('/' , getTodos)

// http://localhost:3000/api/todo/create
todoRoute.post('/create',createTodo)

// http://localhost:3000/api/todo/:key
todoRoute.delete('/:id',deleteTodo)


// http://localhost:3000/api/todo/getTodoById
todoRoute.get('/getTodoById' , getTodoById)



export default todoRoute