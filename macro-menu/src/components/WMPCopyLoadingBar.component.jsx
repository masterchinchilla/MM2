import React from "react";
const WMPCopyLoadingBar = (props) => {
  const { showWMPCopyProgressBar, percentCopied } = props;
  return (
    <div className="wmpCopyProgressCont" hidden={!showWMPCopyProgressBar}>
      <div className="wmpCopyProgressSubCont">
        <label>Copying WMP...</label>
        <div
          className="progress"
          role="progressbar"
          aria-label="Animated striped example"
          aria-valuenow={`${percentCopied.toFixed(2)}%`}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            style={{ width: `${percentCopied.toFixed(2)}%` }}
          >
            {`${percentCopied.toFixed(2)}%`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WMPCopyLoadingBar;
