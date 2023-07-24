import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  REMOVE_FROM_TASKS,
  UPDATE_TASKS_STATUS,
} from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const markAsComplete = () => {
    dispatch({
      type: UPDATE_TASKS_STATUS,
      _id: task._id,
      status: 'completed',
    });
    idbPromise('tasks', 'put', {
      ...task,
      status: 'completed',
    });
  };

  const removeFromTasks = () => {
    dispatch({
      type: REMOVE_FROM_TASKS,
      _id: task._id,
    });
    idbPromise('tasks', 'delete', { ...task });
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
}

export default Task;
