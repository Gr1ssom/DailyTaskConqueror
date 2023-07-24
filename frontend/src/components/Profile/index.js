import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_USER_TASKS } from '../../utils/queries';  // Assume you have this query
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import TaskItem from '../TaskItem/TaskItem';

const Profile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [getUserTasks, { data }] = useLazyQuery(QUERY_USER_TASKS);

  useEffect(() => {
    if (data) {
      // You may want to dispatch the tasks data to your redux store
      dispatch({ type: 'ADD_USER_TASKS', tasks: data.userTasks }); 
    }
  }, [data]);

  useEffect(() => {
    // Fetch the user's tasks when the component loads
    if (Auth.loggedIn()) {
      getUserTasks();
    }
  }, [dispatch, getUserTasks]);

  return (
    <div className="profile">
      <h2>Your Tasks</h2>
      {state.tasks && state.tasks.length ? (
        <div>
          {state.tasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <h3>
          <span role="img" aria-label="thinking">
            🤔
          </span>
          You don't have any tasks yet!
        </h3>
      )}
    </div>
  );
};

export default Profile;
