import React, { useEffect, useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [draftDescription, setDraftDescription] = useState(task.description || "");
  const isSaveDisabled = !draftTitle.trim();

  useEffect(() => {
    setDraftTitle(task.title);
    setDraftDescription(task.description || "");
    setIsEditing(false);
  }, [task.id, task.title, task.description]);

  const handleSave = () => {
    const trimmedTitle = draftTitle.trim();
    const trimmedDesc = draftDescription.trim();

    if (!trimmedTitle) return;

    onEdit(task.id, { title: trimmedTitle, description: trimmedDesc });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraftTitle(task.title);
    setDraftDescription(task.description || "");
    setIsEditing(false);
  };

  return (
    <div
      className={[
        "w-full rounded-xl border p-4",
        "flex flex-col gap-3",
        "sm:flex-row sm:items-center sm:justify-between",
        isDarkMode ? "border-white/15 bg-neutral-900 text-white" : "border-black/15 bg-neutral-50 text-black",
        task.completed ? "opacity-40" : "opacity-100",
      ].join(" ")}
    >
      <div className="min-w-0 flex-1 space-y-2">
        {isEditing ? (
          <>
            <label className="block">
              <span
                className={[
                  "block text-xs font-semibold mb-1",
                  isDarkMode ? "text-white/70" : "text-black/70",
                ].join(" ")}
              >
                Title
              </span>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className={[
                  "w-full px-3 py-2 border rounded-lg outline-none",
                  isDarkMode
                    ? "bg-neutral-950 text-white border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/10"
                    : "bg-white text-black border-black/20 focus:border-black/50 focus:ring-2 focus:ring-black/10",
                ].join(" ")}
              />
            </label>

            <label className="block">
              <span
                className={[
                  "block text-xs font-semibold mb-1",
                  isDarkMode ? "text-white/70" : "text-black/70",
                ].join(" ")}
              >
                Description
              </span>
              <textarea
                value={draftDescription}
                onChange={(e) => setDraftDescription(e.target.value)}
                placeholder="Optional details..."
                className={[
                  "w-full px-3 py-2 border rounded-lg outline-none resize-none",
                  isDarkMode
                    ? "bg-neutral-950 text-white border-white/20 focus:border-white/60 focus:ring-2 focus:ring-white/10 placeholder:text-white/40"
                    : "bg-white text-black border-black/20 focus:border-black/50 focus:ring-2 focus:ring-black/10 placeholder:text-black/40",
                ].join(" ")}
                rows={3}
              />
            </label>
          </>
        ) : (
          <>
            <h2
              className={[
                "text-base sm:text-lg font-semibold truncate",
                isDarkMode ? "text-white" : "text-black",
              ].join(" ")}
            >
              {task.title}
            </h2>

            <p
              className={[
                "mt-1 text-sm break-words",
                isDarkMode ? "text-white/70" : "text-black/70",
              ].join(" ")}
            >
              {task.description || (
                <span className={isDarkMode ? "italic text-white/40" : "italic text-black/40"}>
                  No description
                </span>
              )}
            </p>
          </>
        )}
      </div>

      <div className="sm:ml-4">
        <span
          className={[
            "inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold border",
            task.completed
              ? "bg-green-600/15 text-green-700 border-green-700/30"
              : "bg-yellow-400/20 text-orange-600 border-orange-600/30",
          ].join(" ")}
        >
          {task.completed ? "Completed" : "Ongoing"}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:ml-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaveDisabled}
              className={[
                "inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-semibold",
                "active:scale-[0.98] transition",
                isDarkMode
                  ? "border-white/30 bg-white text-black hover:bg-white/90 disabled:hover:bg-white disabled:border-white/20 disabled:text-black/60"
                  : "border-black/20 bg-black text-white hover:bg-black/90 disabled:bg-black/50 disabled:border-black/20",
              ].join(" ")}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className={[
                "inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-semibold",
                "active:scale-[0.98] transition",
                isDarkMode
                  ? "border-white/20 bg-neutral-800 hover:bg-white/10 text-white"
                  : "border-black/15 bg-white hover:bg-black/5 text-black",
              ].join(" ")}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={[
                "inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-semibold",
                "active:scale-[0.98] transition",
                isDarkMode
                  ? "border-white/20 bg-neutral-800 hover:bg-white/10 text-white"
                  : "border-black/15 bg-white hover:bg-black/5 text-black",
              ].join(" ")}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onToggle(task.id)}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-lg border",
                "active:scale-[0.98] transition",
                isDarkMode
                  ? "border-white/20 bg-neutral-800 hover:bg-white/10 text-white"
                  : "border-black/15 bg-white hover:bg-black/5 text-black",
              ].join(" ")}
              aria-label="Toggle completed"
              title="Toggle completed"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path
                  d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              className={[
                "inline-flex h-10 w-10 items-center justify-center rounded-lg border",
                "active:scale-[0.98] transition",
                isDarkMode
                  ? "border-white/20 bg-neutral-800 hover:bg-white/10 text-white"
                  : "border-black/15 bg-white hover:bg-black/5 text-black",
              ].join(" ")}
              aria-label="Delete task"
              title="Delete task"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
