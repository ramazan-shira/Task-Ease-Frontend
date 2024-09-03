import { useState } from "react";
import "./tasks.css";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTask } from "../Redux/Actions/taskActions";

const AddTaskModal = (props) => {
  const { closeModal } = props;

  const users = useSelector((state) => state.user.users);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [team, setTeam] = useState("");
  const [assignee, setAssignee] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [stage, setStage] = useState("to do");
  const [priority, setPriority] = useState("no priority");

  const handleAssigneeChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setAssignee(selectedValues);
  };

  const saveTask = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-production-faaa.up.railway.app/api/tasks",
        {
          title,
          content,
          team,
          assignee,
          dueDate,
          stage,
          priority,
          createdAt: new Date(),
          createdBy: loggedUser.id,
        }
      );

      const addedTask = response.data;

      if (addedTask) {
        dispatch(
          setTask({
            id: addedTask._id,
            title: addedTask.title,
            content: addedTask.content,
            team: addedTask.team,
            assignee: addedTask.assignee,
            dueDate: addedTask.dueDate,
            stage: addedTask.stage,
            priority: addedTask.priority,
            createdAt: addedTask.createdAt,
            createdBy: addedTask.createdBy,
          })
        );
        toast.success("Task added successfully!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="modal">
      <div className="add-task-modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <div className="task-info">
          <div className="task-title">
            <i className="fa-solid fa-file-circle-check"></i>
            <input
              type="text"
              value={title}
              placeholder="Task title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="task-description">
            <label>Content</label>
            <textarea
              rows={4}
              cols={20}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="task-attributes">
            <div className="modal-input">
              <label>Team</label>
              <select value={team} onChange={(e) => setTeam(e.target.value)}>
                <option value="" disabled>
                  Select team
                </option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="accounting">Accounting</option>
                <option value="human-resources">Human Resources</option>
                <option value="retails">Retails</option>
              </select>
            </div>

            <div className="modal-input">
              <label>Assignee</label>
              <select value={assignee} onChange={handleAssigneeChange} multiple>
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
            <div className="modal-input">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="modal-input">
              <label>Stage</label>
              <select value={stage} onChange={(e) => setStage(e.target.value)}>
                <option value="toDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="modal-input">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="add-task-action">
          <button onClick={saveTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
