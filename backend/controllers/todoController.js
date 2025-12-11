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


export {
    getTodos,
    createTodo
}