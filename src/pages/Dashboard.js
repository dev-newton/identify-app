import React from "react";
import { RiShieldUserFill } from "react-icons/ri";
import Navbar from "../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="center-dash">
          <RiShieldUserFill className="coinly-logo" />

          <h2>Welcome to Identify</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
