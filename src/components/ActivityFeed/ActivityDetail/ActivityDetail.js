import React, { useState } from "react";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

import "./ActivityDetail.css";

export default function ActivityDetail({
  activityInfo,
  onItemHasBeenArchived,
}) {
  const [isArchived, setIsArchived] = useState(activityInfo.is_archived);

  const toggleArchiveStatusOfCall = () => {
    fetch("https://aircall-job.herokuapp.com/activities/" + activityInfo.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: !isArchived,
      }),
    })
      .then((response) => response.json())
      .then((updatedActivityInfo) => {
        setIsArchived(updatedActivityInfo.is_archived);
        if (updatedActivityInfo.is_archived === true) {
          onItemHasBeenArchived();
        }
      });
  };

  const showDuration = () => {
    const hours = activityInfo.duration / 60 / 60;
    const minutes = activityInfo.duration / 60;
    const seconds = activityInfo.duration % 60;

    let result = "";

    if (hours >= 1) {
      result = result + hours + " hrs ";
    }

    if (minutes >= 1) {
      result = result + minutes + " min ";
    }

    result = result + seconds + " sec";

    return result;
  };

  const getCalleeText = () => {
    if (activityInfo.to === null) {
      return "Called unknown";
    }
    return "Called " + activityInfo.to.toString();
  };

  const getText = () => {
    if (activityInfo.call_type === "answered") {
      return "Answered call, " + showDuration();
    } else if (activityInfo.call_type === "missed") {
      return "Missed call.";
    } else {
      return "Missed call. Went to voicemail.";
    }
  };

  const getArchiveIcon = () => {
    if (isArchived === true) {
      return <BiArchiveOut size={"2em"} color={"grey"} />;
    }
    return <BiArchiveIn size={"2em"} color={"black"} />;
  };

  return (
    <div className="activityDetailContainer">
      <div className="activityDetailContainerLeftSide">
        <div>{getCalleeText()}</div>
        <div>{getText()}</div>
      </div>
      <button onClick={toggleArchiveStatusOfCall}>{getArchiveIcon()}</button>
    </div>
  );
}
