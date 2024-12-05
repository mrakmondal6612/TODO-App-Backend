import React, { useState } from "react";
// import url from "../../confic/confic";

export default function Todos({ todos, onUpdateTodo, onDeleteTodo }) {
  const [loadingId, setLoadingId] = useState(null);

  const markAsDone = async (id) => {
    try {
      setLoadingId(id);
      const response = await fetch(
        `http://localhost:8080/todo/mark/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const updateTodo = await response.json();
      alert("Mark as Done succesfully");

      // Notify parent to update state
      onUpdateTodo(updateTodo);
    } catch (er) {
      console.error("Error marking todo as done:", er);
      alert("Failed to update todo. Please try again later.");
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/todo/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      alert("Todo deleted successfully!");

      // Notify parent to update state (remove deleted todo)
      onDeleteTodo(id);
    } catch (er) {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo. Please try again later.");
    }
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p>No Todo available. Add some!</p>
      ) : (
        todos.map((el, indx) => {
          return (
            <div key={el._id || indx}>
              <hr></hr>
              <h1>{el.title}</h1>
              <h3>{el.description}</h3>
              <button
                onClick={() => markAsDone(el._id)}
                disabled={loadingId === el._id}
              >
                {loadingId === el._id
                  ? "Updating..."
                  : el.completed
                  ? "Done"
                  : "Mark as done"}
              </button>
              <br></br>
              <button
                onClick={() => deleteTodo(el._id)}
                style={{ margin: "8px" }}
              >
                Delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
