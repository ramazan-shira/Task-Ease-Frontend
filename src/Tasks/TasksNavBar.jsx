import { useEffect, useState } from "react";
import "./tasks.css";
import { useDispatch, useSelector } from "react-redux";

const TasksNavBar = (props) => {
  const {
    onlyMyTasks,
    setOnlyMyTasks,
    showFilters,
    setShowFilters,
    setSearchTask,
    searchTask,
  } = props;

  const tasks = useSelector((state) => state.task.tasks);

  const showOnlyMyTasks = () => {
    setOnlyMyTasks(!onlyMyTasks);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = (e) => {
    setSearchTask(e.target.value);
  };

  return (
    <div className="my-tasks-navbar">
      <div className="filters">
        <div className="filter" onClick={toggleFilters}>
          <button>
            <i className="fa-solid fa-filter"></i> Filters
          </button>
        </div>
        <div className="search-tasks">
          <input
            type="text"
            className="search-input"
            placeholder="Search task..."
            value={searchTask}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="only-my-tasks">
        <p>Show my tasks only </p>
        <input
          type="checkbox"
          hidden="hidden"
          id="username"
          value={onlyMyTasks}
          onChange={showOnlyMyTasks}
        />
        <label className="switch" htmlFor="username"></label>
      </div>
    </div>
  );
};

export default TasksNavBar;
