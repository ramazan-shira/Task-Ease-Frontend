import { useEffect, useState } from "react";
import "./tasks.css";
import TasksContainer from "./TasksContainer";
import TasksNavBar from "./TasksNavBar";
import Filters from "./Filters";
import { useSelector } from "react-redux";

const Tasks = (props) => {
  const { page } = props;
  const [onlyMyTasks, setOnlyMyTasks] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTask, setSearchTask] = useState("");

  const tasks = useSelector((state) => state.task.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    if (searchTask === "") {
      setFilteredTasks(tasks);
    } else {
      const newTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTask.toLowerCase())
      );
      setFilteredTasks(newTasks);
    }
  }, [searchTask, tasks]);

  return (
    <div className="my-tasks">
      <TasksNavBar
        onlyMyTasks={onlyMyTasks}
        setOnlyMyTasks={setOnlyMyTasks}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        searchTask={searchTask}
        setSearchTask={setSearchTask}
      />
      {showFilters && (
        <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
      )}
      <div className="tasks-container">
        <TasksContainer
          page="toDo"
          onlyMyTasks={onlyMyTasks}
          team={page}
          tasks={filteredTasks}
        />
        <TasksContainer
          page="inProgress"
          onlyMyTasks={onlyMyTasks}
          team={page}
          tasks={filteredTasks}
        />
        <TasksContainer
          page="completed"
          onlyMyTasks={onlyMyTasks}
          team={page}
          tasks={filteredTasks}
        />
      </div>
    </div>
  );
};

export default Tasks;
