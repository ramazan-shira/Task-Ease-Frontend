import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../Redux/Actions/taskActions";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Filters = (props) => {
  const { showFilters, setShowFilters } = props;

  const filters = useSelector((state) => state.task.filters);
  const users = useSelector((state) => state.user.users);

  const dispatch = useDispatch();

  const [dateFilter, setDateFilter] = useState(filters.dateFilter || []);
  const [assigneeFilter, setAssigneeFilter] = useState(
    filters.assigneeFilter || ""
  );
  const [priorityFilter, setPriorityFilter] = useState(
    filters.priorityFilter || ""
  );
  const [teamFilter, setTeamFilter] = useState(filters.teamFilter || "");

  useEffect(() => {
    setDateFilter(filters.dateFilter || []);
    setAssigneeFilter(filters.assigneeFilter || "");
    setPriorityFilter(filters.priorityFilter || "");
    setTeamFilter(filters.teamFilter || "");
  }, [filters]);

  const filtersApply = () => {
    dispatch(
      setFilters({ dateFilter, assigneeFilter, priorityFilter, teamFilter })
    );
    setShowFilters(false);
  };

  const restoreFilters = () => {
    setDateFilter([]);
    setAssigneeFilter("");
    setPriorityFilter("");
    setTeamFilter("");

    dispatch(resetFilters());
    setShowFilters(false);
  };

  const handleSelect = (range) => {
    setDateFilter(range);
  };

  return (
    showFilters && (
      <div className="filter-tasks">
        <div className="date-filter">
          Filter by due date
          <DateRangePicker
            value={dateFilter}
            onChange={handleSelect}
            placeholder="Select Date Range"
            style={{ zIndex: 100000000 }}
          />
        </div>
        <div className="assignee-filter">
          Filter by assignee
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="" disabled>
              Select assignee
            </option>
            {users.map((user) => (
              <option value={user._id} key={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="priority-filter">
          Filter by priority
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="no priority">No Priority</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="team-filter">
          Filter by team
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
          >
            <option value="" disabled>
              Select team
            </option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="human-resources">Human Resources</option>
            <option value="retails">Retails</option>
          </select>
        </div>
        <div className="filter-actions">
          <button className="apply" onClick={filtersApply}>
            Apply filters
          </button>
          <button className="reset" onClick={restoreFilters}>
            Reset filters
          </button>
        </div>
      </div>
    )
  );
};

export default Filters;
