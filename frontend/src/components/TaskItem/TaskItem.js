import React from 'react';
import { useDispatch } from 'react-redux';
import { markTaskAsComplete } from '../../utils/actions'; // Make sure to update the path!

function TaskItem({ _id, title, description, dueDate, completed }) {
  const dispatch = useDispatch();

  const handleComplete = (taskId) => {
    dispatch(markTaskAsComplete(taskId));
  };

  return (
    <div className="task-item">
      <h3>{title}</h3>
      <p>Description: {description}</p>
      <p>Due Date: {dueDate}</p>
      <p>Status: {completed ? "Completed" : "Not Completed"}</p>
      {!completed && <button onClick={() => handleComplete(_id)}>Mark as Complete</button>}
    </div>
  );
}

export default TaskItem;
