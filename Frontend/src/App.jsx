import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import url from "../confic/confic";

function App() {
  const [todos, setTodo] = useState([]);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${url}/show`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodo(data);
      } catch (er) {
        console.error("Error fetching todos:", er);
      }
    };
    fetchTodo();
  }, []);

  // Function to update a specific todo
  const handleUpdateTodo = (updateTodo) => {
    setTodo((prevTodos) =>
      prevTodos.map((t) => (t._id === updateTodo._id ? updateTodo : t))
    );
  };

  // Function to delete a todo
  const handleDeleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo._id !== id));
  };

  return (
    <>
      <CreateTodo
        onAddTodo={(newTodo) => setTodo((prev) => [...prev, newTodo])}
      />
      <Todos
        todos={todos}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}

export default App;
