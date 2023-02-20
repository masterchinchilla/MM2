import React from "react";
import MonitorFoot from "../assets/monitorFoot.svg";
const DesktopScreenShotAndFrame = (props) => {
  const { screenshot, screenshotAnnotations } = props;
  return (
    <div className="desktopScreenshotGrp">
      <div
        className="desktopScreenshot"
        style={{
          backgroundImage: `url(${screenshot})`,
        }}
      >
        <div className="desktopSSFrame">{screenshotAnnotations}</div>
      </div>
      <img src={MonitorFoot} className="desktopMonitorBase" />
    </div>
  );
};

export default DesktopScreenShotAndFrame;
