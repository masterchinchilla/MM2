import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
//webps
import AdobeStockGreenPrdceCrateOnDrkGrnBG from "../assets/adobeStockGreenPrdceCrateOnDrkGrnBG.webp";
import LadyCurlersKitchenCrazy from "../assets/ladyCurlersKitchenCrazy.webp";
import FoodAndPaperworkOnTable from "../assets/foodAndPaperworkOnTable.webp";
import GuyGroceryShppngStrssdLngLst from "../assets/guyGroceryShppngStrssdLngLst.webp";
import GuyPrppngFdInKtchnThumbsUp from "../assets/guyPrppngFdInKtchnThumbsUp.webp";
import SimpleIngrdnts from "../assets/simpleIngrdnts.webp";
import LadyPttngPrpdMealsInFridge from "../assets/ladyPttngPrpdMealsInFridge.webp";
import TopViewManCookingWHowChowOnTablet from "../assets/topViewManCookingWHowChowOnTablet.webp";
import HowChowWMPScreenTopScrnSht from "../assets/howChowWMPScreenTopScrnSht.webp";
import HowChowCmmntyWMPsListSS from "../assets/howChowCmmntyWMPsListSS021623.webp";
import HowChowCopyWMPBttnSS from "../assets/howChowCopyWMPBttnSS021623.webp";
import HowChowShoppingListSS from "../assets/howChowShoppingListSS021723.webp";
import AdobeStockVeggieHeart from "../assets/adobeStockVeggieHeart.webp";
import FakeHealthyCkBk from "../assets/fakeHealthyCkBk.webp";
import ExtravagantIngredients from "../assets/extravagantIngredients.webp";
import RetroRecipeBoxInCircleOvrManyPrppdMeals from "../assets/retroRecipeBoxInCircleOvrManyPrppdMealsTall022023.webp";
//gifs
import HowChowGifChngRcpUpdtsBdgt from "../assets/HowChowGifChngRcpUpdtsBdgt021523.gif";
import HowChowGifChngIngrdntQtyUpdtsBdgt from "../assets/HowChowGifChngIngrdntQtyUpdtsBdgt021523.gif";
import HowChowGifUpdtShppngLst from "../assets/howChowGifUpdtShppngLst021723.gif";
import HowChowGifCreateNewRecipeAndIngrdnt from "../assets/HowChowGifCreateNewRecipeAndIngrdnt022023.gif";
//svgs
import AdobeStockFatArrow from "../assets/adobeStockFatArrow.svg";
//svg Components
import LogoAndWordsCrossWBG from "./LogoAndWordsCrossWBG.component";
import HowChowLogo from "./HowChowLogo.component";
//third Party Libs
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
//my react components
import MobileScreenShotAndFrame from "./MobileScreenShotAndFrame.component";
import ScreenshotFigure from "./ScreenshotFigure.component";
import ScreenshotCarousel from "./ScreenshotCarousel.component";

// const thisYear = new Date().getFullYear();
const viewportWidth = window.visualViewport.width;
const HomePage = (props) => {
  const { currentGRFUser, closeNavOnClick, componentLineage } = props;
  const scrnshtCrsl1ObjsArry = [
    {
      screenshotType: "mobile",
      description: `Start with a budget (Cals, Carbs, Protein, Fat &
                  Fiber)`,
      screenshotImg: HowChowWMPScreenTopScrnSht,
      screenshotAnnotations: (
        <div>
          <div
            className="screenshotAnnotation"
            style={{
              width: "9.75rem",
              height: "10rem",
              marginTop: "3.4rem",
              marginLeft: "0.5rem",
            }}
          ></div>
          <svg
            data-name="longOrangeArrow"
            viewBox="0 0 98.5991786958 790.2349186274"
            style={{
              marginTop: "13.2rem",
              height: "14rem",
            }}
          >
            <line
              class="longOrangeArrowCls-1"
              x1="49.0939977262"
              x2="49.0939977262"
              y2="787.2340425532"
            />
            <line
              class="longOrangeArrowCls-1"
              x1="2.6447576046"
              y1="744.5343465046"
              x2="51.0939977262"
              y2="787.2340425532"
            />
            <line
              class="longOrangeArrowCls-1"
              x1="95.9527424198"
              y1="744.1248419338"
              x2="47.0939977262"
              y2="787.2340425527"
            />
          </svg>
        </div>
      ),
      screenshotStyles: ``,
    },
    {
      screenshotType: "mobile",
      description: `Watch "Current" & "Remaining" change in real-time while choosing Meals`,
      screenshotImg: HowChowGifChngRcpUpdtsBdgt,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
    {
      screenshotType: "mobile",
      description: `Customize ingredient quantities to get a tighter match`,
      screenshotImg: HowChowGifChngIngrdntQtyUpdtsBdgt,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
  ];
  const scrnshtCrsl2ObjsArry = [
    {
      screenshotType: "desktop",
      description: `Share meal plans with the community...`,
      screenshotImg: HowChowCmmntyWMPsListSS,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
    {
      screenshotType: "mobile",
      description: `Or copy one you like and
              customize it for your budget!`,
      screenshotImg: HowChowCopyWMPBttnSS,
      screenshotAnnotations: (
        <div
          className="screenshotAnnotation"
          style={{
            width: "4.4rem",
            height: "3.25rem",
            marginTop: "8.2rem",
            marginLeft: "8.3rem",
          }}
        ></div>
      ),
      screenshotStyles: ``,
    },
  ];
  const scrnshtCrsl3ObjsArry = [
    {
      screenshotType: "mobile",
      description: `HowChow automatically creates your shopping list as-you-go`,
      screenshotImg: HowChowShoppingListSS,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
    {
      screenshotType: "mobile",
      description: `Check-off items and update qtys in real-time`,
      screenshotImg: HowChowGifUpdtShppngLst,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
  ];
  const scrnshtCrsl4ObjsArry = [
    {
      screenshotType: "desktop",
      description: `Choose from hundreds of prebuilt, SIMPLE recipes made
                with common ingredients`,
      screenshotImg: RetroRecipeBoxInCircleOvrManyPrppdMeals,
      screenshotAnnotations: "",
      screenshotStyles: { backgroundSize: `cover` },
    },
    {
      screenshotType: "mobile",
      description: `...Or create your own! Easily add recipes and ingredients`,
      screenshotImg: HowChowGifCreateNewRecipeAndIngrdnt,
      screenshotAnnotations: "",
      screenshotStyles: ``,
    },
  ];
  const [localUser, updateLocalUser] = useState({
    _id: 1,
    handle: "",
  });
  // function getCurrentUser() {
  //   const jwt = localStorage.getItem("token");
  //   if (jwt) {
  //     const decodedUser = jwtDecode(jwt);
  //     updateCurrentGRFUser(decodedUser);
  //   }
  // }
  useEffect(() => {
    console.log(currentGRFUser);
    if (!currentGRFUser) {
      const retrievedRecord = getCurrentUser();
      const currentUser = retrievedRecord
        ? retrievedRecord
        : {
            _id: 1,
            handle: "",
          };
      updateLocalUser(currentUser);
    }
  }, []);
  return (
    <div className="pageContent" onClick={() => closeNavOnClick("outside")}>
      <header>
        <LogoAndWordsCrossWBG
          key={`LogoAndWordsCrossWBG_for_${componentLineage}`}
        />
        <br />
        <Link
          key={`Link_for_"/weekMealPlans/usersWMPs/"_for_goToWeekMealPlans_button_for_${componentLineage}`}
          to={
            !localUser.handle !== 1
              ? "/weekMealPlans"
              : {
                  pathname: "/weekMealPlans/usersWMPs/" + localUser._id,
                  state: { currentGRFUser: localUser },
                }
          }
          className="homeWMPsLink"
        >
          <FontAwesomeIcon
            key={`FontAwesomeIcon_for_tableList_for_goToWeekMealPlans_button_for_${componentLineage}`}
            icon="fa-solid fa-table-list"
            className="biggerIcon"
          />
          <span style={{ textDecoration: "none" }}>
            Go to Week Meal Plans &gt;
          </span>
        </Link>
      </header>
      <main className="howChowHomePgMain">
        <section>
          <div className="tagLineOverImg">
            <img
              src={AdobeStockGreenPrdceCrateOnDrkGrnBG}
              className="bigHomeStockPic"
            />
            <span>A better way to meal plan for macros.</span>
          </div>
          <h1 className="h1HomePg">
            HowChow lets you budget your macros like you would budget your
            money.
          </h1>
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
          <ScreenshotCarousel
            key={`ScreenshotCarousel_for_scrnshtCrsl1ObjsArry_for_${componentLineage}`}
            componentLineage={`ScreenshotCarousel_for_scrnshtCrsl1ObjsArry_for_${componentLineage}`}
            screenshotObjsArray={scrnshtCrsl1ObjsArry}
          />
        </section>
        <section>
          <h1 className="h1HomePg ckBkTooHrdSctnHdr">
            <em>
              You shouldn't have to be a gourmet chef to meet your macros...
            </em>
          </h1>
          <div className="hlthyCkBkTooHrdFlxBox">
            <div className="ckBkTooHrdCkBkCont">
              <img src={FakeHealthyCkBk} className="ckBkTooHrdCookBook" />
            </div>
            <svg
              viewBox="0 0 2247.6 1885.4"
              class="adobeStockFatArrow ckBkTooHrdArrow"
            >
              <path
                d="M2245.5,950.7C2026.8,708,1789.8,476,1560.6,251.6c-80.6-78.9-163.8-160.4-245.2-241.3c-1-4.3-3.5-7.5-7.1-9.2
              c-4-1.9-8.5-1.3-12.2,1.4c-5.6,4.2-7.9,12.4-6.5,22.7v288.2H8c-4.4,0-8,3.6-8,8v1218.2c0,4.4,3.5,7.9,7.9,8
              c162.5,2.6,331.7,1.2,495.3-0.1c263.3-2.2,535.4-4.4,786.6,9.9v320c0,3.1,1.8,6,4.7,7.3c1.1,0.5,2.2,0.7,3.3,0.7
              c1.9,0,3.8-0.7,5.3-2c173.4-151.4,351.5-332.7,523.8-508.1c136.7-139.1,278-283,418.2-413.4C2248.2,958.9,2248.5,953.9,2245.5,950.7
              z"
              />
            </svg>
            <div className="hlthyCkBkTooHrdGrid othersBad">
              <div
                style={{
                  backgroundImage: `url(${ExtravagantIngredients})`,
                  backgroundSize: `contain`,
                }}
                className="ckBkTooHrdExImgTL"
              />
              <div
                style={{ backgroundImage: `url(${FoodAndPaperworkOnTable})` }}
                className="ckBkTooHrdExImgTR"
              />
              <div
                style={{
                  backgroundImage: `url(${GuyGroceryShppngStrssdLngLst})`,
                }}
                className="ckBkTooHrdExImgBL"
              />
              <div
                style={{ backgroundImage: `url(${LadyCurlersKitchenCrazy})` }}
                className="ckBkTooHrdExImgBR"
              />
            </div>
          </div>
          <h2>
            Use <span className="howChowMaintainableHeading">HowChow</span> to
            create a{" "}
            <span className="howChowMaintainableHeading">
              <i>maintainable</i>
            </span>{" "}
            meal plan you'll actually stick with!
          </h2>
          <div className="hlthyCkBkTooHrdFlxBox">
            <div className="ckBkTooHrdCkBkCont">
              <HowChowLogo
                key={`HowChowLogo_for_ckBkTooHrdCkBkCont_for_${componentLineage}`}
              />
            </div>
            <svg
              viewBox="0 0 2247.6 1885.4"
              class="adobeStockFatArrow ckBkTooHrdArrow"
            >
              <path
                d="M2245.5,950.7C2026.8,708,1789.8,476,1560.6,251.6c-80.6-78.9-163.8-160.4-245.2-241.3c-1-4.3-3.5-7.5-7.1-9.2
              c-4-1.9-8.5-1.3-12.2,1.4c-5.6,4.2-7.9,12.4-6.5,22.7v288.2H8c-4.4,0-8,3.6-8,8v1218.2c0,4.4,3.5,7.9,7.9,8
              c162.5,2.6,331.7,1.2,495.3-0.1c263.3-2.2,535.4-4.4,786.6,9.9v320c0,3.1,1.8,6,4.7,7.3c1.1,0.5,2.2,0.7,3.3,0.7
              c1.9,0,3.8-0.7,5.3-2c173.4-151.4,351.5-332.7,523.8-508.1c136.7-139.1,278-283,418.2-413.4C2248.2,958.9,2248.5,953.9,2245.5,950.7
              z"
              />
            </svg>
            <div className="hlthyCkBkTooHrdGrid howChowGood">
              <div
                style={{ backgroundImage: `url(${SimpleIngrdnts})` }}
                className="ckBkTooHrdExImgTL"
              />
              <div
                style={{
                  backgroundImage: `url(${TopViewManCookingWHowChowOnTablet})`,
                }}
                className="ckBkTooHrdExImgTR"
              />
              <div
                style={{
                  backgroundImage: `url(${LadyPttngPrpdMealsInFridge})`,
                }}
                className="ckBkTooHrdExImgBL"
              />
              <div
                style={{
                  backgroundImage: `url(${GuyPrppngFdInKtchnThumbsUp})`,
                }}
                className="ckBkTooHrdExImgBR"
              />
            </div>
          </div>
          <br />
          <section>
            <ScreenshotCarousel
              key={`ScreenshotCarousel_for_scrnshtCrsl4ObjsArry_for_${componentLineage}`}
              componentLineage={`ScreenshotCarousel_for_scrnshtCrsl4ObjsArry_for_${componentLineage}`}
              screenshotObjsArray={scrnshtCrsl4ObjsArry}
            />
          </section>
        </section>
        <section>
          <h1>Eat social!</h1>
          <ScreenshotCarousel
            key={`ScreenshotCarousel_for_scrnshtCrsl2ObjsArry_for_${componentLineage}`}
            componentLineage={`ScreenshotCarousel_for_scrnshtCrsl2ObjsArry_for_${componentLineage}`}
            screenshotObjsArray={scrnshtCrsl2ObjsArry}
          />
        </section>
        <section>
          <h1>Shop efficiently</h1>
          <ScreenshotCarousel
            key={`ScreenshotCarousel_for_scrnshtCrsl3ObjsArry_for_${componentLineage}`}
            componentLineage={`ScreenshotCarousel_for_scrnshtCrsl3ObjsArry_for_${componentLineage}`}
            screenshotObjsArray={scrnshtCrsl3ObjsArry}
          />
        </section>
        <section className="callToAction">
          <Link
            key={`Link_for_"/weekMealPlans"_for_getStartedLink_button_for_${componentLineage}`}
            to={
              !localUser.handle !== 1
                ? "/weekMealPlans"
                : {
                    pathname: "/weekMealPlans/usersWMPs/" + localUser._id,
                    state: { currentGRFUser: localUser },
                  }
            }
            className="getStartedLink"
          >
            Get started
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
