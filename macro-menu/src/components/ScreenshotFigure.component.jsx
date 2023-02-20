import React from "react";
import DesktopScreenShotAndFrame from "./DesktopScreenShotAndFrame.component";
import MobileScreenShotAndFrame from "./MobileScreenShotAndFrame.component";
const ScreenshotFigure = (props) => {
  const {
    screenshotType,
    currentSlideNum,
    thisSlideNum,
    viewportWidth,
    figCaptionClasses,
    figCaptionText,
    screenshot,
    screenshotAnnotations,
    figureClasses,
  } = props;
  return (
    <figure
      className={`figure ${figureClasses}`}
      hidden={currentSlideNum !== thisSlideNum && viewportWidth < 1000}
    >
      <figcaption className={`figure-caption ${figCaptionClasses}`}>
        {figCaptionText}
      </figcaption>
      {screenshotType === "mobile" ? (
        <MobileScreenShotAndFrame
          screenshot={screenshot}
          screenshotAnnotations={screenshotAnnotations}
        />
      ) : (
        <DesktopScreenShotAndFrame
          screenshot={screenshot}
          screenshotAnnotations={screenshotAnnotations}
        />
      )}
      <div></div>
    </figure>
  );
};

export default ScreenshotFigure;
