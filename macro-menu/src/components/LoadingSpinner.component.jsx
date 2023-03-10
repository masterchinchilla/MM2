import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingForkSpoonSpinner from "../assets/lottieForkSpoonSpinner.json";
const LoadingSpinner = ({ recordLoaded, player }) => {
  return (
    <div className="lottieCont" hidden={recordLoaded}>
      <div className="lottieSubCont">
        <span className="lottieText">Loading...</span>
        <Player
          autoplay
          loop
          src={LoadingForkSpoonSpinner}
          className="lottiePlayer"
          ref={player}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
