import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const todoRoute = express.Router();

// http://localhost:3000/api/todo
todoRoute.get("/", protect, getTodos);

// http://localhost:3000/api/todo/create
todoRoute.post("/create", protect, createTodo);

// http://localhost:3000/api/todo/:key
todoRoute.delete("/:id", protect, deleteTodo);

// http://localhost:3000/api/todo/getTodoById
todoRoute.get("/getTodoById", protect, getTodoById);

todoRoute.patch("/updateTodo", protect, updateTodo);

export default todoRoute;
