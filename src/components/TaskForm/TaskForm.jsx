import React, { useState } from "react";

const TaskForm = ({ onAddTask, isDarkMode }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();

    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, trimmedDesc);

    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className={[
        "w-full max-w-4xl rounded-2xl p-4 shadow-sm border",
        isDarkMode ? "bg-neutral-900 border-white/15" : "bg-white border-black/10",
      ].join(" ")}
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <label className="flex-1">
          <span
            className={[
              "block text-sm font-medium mb-1",
              isDarkMode ? "text-white/80" : "text-black/80",
            ].join(" ")}
          >
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish UI for Task App"
            className={[
              "w-full px-3 py-2 border rounded-lg outline-none",
              isDarkMode
                ? "bg-neutral-950 text-white border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/10 placeholder:text-white/40"
                : "bg-white text-black border-black/20 focus:border-black/50 focus:ring-2 focus:ring-black/10 placeholder:text-black/40",
            ].join(" ")}
          />
        </label>

        <label className="flex-[2]">
          <span
            className={[
              "block text-sm font-medium mb-1",
              isDarkMode ? "text-white/80" : "text-black/80",
            ].join(" ")}
          >
            Description
          </span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details..."
            className={[
              "w-full px-3 py-2 border rounded-lg outline-none",
              isDarkMode
                ? "bg-neutral-950 text-white border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/10 placeholder:text-white/40"
                : "bg-white text-black border-black/20 focus:border-black/50 focus:ring-2 focus:ring-black/10 placeholder:text-black/40",
            ].join(" ")}
          />
        </label>

        <button
          type="submit"
          className={[
            "md:w-auto w-full h-[42px] px-4 rounded-lg border font-medium",
            "active:scale-[0.99] transition",
            isDarkMode
              ? "border-white/30 bg-white text-black hover:bg-white/90"
              : "border-black/20 bg-black text-white hover:bg-black/90",
          ].join(" ")}
        >
          Add Task
        </button>
      </div>

      <p
        className={[
          "mt-3 text-xs",
          isDarkMode ? "text-white/60" : "text-black/60",
        ].join(" ")}
      >
        Tip: Title is required. Description is optional.
      </p>
    </form>
  );
};

export default TaskForm;
