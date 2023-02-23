import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const HamburgerMenu = (props) => {
  const { linkObjsArray, hamHeader } = props;
  const [hamOpen, toggleHamOpen] = useState("pre");
  function hamOpenClose() {
    toggleHamOpen(!hamOpen ? true : false);
    // if (hamState === false) {
    //   document.getElementById("hamLine1").className = "hamLine1Opening";
    //   document.getElementById("hamLine2").className = "hamLine2Opening";
    //   document.getElementById("hamLine3").className = "hamLine3Opening";
    //   hamMenu.className = "hamMenuVisible";
    //   hamState = true;
    // } else {
    //   document.getElementById("hamLine1").className = "hamLine1Closing";
    //   document.getElementById("hamLine2").className = "hamLine2Closing";
    //   document.getElementById("hamLine3").className = "hamLine3Closing";
    //   hamMenu.className = "hamMenuHidden";
    //   hamState = false;
    // }
  }
  // useEffect(()=>{
  //     toggleHamOpen(false)
  // },[])
  return (
    <div class="hamMenu">
      <div id="hamMenuIcon" onclick={toggleHamOpen} onBlur={hamOpenClose}>
        <span
          id="hamLine1"
          className={hamOpen ? "hamLine1Opening" : "hamLine1Closing"}
        ></span>
        <span
          id="hamLine2"
          className={hamOpen ? "hamLine2Opening" : "hamLine2Closing"}
        ></span>
        <span
          id="hamLine3"
          className={hamOpen ? "hamLine3Opening" : "hamLine3Closing"}
        ></span>
      </div>
      <div
        id="hamMenuList"
        className={
          hamOpen === "pre"
            ? "hamMenuPre1stClick"
            : hamOpen
            ? "hamMenuVisible"
            : "hamMenuHidden"
        }
      >
        <h1 className="hamHeader">{hamHeader}</h1>
        <ul>
          {linkObjsArray.map((linkObj) => {
            return (
              <li>
                <Link to={linkObj.url}>{linkObj.linkTitle}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <script></script>
    </div>
  );
};

export default HamburgerMenu;
