import { useSelector } from "react-redux";
import "./dashboard.css";

const MyTasks = () => {
  const tasks = useSelector((state) => state.task.tasks);
  const loggedUser = useSelector((state) => state.user.loggedUser);

  const userTasks = tasks?.filter((task) =>
    task.assignees.some((assigneeId) => assigneeId === loggedUser.id)
  );

  userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  const firstThreeTasks = userTasks.slice(0, 4);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { day: "2-digit", month: "short" };
    return date.toLocaleDateString("en-GB", options);
  };

  const today = new Date();
  const todayFormatted = formatDate(today.toISOString());

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowFormatted = formatDate(tomorrow.toISOString());

  return (
    <div className="dashboard-tasks">
      <div className="tasks-title">My Tasks</div>
      {firstThreeTasks.length > 0 ? (
        <ul>
          {firstThreeTasks.map((task, index) => (
            <li key={task._id}>
              <div className="task-title">
                <p>{String(index + 1).padStart(2, "0")}</p>
                <p className={task.stage === "completed" ? "completed" : ""}>
                  {task.title}
                </p>
              </div>
              <div className="task-stage">
                <p>
                  {formatDate(task.dueDate) === todayFormatted
                    ? "Today"
                    : formatDate(task.dueDate) === tomorrowFormatted
                    ? "Tomorrow"
                    : formatDate(task.dueDate)}
                </p>
                <i
                  className={
                    task.stage === "to do"
                      ? "grey fa-solid fa-circle-check"
                      : task.stage === "inProgress"
                      ? "orange fa-solid fa-circle-check"
                      : task.stage === "completed"
                      ? "green fa-solid fa-circle-check"
                      : ""
                  }
                ></i>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="tasks-message">No tasks assigned to you!</div>
      )}
    </div>
  );
};

export default MyTasks;
