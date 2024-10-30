import React, { useState } from "react";
import { createTodoRequest } from "../API/API";
import { toast } from "react-toastify";

const CreateTodoCom = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
    } else if (!description) {
      setError("Description is required");
    } else {
      createTodoRequest(title, description)
      .then((result) => {
        if (result === true) {
          setTitle("");
          setDescription("");
          setError("");
          setTimeout(() => {
            window.location.href = "/newTodo";
          }, 2000);
        } else {
          setError(result);
        }
      })
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Create todo</h1>
      <div className="bg-yellow-100 p-3 rounded-md w-[300px] mx-auto">
        <form onSubmit={handleSubmit} action="">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mt-[10px] mb-[5px]"
            type="text"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            name="description"
            id=""
            className="w-full mt-[10px] mb-[5px]"
          ></textarea>
          <p className="text-red-500">{error}</p>
          <button>Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoCom;
