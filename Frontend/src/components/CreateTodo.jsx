import React, { useState } from "react";
import url from "../../confic/confic";

export default function CreateTodo({ onAddTodo, rendering }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    if (!title.trim() || !description.trim()) {
      return alert("Both title and description are required.");
    }
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/todo/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const newTodo = await response.json();
      alert("Todo added successfully");

      // Notify parent component
      onAddTodo(newTodo);

      // Clear input fields
      setTitle("");
      setDescription("");
    } catch (er) {
      console.error("Error fetching todos:", er);
      alert("Failed to add todo. Please try again later.");
    } finally {
      setLoading(false);
      rendering(1);
    }
  };

  return (
    <div>
      <input
        id="title"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="title"
        value={title} // Bind input to state
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        id="desc"
        style={{
          padding: 10,
          margin: 10,
        }}
        type="text"
        placeholder="description"
        value={description} // Bind input to state
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button
        style={{
          padding: 10,
          margin: 10,
        }}
        onClick={addTodo}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </div>
  );
}
