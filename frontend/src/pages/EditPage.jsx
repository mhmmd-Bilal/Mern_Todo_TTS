import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
  useGetTodosQuery,
} from "../slices/todoApiSlice";
import { toast } from "react-toastify";
import './EditTodo.css'

function EditPage() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const { data: todo, refetch } = useGetTodoByIdQuery({ id: id });
  const { data, refetch: getTodos } = useGetTodosQuery();

  const [updateTodo] = useUpdateTodoMutation();

  const editTodoHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await updateTodo({
        title,
        description,
        isCompleted,
        id,
      }).unwrap();

      refetch();
      getTodos();
      toast.success("Todo Updated");
      navigate("/");
    } catch (error) {
      console.log(error?.message || error?.data?.message);
      toast.error(error?.message || error?.data?.message);
    }
  };

  useEffect(() => {
    if (todo) {
      setTitle(todo?.title);
      setDescription(todo?.description);
      setIsCompleted(todo?.isCompleted);
    }
  }, [todo]);

  return (
    <>
 <div className="edit-container">
      <div className="edit-card">
        <h3>Edit Todo</h3>

        <form onSubmit={editTodoHandler}>
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

          <div className="status-row">
            <label>Status</label>
            <select
              value={isCompleted.toString()}
              onChange={(e) => setIsCompleted(e.target.value === "true")}
            >
              <option value="false">Pending</option>
              <option value="true">Completed</option>
            </select>
          </div>

          <div className="edit-actions">
            <button type="submit" className="save-btn">
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default EditPage;
