import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_PROFILE } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILE } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function TaskList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const { currentProfile } = state;

  const { loading, data } = useQuery(QUERY_PROFILE);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PROFILE,
        profiles: data.profile,
      });
      data.profile.forEach((profile) => {
        idbPromise('profile', 'put', profile);
      });
    } else if (!loading) {
      idbPromise('profile', 'get').then((profile) => {
        dispatch({
          type: UPDATE_PROFILE,
          profiles: profile,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProfile() {
    if (!currentProfile) {
      return state.profiles;
    }

    return state.profiles.filter(
      (profile) => profile._id === currentProfile
    );
  }

  return (
    <div className="my-2">
      <h2>Your Profile</h2>
      {state.tasks.length ? (
        <div className="flex-row">
          {filterProfile().map((profile) => (
            <ProductItem
              key={profile._id}
              _id={profile._id}
              //image={profile.image}
              name={profile.name}
              quantity={profile.quantity}
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
