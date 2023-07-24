import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_TASKS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_TASKS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import TaskItem from '../TaskItem/TaskItem';

function TaskList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { loading, data } = useQuery(QUERY_TASKS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_TASKS,
        tasks: data.tasks,
      });
      data.tasks.forEach((task) => {
        idbPromise('tasks', 'put', task);
      });
    } else if (!loading) {
      idbPromise('tasks', 'get').then((tasks) => {
        dispatch({
          type: UPDATE_TASKS,
          tasks: tasks,
        });
      });
    }
  }, [data, loading, dispatch]);

  return (
    <div className="my-2">
      <h2>Your Tasks:</h2>
      {state.tasks.length ? (
        <div className="flex-row">
          {state.tasks.map((task) => (
            <TaskItem
              key={task._id}
              _id={task._id}
              title={task.title}
              description={task.description}
              dueDate={task.dueDate}
              completed={task.completed}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any tasks yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default TaskList;
