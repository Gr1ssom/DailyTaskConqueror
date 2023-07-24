import React from 'react';
import { useDispatch } from 'react-redux'; // Add the missing import
import { Link } from 'react-router-dom';
import { markTaskComplete, removeTask } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const markAsComplete = () => {
    dispatch(markTaskComplete(task._id));
    idbPromise('tasks', 'put', {
      ...task,
      status: 'completed',
    });
  };

  const removeFromTasks = () => {
    dispatch(removeTask(task._id));
  };

  return (
    <div className="flex-row">
      <div>
        <img src={`/images/${task.image}`} alt={task.name} />
      </div>
      <div>
        <Link to={`/task/${task._id}`}>
          <div>{task.name}</div>
        </Link>
        <div>{task.description}</div>
        <div>
          <span>Status: {task.status}</span>
          <button onClick={markAsComplete}>Mark as Complete</button>
          <button onClick={removeFromTasks}>Remove Task</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
