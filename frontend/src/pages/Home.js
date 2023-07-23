import React from "react";
import TaskList from "../components/TaskList";
import Profile from "../components/Profile";

const Home = () => {
  return (
    <div className="container">
      <TaskList />
      <Profile />
    </div>
  );
};

export default Home;