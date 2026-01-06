import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";

const STORAGE_KEY = "tasks";
const THEME_KEY = "theme";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  //usestate to see which appearance should take place
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (!savedTheme) return false;
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  //when dark mode is enabled change the colors
  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark-body", isDarkMode);
  }, [isDarkMode]);

  const onAddTask = (title, description) => {
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), //create a random id
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const onToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  //filter method to not mutate the task array
  const onDelete = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const onEdit = (id, payload) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...payload } : t))
    );
  };

  return (
    <div
      className={[
        "min-h-screen font-sans",
        isDarkMode ? "bg-black text-white" : "bg-white text-black",
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center gap-6">
        <div className="flex w-full max-w-4xl items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Task Manager</h1>
          <button
            type="button"
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={[
              "rounded-lg px-4 py-2 text-sm font-semibold border transition active:scale-[0.99]",
              isDarkMode
                ? "border-white/30 bg-white text-black hover:bg-white/90"
                : "border-black/20 bg-black text-white hover:bg-black/90",
            ].join(" ")}
          >
            {isDarkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>

        <TaskForm isDarkMode={isDarkMode} onAddTask={onAddTask} />
        <TaskList
          isDarkMode={isDarkMode}
          tasks={tasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </div>
    </div>

  );
};

export default App;
