import { useState, useEffect } from "react";

function AddTodo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Load todos and lastUpdate from localStorage on component mount
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);

    const lastUpdate = parseInt(localStorage.getItem("lastUpdate"), 10) || 0;
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (Date.now() - lastUpdate > twentyFourHours) {
      // Clear todos and update the last update timestamp
      setTodos([]);
      localStorage.setItem("lastUpdate", Date.now().toString());
    }
  }, []);

  const saveTodos = (newTodos) => {
    // Save todos and update the lastUpdate timestamp
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    localStorage.setItem("lastUpdate", Date.now().toString());
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    // Add new todo to the todos state
    const newTodos = [
      ...todos,
      { id: Date.now(), text: newTodo, completed: false },
    ];
    saveTodos(newTodos);

    // Clear the input field
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    // Remove todo from the todos state
    const newTodos = todos.filter((todo) => todo.id !== id);
    saveTodos(newTodos);
  };

  return (
    <form
      id="work-record-form"
      className="relative bg-gray-900 text-white h-screen w-full flex flex-col gap-8 justify-center items-center"
      onSubmit={handleAddTodo}
    >
      <div className="w-full px-72 flex justify-between absolute top-20">
        <input
          type="text"
          className="w-[480px] bg-transparent border-2 border-indigo-600 rounded-md h-11 outline-none px-2"
          name="todo"
          id="todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-600 py-2 px-10 rounded-md"
        >
          Add
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center">Todo List</h2>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between mt-2 w-[400px] bg-slate-800 px-3 py-2 rounded-md"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default AddTodo;
