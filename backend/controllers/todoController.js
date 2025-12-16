import Todos from "../models/todoModel.js";

const getTodos = async (req, res) => {
  let todos = await Todos.find();

  res.send(todos);
};

const createTodo = async (req, res) => {
  let { title, description } = req.body;

  let todo = await Todos.create({
    title,
    description,
  });

  res.send(todo);
};

const deleteTodo = async (req, res) => {
  const deleted = await Todos.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json({ message: "Todo Deleted" });
};

const getTodoById = async (req, res) => {
  const { id } = req.query;

  const todo = await Todos.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
};

export { getTodos, createTodo, deleteTodo , getTodoById };
