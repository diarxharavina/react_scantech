import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ tasks, onToggle, onDelete, onEdit, isDarkMode }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className={["mt-4", isDarkMode ? "text-white/80" : "text-black/80"].join(" ")}>
        No tasks yet.
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
};

export default TaskList;
