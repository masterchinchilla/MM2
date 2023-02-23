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
    screenshotStyles,
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
          screenshotStyles={screenshotStyles}
        />
      ) : (
        <DesktopScreenShotAndFrame
          screenshot={screenshot}
          screenshotAnnotations={screenshotAnnotations}
          screenshotStyles={screenshotStyles}
        />
      )}
      <div></div>
    </figure>
  );
};

export default ScreenshotFigure;
