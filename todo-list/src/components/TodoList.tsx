import { useState } from "react";
import { useStore } from "../store";

const TodoList = () => {
  const { addTodo, removeTodo, todos, toggleTodo } = useStore();
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = () => {
    console.log(inputValue);
    if (inputValue.trim() === "" || !inputValue) return;

    const todo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };

    addTodo(todo);

    console.log(todos);

    setInputValue("");
  };

  const handleRemoveTodo = (id: number) => {
    removeTodo(id);
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-teal-700">
          To-Do List
        </h1>

        <div className="flex items-center mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a To-Do"
            className="flex-grow bg-gray-100 px-4 py-2 rounded-l-lg border-emerald-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAddTodo}
            className="bg-blue-400 text-white px-4 py-2 rounded-r-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          >
            Add
          </button>
        </div>

        <ul className="space-y-4">
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                    className="form-checkbox mr-2 h-5 w-5 text-blue-500"
                  />
                  <span
                    className={`text-gray-600 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => handleRemoveTodo(todo.id)}
                    className="ml-auto text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
