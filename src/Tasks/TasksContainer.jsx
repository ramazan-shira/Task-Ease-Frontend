import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddTaskModal from "./AddTaskModal";
import { setTaskToUpdate } from "../Redux/Actions/taskActions";

const TasksContainer = (props) => {
  const { page, onlyMyTasks, team, tasks } = props;
  const filters = useSelector((state) => state.task.filters);

  const loggedUser = useSelector((state) => state.user.loggedUser);
  const users = useSelector((state) => state.user.users);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addTaskModal, setAddTaskModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const filterByTeam = tasks.filter((task) => {
    if (team === "everything") return true;
    return task.team === team;
  });

  const dateFilter = filters.dateFilter || [];
  const startDate = dateFilter[0] ? new Date(dateFilter[0]) : null;
  const endDate = dateFilter[1] ? new Date(dateFilter[1]) : null;

  const filterTeam = filterByTeam.filter((task) => {
    if (!filters.teamFilter) return true;
    return task.team === filters.teamFilter;
  });

  const filterByDate = filterTeam.filter((task) => {
    if (!startDate || !endDate) return true;
    const dueDate = new Date(task.dueDate);
    return dueDate >= startDate && dueDate <= endDate;
  });

  const filterByAssignee = filterByDate.filter((task) => {
    if (!filters.assigneeFilter) return true;
    return task.assignees.includes(filters.assigneeFilter);
  });

  const filterByPriority = filterByAssignee.filter((task) => {
    if (!filters.priorityFilter) return true;
    return task.priority === filters.priorityFilter;
  });

  const filterTasks = onlyMyTasks
    ? filterByPriority.filter((task) =>
        task.assignees.some((assigneeId) => assigneeId === loggedUser.id)
      )
    : filterByPriority;

  const tasksToDo = filterTasks.filter(
    (task) => task.stage === "toDo" || task.stage === "to do"
  ).length;

  const tasksInProgress = filterTasks.filter(
    (task) => task.stage === "inProgress" || task.stage === "in progress"
  ).length;

  const tasksCompleted = filterTasks.filter(
    (task) => task.stage === "completed"
  ).length;

  const openModal = () => {
    setAddTaskModal(true);
  };

  const closeModal = () => {
    setAddTaskModal(false);
  };

  const editTask = (task) => {
    navigate(`/tasks/${task._id}`);
    dispatch(setTaskToUpdate(task));
  };

  return !isSmallScreen ? (
    <div className="tasks">
      <div
        className={
          page === "toDo"
            ? "task-header toDo"
            : page === "inProgress"
            ? "task-header inProgress"
            : page === "completed"
            ? "task-header completed"
            : "task-header"
        }
      >
        <div className="header-title">
          <i
            className={
              page === "toDo"
                ? "fa-solid fa-list-ul"
                : page === "inProgress"
                ? "fa-solid fa-arrow-trend-up"
                : page === "completed"
                ? "fa-solid fa-check-double"
                : "fa-solid fa-list-ul"
            }
          ></i>
          <p>
            {page === "toDo"
              ? "To Do"
              : page === "inProgress"
              ? "In Progress"
              : page === "completed"
              ? "Completed"
              : "Task List"}
          </p>
          <p className="tasks-nr">
            {page === "toDo"
              ? tasksToDo
              : page === "inProgress"
              ? tasksInProgress
              : page === "completed"
              ? tasksCompleted
              : tasks.length}
          </p>
        </div>
        <div className="header-action" onClick={openModal}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="tasks-list">
        {filterTasks
          .filter((task) =>
            page === "toDo"
              ? task.stage === "toDo" || task.stage === "to do"
              : page === "inProgress"
              ? task.stage === "inProgress" || task.stage === "in progress"
              : page === "completed"
              ? task.stage === "completed"
              : false
          )
          .map((task) => {
            return (
              <div
                className="task"
                key={task._id}
                onClick={() => editTask(task)}
                aria-disabled={
                  loggedUser.role !== 1 &&
                  !task.assignees.includes(loggedUser._id) &&
                  loggedUser._id !== task.createdBy
                }
              >
                <div className="task-content">
                  <div className="task-people">
                    <div className="task-team">{task.team}</div>

                    <div className="task-assignees">
                      {task.assignees?.map((assigneeId) => {
                        const assignee = users.find(
                          (user) => user._id === assigneeId
                        );
                        return (
                          assignee && (
                            <div className="task-assignee" key={assigneeId}>
                              <button title={assignee.name}>
                                <img
                                  src={assignee.image}
                                  alt={assignee.name}
                                  className="assignee-avatar"
                                />
                              </button>
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-stage">
                    <div className="task-due-date">
                      Due date:{" "}
                      {formatDate(task.dueDate) === todayFormatted
                        ? "Today"
                        : formatDate(task.dueDate) === tomorrowFormatted
                        ? "Tomorrow"
                        : formatDate(task.dueDate)}
                    </div>
                    <div className="task-priority">
                      <button title={task?.priority}>
                        <i
                          className={
                            task.priority === "no priority"
                              ? "grey fa-solid fa-flag"
                              : task.priority === "medium"
                              ? "blue fa-solid fa-flag"
                              : task.priority === "high"
                              ? "red fa-solid fa-flag"
                              : "fa-solid fa-flag"
                          }
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <div className="new-task" onClick={openModal}>
          <i className="fa-solid fa-plus"></i> new task
        </div>
        {addTaskModal && <AddTaskModal closeModal={closeModal} />}
      </div>
    </div>
  ) : (
    <div className="tasks-sm">
      <table>
        <thead>
          <tr>
            <th
              className={
                page === "toDo"
                  ? "toDo"
                  : page === "inProgress"
                  ? "inProgress"
                  : page === "completed"
                  ? "completed"
                  : "stage"
              }
            >
              <p>
                <i
                  className={
                    page === "toDo"
                      ? "fa-solid fa-list-ul"
                      : page === "inProgress"
                      ? "fa-solid fa-arrow-trend-up"
                      : page === "completed"
                      ? "fa-solid fa-check-double"
                      : "fa-solid fa-list-ul"
                  }
                ></i>
                {page === "toDo"
                  ? "To Do"
                  : page === "inProgress"
                  ? "In Progress"
                  : page === "completed"
                  ? "Completed"
                  : "Task List"}{" "}
              </p>
              {"   "}
              <button onClick={openModal}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </th>
            <th>Team</th>
            <th>Assignees</th>
            <th>Due Date</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {filterTasks
            .filter((task) =>
              page === "toDo"
                ? task.stage === "toDo" || task.stage === "to do"
                : page === "inProgress"
                ? task.stage === "inProgress" || task.stage === "in progress"
                : page === "completed"
                ? task.stage === "completed"
                : false
            )
            .map((task) => {
              return (
                <tr key={task._id} onClick={() => editTask(task)}>
                  <td>
                    <i
                      className={
                        page === "toDo"
                          ? "fa-solid fa-square toDo"
                          : page === "inProgress"
                          ? "fa-solid fa-square inProgress"
                          : page === "completed"
                          ? "fa-solid fa-square completed"
                          : "fa-solid fa-list-ul"
                      }
                    ></i>
                    <span className="task-title">{task.title}</span>
                  </td>

                  <td className="task-team" data-label="Team">
                    {task.team.charAt(0).toUpperCase() + task.team.slice(1)}
                  </td>
                  <td className="task-assignees" data-label="Assignees">
                    <div className="task-assignee-container">
                      {task.assignees?.map((assigneeId) => {
                        const assignee = users.find(
                          (user) => user._id === assigneeId
                        );
                        return (
                          assignee && (
                            <div className="task-assignee" key={assigneeId}>
                              <button title={assignee.name}>
                                <img
                                  src={assignee.image}
                                  alt={assignee.name}
                                  className="assignee-avatar"
                                />
                              </button>
                            </div>
                          )
                        );
                      })}
                    </div>
                  </td>

                  <td data-label="Due Date">
                    {formatDate(task.dueDate) === todayFormatted
                      ? "Today"
                      : formatDate(task.dueDate) === tomorrowFormatted
                      ? "Tomorrow"
                      : formatDate(task.dueDate)}
                  </td>
                  <td className="task-priority" data-label="Priority">
                    <button title={task?.priority}>
                      <i
                        className={
                          task.priority === "no priority"
                            ? "grey fa-solid fa-flag"
                            : task.priority === "medium"
                            ? "blue fa-solid fa-flag"
                            : task.priority === "high"
                            ? "red fa-solid fa-flag"
                            : "fa-solid fa-flag"
                        }
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {addTaskModal && <AddTaskModal closeModal={closeModal} />}
    </div>
  );
};

export default TasksContainer;
