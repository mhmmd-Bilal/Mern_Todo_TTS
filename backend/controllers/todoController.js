import asyncHandler from "../middlewares/asyncHandler.js";
import Todos from "../models/todoModel.js";

const getTodos = asyncHandler(async (req, res) => {
  let todos = await Todos.find({ userId: req.query.userId });

  res.send(todos);
});

const createTodo = asyncHandler(async (req, res) => {
  let { title, description, userId } = req.body;

  let todo = await Todos.create({
    title,
    description,
    userId,
  });

  res.send(todo);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const deleted = await Todos.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json({ message: "Todo Deleted" });
});

const getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const todo = await Todos.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
  let { title, description, isCompleted, id } = req.body;

  let update = await Todos.findByIdAndUpdate(id, {
    title,
    description,
    isCompleted,
  });

  res.json({ message: "Todo Update", update });
});

export { getTodos, createTodo, deleteTodo, getTodoById, updateTodo };
