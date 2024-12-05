import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
// import url from "../confic/confic";

function App() {
  const [todos, setTodo] = useState([]);
  const [render, setRender] = useState(0);

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/todo/show`);
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
  }, [render]);

  // Function to update a specific todo
  const handleUpdateTodo = (updateTodo) => {
    setTodo((prevTodos) =>
      prevTodos.map((t) => (t._id === updateTodo._id ? updateTodo : t))
    );
    setRender(1);
  };

  // Function to delete a todo
  const handleDeleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo._id !== id));
  };

  return (
    <>
      <CreateTodo
        rendering={(render) => setRender((r) => r=r+1)}
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
