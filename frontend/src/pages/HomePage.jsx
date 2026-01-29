import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendInstance from "../axios";
import { toast } from "react-toastify";

function HomePage() {
  const navigate = useNavigate();

  let [todos, setTodos] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  const getTodos = async () => {
    try {
      let res = await backendInstance.get();
      setTodos(res.data);
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const addTodoHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await backendInstance.post("/create", { title, description });
      toast.success("Todo Added");
      getTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div>
        {todos?.map((todo, index) => (
          <div key={index}>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>

      <div>
        <form onSubmit={addTodoHandler}>
          <input
            type="text"
            placeholder="enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button type="submit">Add</button>
        </form>
      </div>
    </>
  );
}

export default HomePage;
