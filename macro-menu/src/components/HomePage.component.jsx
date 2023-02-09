import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import HowChowLogoWWordsCross from "../assets/HowChowLogoWWordsCross020323.svg";
import HowChowCrossWrdsWHaloFrkNGreyIcons from "../assets/HowChowCrossWrdsWHaloFrkNGreyIcons020723.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwtDecode from "jwt-decode";
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
        <img
          src={HowChowCrossWrdsWHaloFrkNGreyIcons}
          alt="How Chow Logo with Words Cross"
          className="logoWWordsCrossBigHome"
        />
        <br />
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
            className="primaryColorText biggerIcon"
          />
          <span style={{ textDecoration: "none" }}>
            Go to Week Meal Plans &gt;
          </span>
        </Link>
      </header>
      <main>
        <section>
          <h1>A better way to meal plan for macros.</h1>
          <em>Budget your macros like you budget your money!</em>
          <p>
            Build your meal plan to fit your macros budget - get the most out of
            your meals.
          </p>
          <figure className="figure card">
            <figcaption className="figure-caption">
              Build your meal plan to fit your macros budget - get the most out
              of your meals.
            </figcaption>
            <img
              className="homePgScreenShot figure-img"
              src="https://lh3.googleusercontent.com/QjWTI_skEwRWHqQ7uQwTz9Ek6ybShJ34LUQgexZv1TpyGzDjXvOl1UUeyDlTukiVEaCTxUaF4n5-GydZ_vYrWAf7haE3n4LoCHfVDE6g94Nd5sf8QkTOUsk6sJZVK_JSfo2vaWjemQ=w2400"
            />
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
