import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddTodoMutation,
  useGetTodosQuery,
  useDeleteTodoMutation,
} from "../slices/todoApiSlice";
import "./HomePage.css";
import { PacmanLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

function HomePage() {
  const { userData } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");

  let { data: todos, refetch, isLoading } = useGetTodosQuery({userId : userData?._id});
  let [logoutUser] = useLogoutUserMutation();

  let [addTodo] = useAddTodoMutation();
  let [deleteTodo] = useDeleteTodoMutation();

  const addTodoHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await addTodo({ title, description,userId : userData._id }).unwrap();
      refetch();
      toast.success("Todo Added");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const deleteTodoHandler = async (id) => {
    try {
      let res = await deleteTodo(id).unwrap();
      refetch();
      toast.success("Deleted");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      await dispatch(logout());
      toast.success("Logout Success");
      navigate("/login");
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <h1>Welcome 👋</h1>
        </div>

        {isLoading ? (
          <>
            <div className="loader-container">
              <PacmanLoader />
            </div>
          </>
        ) : (
          <div className="todo-layout">
            {/* Todo List */}
            <div className="todo-list">
              {todos?.length === 0 && (
                <div className="empty">No todos added yet</div>
              )}

              {todos?.map((todo) => (
                <div className={`todo-card `} key={todo._id}>
                  <h3 className={todo?.isCompleted ? "completedTodo" : ""}>
                    {todo.title}
                  </h3>
                  <p>{todo.description}</p>

                  <div className="todo-actions">
                    <button
                      className="edit"
                      onClick={() => navigate(`/edit/${todo._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteTodoHandler(todo._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Todo */}
            <div className="todo-form">
              <h2>Add Todo</h2>

              <form onSubmit={addTodoHandler}>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                <textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                />

                <button type="submit">Add Todo</button>
              </form>
              <button type="button" onClick={() => logoutHandler()}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
