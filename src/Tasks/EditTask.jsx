import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";

import { Bounce, toast, ToastContainer } from "react-toastify";
import {
  addComment,
  removeComment,
  removeTask,
  setCommentOnEdit,
  setCommentToUpdate,
  setTaskToUpdate,
  updateComment,
  updateTask,
} from "../Redux/Actions/taskActions";

const EditTask = () => {
  const taskOnEdit = useSelector((state) => state.task.taskOnEdit);
  const users = useSelector((state) => state.user.users);
  const isOnEditComment = useSelector((state) => state.task.isOnEditComment);
  const commentOnEdit = useSelector((state) => state.task.commentOnEdit);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(taskOnEdit.title || "");
  const [content, setContent] = useState(taskOnEdit.content || "");
  const [stage, setStage] = useState(taskOnEdit.stage || "");
  const [priority, setPriority] = useState(taskOnEdit.priority || "");
  const [assignees, setAssignees] = useState(taskOnEdit.assignees || []);
  const [team, setTeam] = useState(taskOnEdit.team || "");
  const [dueDate, setDueDate] = useState(taskOnEdit.dueDate || "");
  const [comments, setComments] = useState(taskOnEdit.comments || []);

  const [comment, setComment] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSelectMenu, setShowSelectMenu] = useState(false);

  const [openCommentMenuIndex, setOpenCommentMenuIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1080);
  const [actions, setActions] = useState(window.innerWidth <= 630);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1080);
      setActions(window.innerWidth <= 630);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCommentActionsMenu = (index) => {
    setOpenCommentMenuIndex(openCommentMenuIndex === index ? null : index);
  };

  const handleOptionClick = (value) => {
    setPriority(value);
    setIsSelectOpen(false);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "no priority":
        return "grey";
      case "medium":
        return "blue";
      case "high":
        return "red";
      default:
        return "";
    }
  };

  const formattedDate = dayjs(dueDate).format("DD MMM");

  const handleDateChange = (event) => {
    const inputDate = dayjs(event.target.value);
    setDueDate(inputDate.toISOString());
    setIsEditing(false);
  };

  const loggedUser = useSelector((state) => state.user.loggedUser);

  const returnBack = () => {
    dispatch(setTaskToUpdate());
    navigate("/tasks-everything");
    dispatch(setCommentOnEdit(false));
  };

  const saveUpdate = async () => {
    try {
      const response = await axios.put(
        `https://backend-production-faaa.up.railway.app/api/tasks/${taskOnEdit._id}`,
        {
          title,
          content,
          stage,
          priority,
          team,
          assignees,
          comments,
          dueDate,
        }
      );

      dispatch(updateTask(response.data.task));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${taskOnEdit._id}`
      );

      if (response.data.message === "error") {
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
      } else {
        dispatch(removeTask(response.data.task));
        navigate("/tasks-everything");
        toast.success("Task deleted successfully!", {
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
    } catch (error) {
      console.log(error);
    }
  };

  const addCommentToTask = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tasks/${taskOnEdit._id}/comments`,
        {
          text: comment,
          commenter: loggedUser.id,
          date: new Date(),
        }
      );

      dispatch(addComment(response.data.comment));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!taskOnEdit) {
    return <div>Loading...</div>;
  }

  const handleAssigneeChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setAssignees(selectedOptions);
  };

  const formatCommentDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  };

  const deleteComment = async (comment) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${taskOnEdit._id}/comments/${comment._id}`
      );
      if (response.data.type === "error") {
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
      } else {
        dispatch(removeComment(response.data.commentId));
        dispatch(setCommentOnEdit(false));

        setOpenCommentMenuIndex(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editComment = (comment) => {
    dispatch(setCommentToUpdate(comment));
    dispatch(setCommentOnEdit(true));
    setEditedCommentText(comment.text);
    setOpenCommentMenuIndex(null);
  };

  const saveCommentEdit = async (comment) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskOnEdit._id}/comments/${comment._id}`,
        { text: editedCommentText, date: new Date() }
      );

      if (response.data.type === "error") {
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
      } else {
        dispatch(
          updateComment({
            commentId: response.data.comment.commentId,
            text: response.data.comment.text,
            date: response.data.comment.date,
          })
        );

        dispatch(setCommentOnEdit(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-task">
      <div className="edit-task-header">
        <div className="return" onClick={returnBack}>
          <i className="fa-solid fa-angle-left"></i>
        </div>
        {!isSmallScreen && (
          <div className="edit-task-attributes">
            <div className="edit-task-team">
              <div className="select-dropdown">
                <select value={team} onChange={(e) => setTeam(e.target.value)}>
                  <option value="development">Development</option>
                  <option value="marketing">Marketing</option>
                  <option value="accounting">Accounting</option>
                  <option value="human-resources">Human Resources</option>
                  <option value="retails">Retails</option>
                </select>
              </div>
            </div>
            <div className="edit-task-priority">
              <div
                className={`select-display ${getPriorityStyle(priority)}`}
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <span>&#9873;</span>
              </div>

              {isSelectOpen && (
                <ul className="select-options">
                  <li onClick={() => handleOptionClick("low")} className="grey">
                    <span>&#9873;</span> Low
                  </li>
                  <li
                    onClick={() => handleOptionClick("medium")}
                    className="blue"
                  >
                    <span>&#9873;</span> Medium
                  </li>
                  <li onClick={() => handleOptionClick("high")} className="red">
                    <span>&#9873;</span> High
                  </li>
                </ul>
              )}
            </div>
            <div className="edit-task-due-date">
              {isEditing ? (
                <input
                  id="dueDate"
                  type="date"
                  value={dayjs(dueDate).format("YYYY-MM-DD")}
                  onChange={handleDateChange}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className={isEditing ? "input" : "date"}
                  min={new Date().toISOString().split("T")[0]}
                />
              ) : (
                <span
                  onClick={() => setIsEditing(true)}
                  style={{ cursor: "pointer" }}
                >
                  {formattedDate}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="edit-task-actions">
          {actions ? (
            <button className="save-changes" onClick={saveUpdate}>
              <i className="fa-solid fa-floppy-disk"></i>
            </button>
          ) : (
            <button className="save-changes" onClick={saveUpdate}>
              Save changes
            </button>
          )}
          {actions ? (
            <button className="delete" onClick={deleteTask}>
              <i className="fa-solid fa-trash"></i>
            </button>
          ) : (
            <button className="delete" onClick={deleteTask}>
              Delete Task
            </button>
          )}
        </div>
      </div>

      <div className="edit-task-content">
        <div className="edit-task-details">
          <div className="edit-task-title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="edit-task-info">
            <div className="edit-task-status">
              <p>
                <i className="fa-solid fa-circle-half-stroke"></i>
                Status
              </p>
              <div className="select-dropdown">
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="to do">To Do</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="edit-task-assignees">
              <p>
                <i className="fa-regular fa-user"></i> Assignees
              </p>

              <div className="assignee-selector">
                <div className="selected-assignees">
                  {assignees.map((assigneeId) => {
                    const assignee = users.find(
                      (user) => user._id === assigneeId
                    );
                    return (
                      assignee && (
                        <button title={assignee.name} key={assigneeId}>
                          <img
                            src={assignee.image}
                            alt={assignee.name}
                            className="assignee-avatar"
                          />
                        </button>
                      )
                    );
                  })}
                  <button
                    className="add-assignee-btn"
                    onClick={() => setShowSelectMenu(!showSelectMenu)}
                  >
                    <div className="plus-icon">+</div>
                    <i className="fa-regular fa-user"></i>
                  </button>
                </div>
                {showSelectMenu && (
                  <select
                    multiple
                    value={assignees}
                    onChange={handleAssigneeChange}
                    className="assignee-select"
                  >
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            {isSmallScreen && (
              <div className="edit-task-attributes">
                <div className="edit-task-team">
                  <p>
                    <i className="fa-solid fa-people-line"></i> Team
                  </p>
                  <div className="select-dropdown">
                    <select
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    >
                      <option value="development">Development</option>
                      <option value="marketing">Marketing</option>
                      <option value="accounting">Accounting</option>
                      <option value="human-resources">Human Resources</option>
                      <option value="retails">Retails</option>
                    </select>
                  </div>
                </div>
                <div className="edit-task-priority">
                  <p>
                    <i className="fa-solid fa-arrow-up-1-9"></i> Priority
                  </p>
                  <div className="select-dropdown">
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
                <div className="edit-task-due-date">
                  <p>
                    <i className="fa-regular fa-calendar-check"></i> Due Date
                  </p>
                  {isEditing ? (
                    <input
                      id="dueDate"
                      type="date"
                      value={dayjs(dueDate).format("YYYY-MM-DD")}
                      onChange={handleDateChange}
                      onBlur={() => setIsEditing(false)}
                      autoFocus
                      className={isEditing ? "input" : "date"}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  ) : (
                    <span
                      onClick={() => setIsEditing(true)}
                      style={{ cursor: "pointer" }}
                    >
                      {formattedDate}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="edit-task-text">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-task-comments">
          <div className="task-comments">
            {taskOnEdit.comments?.map((comment, index) => (
              <div className="task-comment" key={index}>
                <div className="commenter">
                  {(() => {
                    const user = users?.find(
                      (user) => user._id === comment?.commenter
                    );
                    return (
                      <button title={user?.name || comment?.commenter}>
                        <img
                          src={user?.image}
                          alt={user?.name || comment?.commenter}
                        />
                      </button>
                    );
                  })()}
                </div>

                <div className="comment-text">
                  <div className="comment-content">
                    <div className="comment-date">
                      {(() => {
                        const user = users.find(
                          (user) => user._id === comment.commenter
                        );
                        return (
                          <>
                            {user && <p className="commenter">{user.name}</p>}{" "}
                            <p className="comment-time">
                              {formatCommentDate(comment.date)}
                            </p>
                          </>
                        );
                      })()}
                    </div>

                    <div className="comment-content-text">
                      {isOnEditComment && commentOnEdit._id === comment._id ? (
                        <>
                          <input
                            type="text"
                            value={editedCommentText}
                            onChange={(e) =>
                              setEditedCommentText(e.target.value)
                            }
                          />
                          <button onClick={() => saveCommentEdit(comment)}>
                            Save
                          </button>
                        </>
                      ) : (
                        <p>{comment.text}</p>
                      )}
                    </div>
                  </div>
                  <div
                    className="comment-actions"
                    onClick={() => toggleCommentActionsMenu(index)}
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                  {openCommentMenuIndex === index && (
                    <div className="comment-actions-btns">
                      <button onClick={() => editComment(comment)}>Edit</button>
                      <button onClick={() => deleteComment(comment)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="form-input"
            />
            <button className="submit" onClick={addCommentToTask}>
              Send
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditTask;
