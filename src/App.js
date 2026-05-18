import { useState } from "react";

function App() {
  const [task, setTask] = useState("");

  const [todos, setTodos] = useState([
    { id: 1, text: "Task C", completed: false },
    { id: 2, text: "Task B", completed: false },
    { id: 3, text: "Task A", completed: false },
  ]);

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([newTask, ...todos]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <h1 className="text-5xl font-bold mb-6">
        To Do List
      </h1>

      <div className="bg-gray-200 w-[550px] p-5 rounded-lg">
        {/* Input */}
        <div className="flex mb-5">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-4 rounded-l-md outline-none text-lg"
          />

          <button
            onClick={addTask}
            className="bg-[#0f1c3f] text-white px-6 rounded-r-md hover:opacity-90"
          >
            Add
          </button>
        </div>

        {/* Tasks */}
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white border border-gray-300 rounded-md p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTask(todo.id)}
                  className="w-4 h-4"
                />

                <span
                  className={`text-lg ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(todo.id)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center mt-6 font-semibold">
          {completedCount} / {todos.length} todos
          completed
        </p>
      </div>
    </div>
  );
}

export default App;