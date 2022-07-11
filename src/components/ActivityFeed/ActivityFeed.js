import React, { useState, useEffect } from "react";
import ActivityItem from "./ActivityItem/ActivityItem";

import "./ActivityFeed.css";

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

  const onItemHasBeenArchived = (targetIndex) => {
    if (mode === "inbox") {
      setListOfCalls(
        listOfCalls.filter((item, index) => index !== targetIndex)
      );
    }
  };

  // show a list of calls
  const generateCallList = () => {
    // return an array of list items
    return listOfCalls.map((callObject, index) => {
      if (
        (mode === "inbox" && callObject.is_archived === false) ||
        mode === "all"
      ) {
        return (
          <ActivityItem
            key={index}
            activityInfo={callObject}
            onItemHasBeenArchived={() => onItemHasBeenArchived(index)}
          />
        );
      }
    });
  };

  useEffect(() => {
    getListOfCalls();
  }, [mode]);

  return <ol className="activityFeedContainer">{generateCallList()}</ol>;
}
