import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem/ActivityItem";

export default function ActivityFeed({ mode }) {
  const [listOfCalls, setListOfCalls] = useState([]);

  // get a list of calls
  const getListOfCalls = () => {
    fetch("https://aircall-job.herokuapp.com/activities")
      .then((response) => response.json())
      .then((data) => {
        setListOfCalls(data);
      });
  };

  // show a list of calls
  const generateCallList = () => {
    // return an array of list items
    return listOfCalls.map((callObject, index) => {
      if (
        (mode === "inbox" && callObject.is_archived === false) ||
        mode === "all"
      ) {
        return <ActivityItem key={index} activityInfo={callObject} />;
      }
    });
  };

  useEffect(() => {
    getListOfCalls();
  }, []);

  return (
    <ol
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <h1>Activity Feed</h1>
      {generateCallList()}
    </ol>
  );
}
