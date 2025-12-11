import express from 'express'
import { createTodo, getTodos } from '../controllers/todoController.js'

const todoRoute = express.Router()

// http://localhost:3000/api/todo
todoRoute.get('/' , getTodos)

// http://localhost:3000/api/todo/create
todoRoute.post('/create',createTodo)


export default todoRoute