import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import HowChowHaloFork from "../assets/HowChowHaloForkWLayerNames020923.svg";
import HowChowLogoWWordsCross from "../assets/HowChowLogoWWordsCross020323.svg";
import HowChowCrossWrdsWHaloFrkNGreyIcons from "../assets/HowChowCrossWrdsWHaloFrkNGreyIcons020723.svg";
import HowChowWMPScreenTopScrnSht from "../assets/howChowWMPScreenTopScrnSht.png";
import AdobeStockVeggieHeart from "../assets/adobeStockVeggieHeart.png";
import AdobeStockGreenPrdceCrateOnDrkGrnBG from "../assets/adobeStockGreenPrdceCrateOnDrkGrnBG.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
import LogoAndWordsCrossWBG from "./LogoAndWordsCrossWBG.component";
const thisYear = new Date().getFullYear();
const ShoppingListItem = (props) => {
  const [currentGRFUser, updateCurrentGRFUser] = useState({
    _id: 1,
    handle: "",
  });
  function getCurrentUser() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decodedUser = jwtDecode(jwt);
      updateCurrentGRFUser(decodedUser);
    }
  }
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <React.Fragment>
      <header>
        <LogoAndWordsCrossWBG />
        <br />
        <div className="homeWMPsLinkCont">
          <Link
            to={
              !currentGRFUser.handle !== 1
                ? "/weekMealPlans"
                : {
                    pathname: "/weekMealPlans/usersWMPs/" + currentGRFUser._id,
                    state: { currentGRFUser: currentGRFUser },
                  }
            }
            className="homeWMPsLink"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-table-list"
              className="biggerIcon"
            />
            <span style={{ textDecoration: "none" }}>
              Go to Week Meal Plans &gt;
            </span>
          </Link>
        </div>
      </header>
      <main>
        <section>
          <div
            className="tagLineOverImg"
            style={{
              backgroundImage: `url(${AdobeStockGreenPrdceCrateOnDrkGrnBG})`,
            }}
          >
            <div></div>
            <h1>A better way to meal plan for macros.</h1>
          </div>

          {/* <img
            src={AdobeStockGreenPrdceCrateOnDrkGrnBG}
            className="bigHomeStockPic"
          /> */}
          <em>Budget your macros like you budget your money!</em>
          <div className="budgetVeggiesIllstrtn">
            <img src={AdobeStockVeggieHeart} />
            <svg viewBox="0 0 2247.6 1885.4" class="adobeStockFatArrow">
              <path
                d="M2245.5,950.7C2026.8,708,1789.8,476,1560.6,251.6c-80.6-78.9-163.8-160.4-245.2-241.3c-1-4.3-3.5-7.5-7.1-9.2
	c-4-1.9-8.5-1.3-12.2,1.4c-5.6,4.2-7.9,12.4-6.5,22.7v288.2H8c-4.4,0-8,3.6-8,8v1218.2c0,4.4,3.5,7.9,7.9,8
	c162.5,2.6,331.7,1.2,495.3-0.1c263.3-2.2,535.4-4.4,786.6,9.9v320c0,3.1,1.8,6,4.7,7.3c1.1,0.5,2.2,0.7,3.3,0.7
	c1.9,0,3.8-0.7,5.3-2c173.4-151.4,351.5-332.7,523.8-508.1c136.7-139.1,278-283,418.2-413.4C2248.2,958.9,2248.5,953.9,2245.5,950.7
	z"
              />
            </svg>
            <svg className="accountingIcon" viewBox="0 0 512 512">
              <g id="Outline">
                <g id="Outline-2" data-name="Outline">
                  <path d="M49.987,482h124a18.02,18.02,0,0,0,18-18V380a18.02,18.02,0,0,0-18-18h-124a18.019,18.019,0,0,0-18,18v84A18.019,18.019,0,0,0,49.987,482Zm92.668-108h31.332a6.007,6.007,0,0,1,6,6v18H142.655Zm0,36h37.332v54a6.007,6.007,0,0,1-6,6H142.655ZM93.319,374h37.336v24H93.319Zm0,36h37.336v24H93.319Zm0,36h37.336v24H93.319ZM43.987,380a6.006,6.006,0,0,1,6-6H81.319v24H43.987Zm0,30H81.319v24H43.987Zm0,36H81.319v24H49.987a6.006,6.006,0,0,1-6-6Z" />
                  <path d="M41.987,512h376a42.047,42.047,0,0,0,42-42V112s15-.054,20,0c17.576.189,32.7-15.414,31.984-32.98C511.273,61.922,496.623,48,478.9,48h-18.91V42a42.047,42.047,0,0,0-42-42H176.9a41.71,41.71,0,0,0-29.7,12.3L64.287,95.212a41.725,41.725,0,0,0-12.3,29.7V256h-10a42.047,42.047,0,0,0-42,42V470A42.047,42.047,0,0,0,41.987,512Zm430-452h6.91c11.3,0,20.646,8.7,21.082,19.379.449,10.987-9,20.739-19.992,20.621-2-.021-8,0-8,0Zm-12,40h-12V60h12Zm-304-79.486V86a18.02,18.02,0,0,1-18,18H72.5C72.593,103.9,155.679,20.74,155.987,20.513Zm-92,104.4A30.1,30.1,0,0,1,65.334,116h72.653a30.033,30.033,0,0,0,30-30V13.347A30.056,30.056,0,0,1,176.9,12h241.09a30.033,30.033,0,0,1,30,30v6H253.545a17.982,17.982,0,0,0-9.812,2.908L214.455,69.938c-7.2,4.376-7.194,15.747,0,20.124l29.282,19.031A17.973,17.973,0,0,0,253.545,112H447.987V470a30.033,30.033,0,0,1-30,30H211.325a41.89,41.89,0,0,0,12.182-24H404.268a19.743,19.743,0,0,0,19.719-19.719V163.718A19.743,19.743,0,0,0,404.268,144H107.705a19.742,19.742,0,0,0-19.718,19.719V256h-24ZM435.987,60v40h-180V60Zm-192,5.055V94.943L220.994,80Zm72,126.945v80H214.908a41.91,41.91,0,0,0-32.921-16h-38V192Zm-172-12V156h172v24Zm80,190V298a41.721,41.721,0,0,0-2.451-14h94.451v86Zm92,12v82h-92V382Zm48-190v80h-36V192Zm-36-12V156h36v24Zm36,104v86h-36V284Zm0,98v82h-36V382Zm48-190v80h-36V192Zm-36-12V156h28.281a7.727,7.727,0,0,1,7.719,7.719V180Zm36,104v86h-36V284Zm0,98V456.28A7.727,7.727,0,0,1,404.268,464H375.987V382Zm-312-202V163.718A7.727,7.727,0,0,1,107.705,156h24.282v24Zm32,12v64h-32V192Zm-120,106a30.033,30.033,0,0,1,30-30h140a30.033,30.033,0,0,1,30,30V470a30.033,30.033,0,0,1-30,30h-140a30.033,30.033,0,0,1-30-30Z" />
                  <path d="M49.987,342h124a18.02,18.02,0,0,0,18-18V304a18.02,18.02,0,0,0-18-18h-124a18.019,18.019,0,0,0-18,18v20A18.019,18.019,0,0,0,49.987,342Zm-6-38a6.006,6.006,0,0,1,6-6h124a6.007,6.007,0,0,1,6,6v20a6.007,6.007,0,0,1-6,6h-124a6.006,6.006,0,0,1-6-6Z" />
                </g>
              </g>
            </svg>
          </div>
          <p>
            Build your meal plan to fit your macros budget - get the most out of
            your meals.
          </p>
          <figure className="figure card">
            <figcaption className="figure-caption">
              Build your meal plan to fit your macros budget - get the most out
              of your meals.
            </figcaption>

            <div
              className="screenshot"
              style={{
                backgroundImage: `url(${HowChowWMPScreenTopScrnSht})`,
              }}
            >
              <div className="screenshotFrame">
                <div
                  className="screenshotAnnotation"
                  style={{
                    width: "5.25rem",
                    height: "3.65rem",
                    top: "25rem",
                    left: "5.25rem",
                  }}
                ></div>
              </div>
            </div>

            {/* <img
              className="homePgScreenShot figure-img"
              src="https://lh3.googleusercontent.com/QjWTI_skEwRWHqQ7uQwTz9Ek6ybShJ34LUQgexZv1TpyGzDjXvOl1UUeyDlTukiVEaCTxUaF4n5-GydZ_vYrWAf7haE3n4LoCHfVDE6g94Nd5sf8QkTOUsk6sJZVK_JSfo2vaWjemQ=w2400"
            /> */}
          </figure>
          <figure className="figure card">
            <figcaption className="figure-caption">
              ...Then, customize ingredient quantities to get a tighter match!
            </figcaption>
            <img
              className="homePgScreenShot figure-img"
              src="https://lh3.googleusercontent.com/0pCJWisjmyziTDw_TzcGhFEePgtC32GJVwECQLpLwkD4sLYrpxnQB1vRuKIkdY79sy5k2_x_z4m8Ez2KIAeVguBz8EM947BWGf4Kqq3tHZN6kgOwBPHTbZAdl2DHtZ6JtfC9QlDlcw=w2400"
            />
          </figure>
        </section>
        <section>
          <h1>You shouldn't have to be a gourmet chef to meet your macros!</h1>
          <h2>
            Create a <i>maintainable</i> meal plan you'll actually stick with!
          </h2>
          <section>
            <figure className="figure card">
              <figcaption className="figure-caption">
                Choose from hundreds of prebuilt, <i>simple</i> recipes made
                with common ingredients.
              </figcaption>
              <img />
            </figure>
          </section>
          <section>
            <h2>
              <em>...or</em> build your own!
            </h2>
            <figure className="figure card">
              <figcaption className="figure-caption">
                Easily add recipes / ingredients to our library.
              </figcaption>
              <img />
            </figure>
          </section>
        </section>
        <section>
          <h1>Eat social!</h1>
          <figure className="figure card">
            <figcaption className="figure-caption">
              Share meal plans with the community, or copy one you like and
              customize it for your budget!
            </figcaption>
            <img />
          </figure>
        </section>
        <section>
          <h1>Shop efficiently</h1>
          <figure className="figure card">
            <figcaption className="figure-caption">
              HowChow automatically creates your shopping list as you go.
            </figcaption>
            <img />
          </figure>
          <figure className="figure card">
            <figcaption className="figure-caption">
              Check-off items and update qtys in real-time.
            </figcaption>
            <img />
          </figure>
        </section>
      </main>
      <footer className="footer">
        <p>Copyright &copy; {thisYear} by Catharta, Ltd.</p>
      </footer>
    </React.Fragment>
  );
};

export default ShoppingListItem;
