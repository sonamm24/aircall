import React, { useState } from "react";
import ActivityDetail from "../ActivityDetail/ActivityDetail";
import {
  BsFillTelephoneInboundFill,
  BsFillTelephoneOutboundFill,
  BsFillTelephoneXFill,
  BsFillTelephoneForwardFill,
} from "react-icons/bs";
import "./ActivityItem.css";

export default function ActivityItem({ activityInfo, onItemHasBeenArchived }) {
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
    // call was missed outbound and inbound
    if (activityInfo.call_type === "missed") {
      return <BsFillTelephoneXFill />;
    }
    // call was outbound and was answered
    if (activityInfo.direction === "outbound") {
      return <BsFillTelephoneOutboundFill />;
    } else {
      // call was inbound and went to voice mail
      if (activityInfo.call_type === "voicemail") {
        return <BsFillTelephoneForwardFill />;
      }
      // call was inbound and was answered
      return <BsFillTelephoneInboundFill />;
    }
  };

  return (
    <div className="itemContainer">
      <div className="itemSummaryContainer" onClick={toggleShowDetail}>
        <div className="itemSummaryLeftSide">
          {getIcon()}
          <div className="itemSummaryLeftSideText">
            <div className="itemSummaryLeftSideTopText">{getCallerText()}</div>
            <div className="itemSummaryLeftSideBottomText">{getVIA()}</div>
          </div>
        </div>
        <div className="itemSummaryRightSide">{getCallTime()}</div>
      </div>
      {showDetail && (
        <ActivityDetail
          activityInfo={activityInfo}
          onItemHasBeenArchived={onItemHasBeenArchived}
        />
      )}
    </div>
  );
}
