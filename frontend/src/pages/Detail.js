import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux'; // Add the missing import
import Tasks from '../components/Task';
import {
  REMOVE_FROM_TASKS,
  ADD_TASK,
  MARK_TASK_COMPLETE,
  UPDATE_PROFILE,
  UPDATE_TASKS_QUANTITY, // Add the missing action type
} from '../utils/actions';
import spinner from '../assets/spinner.gif';
import { QUERY_PROFILE } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function Detail() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { id } = useParams();

  const [currentProfile, setCurrentProfile] = useState({});

  const { loading, data } = useQuery(QUERY_PROFILE);

  const { profiles: profile, tasks } = state;

  useEffect(() => {
    // already in global store
    if (profile.length) {
      setCurrentProfile(profile.find((profile) => profile._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PROFILE,
        profile: data.profile,
      });

      data.profile.forEach((profile) => {
        idbPromise('profile', 'put', profile);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('profile', 'get').then((indexedProfiles) => {
        dispatch({
          type: UPDATE_PROFILE,
          profiles: indexedProfiles,
        });
      });
    }
  }, [profile, data, loading, dispatch, id]);

  const addToTasks = () => {
    const itemInTasks = tasks.find((taskItem) => taskItem._id === id);
    if (itemInTasks) {
      dispatch({
        type: UPDATE_TASKS_QUANTITY, // Change to ADD_TASK
        _id: id,
        taskQuantity: parseInt(itemInTasks.taskQuantity) + 1,
      });
      idbPromise('tasks', 'put', {
        ...itemInTasks,
        taskQuantity: parseInt(itemInTasks.taskQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TASK, // Change to ADD_TASK
        profile: { ...currentProfile, taskQuantity: 1 },
      });
      idbPromise('tasks', 'put', { ...currentProfile, taskQuantity: 1 });
    }

    // Mark the task as complete
    dispatch({
      type: MARK_TASK_COMPLETE,
      payload: id,
    });
  };

  const removeFromTasks = () => {
    dispatch({
      type: REMOVE_FROM_TASKS,
      _id: currentProfile._id,
    });

    idbPromise('tasks', 'delete', { ...currentProfile });
  };

  return (
    <>
      {currentProfile && tasks ? (
        <div className="container my-1">
          <Link to="/">← Back to Profile</Link>

          <h2>{currentProfile.name}</h2>

          <p>{currentProfile.description}</p>

          <p>
            <strong>Price:</strong>${currentProfile.price}{' '}
            <button onClick={addToTasks}>Add to Tasks</button>
            <button
              disabled={!tasks.find((p) => p._id === currentProfile._id)}
              onClick={removeFromTasks}
            >
              Remove from Tasks
            </button>
          </p>

          <img
            src={`/images/${currentProfile.image}`}
            alt={currentProfile.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Tasks />
    </>
  );
}

export default Detail;
