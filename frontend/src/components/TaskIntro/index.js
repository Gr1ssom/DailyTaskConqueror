import React from 'react';

function TaskIntro({ children }) {
  return (
    <div
      style={{
        height: 300, // Reduced height
        clear: 'both',
        paddingTop: 60, // Reduced padding
        textAlign: 'center',
        backgroundColor: '#f5f5f5', // Light grey background for emphasis
        borderRadius: 10, // Rounded corners
        margin: 20, // Some margin around
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // A subtle shadow for depth
      }}
    >
      {children}
    </div>
  );
}

export default TaskIntro;
