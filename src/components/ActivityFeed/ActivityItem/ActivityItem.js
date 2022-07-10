import React, { useState } from "react";
import ActivityDetail from "../ActivityDetail/ActivityDetail";
import "./ActivityItem.css";

export default function ActivityItem({ activityInfo }) {
  const [showDetail, setShowDetail] = useState(false);

  // toggle showDetail value
  const toggleShowDetail = () => {
    if (showDetail === true) {
      setShowDetail(false);
    } else {
      setShowDetail(true);
    }
  };

  // find time from created at
  const getCallTime = () => {
    return new Date(activityInfo.created_at).toLocaleTimeString();
  };

  // get caller
  const getCallerText = () => {
    if (activityInfo.from === null) {
      return "Unknown";
    }
    return activityInfo.from.toString();
  };

  // get via from call
  const getVIA = () => {
    if (activityInfo.call_type === "missed") {
      return "Tried to call on " + activityInfo.via;
    } else {
      return "Called on " + activityInfo.via;
    }
  };

  // get Icon
  const getIcon = () => {
    if (activityInfo.direction === "outbound") {
      return "outbound_icon";
    } else {
      return "inbound_icon";
    }
  };

  return (
    <li>
      <div className="listofcalls" onClick={toggleShowDetail}>
        <div>
          <div>{getIcon()}</div>
          <div>
            <div>{getCallerText()}</div>
            <div>{getVIA()}</div>
          </div>
          <div>{getCallTime()}</div>
        </div>
      </div>
      {showDetail && <ActivityDetail activityInfo={activityInfo} />}
    </li>
  );
}
