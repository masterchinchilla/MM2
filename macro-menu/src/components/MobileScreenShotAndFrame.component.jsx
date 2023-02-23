import React from "react";
const MobileScreenShotAndFrame = (props) => {
  const { screenshot, screenshotAnnotations, screenshotStyles } = props;
  return (
    <div
      className="mobileScreenshot"
      style={{
        backgroundImage: `url(${screenshot})`,
        ...screenshotStyles,
      }}
    >
      <div className="mobileSSFrame">{screenshotAnnotations}</div>
    </div>
  );
};

export default MobileScreenShotAndFrame;
