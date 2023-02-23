import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScreenshotFigure from "./ScreenshotFigure.component";
const ScreenshotCarousel = ({ screenshotObjsArray }) => {
  const viewportWidth = window.visualViewport.width;
  const screenshotObjsArrayLength = screenshotObjsArray.length;
  const [scrnShtCrslSlideNum, setscrnShtCrslSlideNum] = useState(0);
  function handleClickCarouselNextPrev(next) {
    if (next) {
      setscrnShtCrslSlideNum(scrnShtCrslSlideNum + 1);
    } else {
      setscrnShtCrslSlideNum(scrnShtCrslSlideNum - 1);
    }
  }
  return (
    <div
      className="outerCarousel"
      style={{
        // margin: viewportWidth > 1000 ? "1rem" : "1rem 0",
        padding: viewportWidth > 1000 ? "1rem" : "auto auto 1rem auto",
      }}
    >
      <button
        style={{
          visibility:
            viewportWidth > 1000 || scrnShtCrslSlideNum === 0
              ? "hidden"
              : "visible",
        }}
        onClick={() => {
          handleClickCarouselNextPrev(false, screenshotObjsArrayLength);
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
      </button>
      <div
        className="innerCarousel"
        style={{ flexDirection: viewportWidth < 1000 ? "column" : "row" }}
      >
        {screenshotObjsArray.map((screenshotObj, index) => {
          const screenshotType = screenshotObj.screenshotType;
          return (
            <React.Fragment>
              <ScreenshotFigure
                screenshotType={screenshotType}
                currentSlideNum={scrnShtCrslSlideNum}
                thisSlideNum={index}
                viewportWidth={viewportWidth}
                figCaptionClasses={`${screenshotType}SSFigCaption`}
                figCaptionText={screenshotObj.description}
                screenshot={screenshotObj.screenshotImg}
                screenshotAnnotations={screenshotObj.screenshotAnnotations}
                figureClasses={
                  screenshotType === "mobile" ? "mobileSSFig" : "desktopSSFig"
                }
                screenshotStyles={screenshotObj.screenshotStyles}
              />
              {index !== screenshotObjsArrayLength - 1 ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-chevron-right"
                  hidden={viewportWidth < 1000}
                />
              ) : (
                ""
              )}
            </React.Fragment>
          );
        })}
      </div>
      <button
        style={{
          visibility:
            viewportWidth > 1000 ||
            scrnShtCrslSlideNum === screenshotObjsArrayLength - 1
              ? "hidden"
              : "visible",
        }}
        onClick={() => {
          handleClickCarouselNextPrev(true, screenshotObjsArrayLength);
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
};

export default ScreenshotCarousel;
