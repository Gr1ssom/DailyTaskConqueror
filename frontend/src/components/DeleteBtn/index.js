import React from 'react';

function DeleteBtn(props) {
  return (
    <span 
      {...props} 
      role="button" 
      tabIndex="0"
      aria-label="Delete"
      title="Delete task"
    >
      ✗
    </span>
  );
}

export default DeleteBtn;
