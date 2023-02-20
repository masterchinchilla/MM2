import React from "react";
const MobileScreenShotAndFrame = (props) => {
  const { screenshot, screenshotAnnotations } = props;
  return (
    <div
      className="mobileScreenshot"
      style={{
        backgroundImage: `url(${screenshot})`,
      }}
    >
      <div className="mobileSSFrame">{screenshotAnnotations}</div>
    </div>
  );
};

export default MobileScreenShotAndFrame;
