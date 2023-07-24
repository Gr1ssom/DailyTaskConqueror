import React from "react";
import TaskIntro from "../components/TaskIntro";

const NoMatch = () => {
  return (
    <div>
      <TaskIntro>
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
          </span>
        </h1>
      </TaskIntro>
    </div>
  );
};

export default NoMatch;