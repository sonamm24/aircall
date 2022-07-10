import React, { useState } from "react";

import "./ActivityDetail.css";

export default function ActivityDetail({
  activityInfo,
  onArchiveStatusUpdate,
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
        onArchiveStatusUpdate(updatedActivityInfo.is_archived);
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

  const getArchiveText = () => {
    if (isArchived === true) {
      return "Unarchive Call";
    }
    return "Archive Call";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>{getCalleeText()}</div>
      <div className="Detail">
        <div>{getText()}</div>
        <button onClick={toggleArchiveStatusOfCall}>{getArchiveText()}</button>
      </div>
    </div>
  );
}
