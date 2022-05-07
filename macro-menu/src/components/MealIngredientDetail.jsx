import React, { Component } from "react";
import EditOptions from "./EditOptions.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MealIngredientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thisMealIngredient: this.props.thisMealIngredient,
      userType: "admin",
      thisFormState: "viewing",
      mealIngrdntFormState: "editingOrig",
      thisIngrdntsBrand: {},
      thisIngrdntsWeightType: {},
      genRecipeIngrdntFormState: "viewing",
      ingredientFormState: "viewing",
      deleteMealIngrdntMsg:
        "Meal Ingredient will be deleted. To add it back, you'll need to delete all other Ingredients, then click 'Populate Ingredients.' Do you want to proceed?",
      // allGenRecipeIngredients: this.props.allGenRecipeIngredients,
    };
  }
  componentDidMount() {
    let thisMealIngredient = this.props.thisMealIngredient;
    let thisIngrdnt = thisMealIngredient.genRecipeIngredient.ingredient;
    let thisIngrdntsBrand = thisIngrdnt.brand;
    let thisIngrdntsWeightType = thisIngrdnt.weightType;
    if (thisIngrdntsBrand === undefined) {
      thisIngrdntsBrand = {
        _id: "627691b69fa56aa1fe318393",
        name: "",
        GRFUser: {
          GRFUser: { _id: "62577a533813f4f21c27e1c7", handle: "Service" },
        },
      };
    }
    if (thisIngrdntsWeightType === undefined) {
      thisIngrdntsWeightType = {
        _id: "627695899fa56aa1fe318396",
        name: "",
        GRFUser: "62577a533813f4f21c27e1c7",
      };
    }
    thisIngrdnt.brand = thisIngrdntsBrand;
    thisIngrdnt.weightType = thisIngrdntsWeightType;
    thisMealIngredient.genRecipeIngredient.ingredient = thisIngrdnt;
    this.setState({
      thisMealIngredient: thisMealIngredient,
      thisIngrdntsBrand: thisIngrdntsBrand,
      thisIngrdntsWeightType: thisIngrdntsWeightType,
    });
  }
  handleChangeQty = (e) => {
    let thisMealIngredient = this.state.thisMealIngredient;
    thisMealIngredient.qty = e.target.value;
    this.setState({
      thisMealIngredient: thisMealIngredient,
    });
    this.props.handleUpdateMealIngrdntQty(this.state.thisMealIngredient);
    // this.props.totalCurrentMacrosMethod(
    //   [this.state.thisMealIngredient],
    //   this.state.thisMealIngredient.meal.mealType
    // );
  };
  handleChangeIngrdntProp = (e) => {
    let thisMealIngredient = this.state.thisMealIngredient;
    thisMealIngredient.qty = e.target.value;
    this.props.findChangeMealIngrdntByIndex(thisMealIngredient, "update");
  };
  onClickCopy = (parentObj) => {
    if (parentObj == "mealIngredient") {
      this.setState({ mealIngrdntFormState: "editingCopy" });
    }
    if (parentObj == "genRecipeIngredient") {
      this.setState({ genRecipeIngrdntFormState: "editingCopy" });
    }
    if (parentObj == "ingredient") {
      this.setState({ ingredientFormState: "editingCopy" });
    }
  };
  onClickEdit = (parentObj) => {
    if (parentObj == "mealIngredient") {
      this.setState({ mealIngrdntFormState: "editingOrig" });
    }
    if (parentObj == "genRecipeIngredient") {
      this.setState({ genRecipeIngrdntFormState: "editingOrig" });
    }
    if (parentObj == "ingredient") {
      this.setState({ ingredientFormState: "editingOrig" });
    }
  };
  onCancel = (parentObj) => {
    if (parentObj == "mealIngredient") {
      this.setState({ mealIngrdntFormState: "viewing" });
    }
    if (parentObj == "genRecipeIngredient") {
      this.setState({ genRecipeIngrdntFormState: "viewing" });
    }
    if (parentObj == "ingredient") {
      this.setState({ ingredientFormState: "viewing" });
    }
  };
  onChange = () => {
    console.log("changing value");
  };
  onDelete = (parentObj) => {
    let thisMealIngrdnt = this.state.thisMealIngredient;
    this.props.findChangeMealIngrdntByIndex(thisMealIngrdnt, "delete");
  };
  handleChangeIngrdntAuthor = () => {
    console.log("Changed Ingredient Author");
  };
  render() {
    console.log("rendering meal ingredient");
    return (
      <div className="card mlIngrdntsCard">
        <div className="card-header mlIgrdntCrdTpSctn">
          <form className="mlIngrdntFrm">
            <div className="mlIngrdntFrmHdr">
              <label className="mlIngrdntHdr doubleHeightLabel">
                <h6>Qty</h6>
              </label>
              <EditOptions
                className="mlIngrdntFrmIcns"
                parentObj={"mealIngredient"}
                userType={this.state.userType}
                thisFormState={this.state.mealIngrdntFormState}
                onSubmitFormChange={this.onSubmitFormChange}
                onClickCopy={this.onClickCopy}
                onClickEdit={this.onClickEdit}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
                deleteMsg={this.state.deleteMealIngrdntMsg}
              />
              <input
                type={"number"}
                className="form-control mlIngrdntQty"
                value={this.state.thisMealIngredient.qty}
                placeholder={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
                onChange={(e) =>
                  this.props.updateProp(
                    "mealIngredient",
                    this.props.thisMealIngredient.meal.mealType.code,
                    "qty",
                    this.props.mealIngrdntsArrayIndex,
                    e
                  )
                }
                disabled={
                  this.state.mealIngrdntFormState === "viewing" ? true : false
                }
              />
            </div>
            <div
              className="accordion accordion-flush flushElement"
              id={"mlIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id}
            >
              <div className="accordion-item genRecipeAdminMenuBttn flushElement">
                <h2
                  className="accordion-header"
                  id={
                    "mlIngrdntFrmAccrdnHdr" + this.props.thisMealIngredient._id
                  }
                >
                  <button
                    className="accordion-button collapsed mealAdminAccrdnBttn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#mlIngrdntFrmAccrdn" + this.props.thisMealIngredient._id
                    }
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    disabled={this.state.userType == "admin" ? false : true}
                  >
                    {this.props.userType === "admin" ? (
                      <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                    ) : (
                      <FontAwesomeIcon icon="fa-solid fa-lock" />
                    )}
                  </button>
                </h2>
              </div>
              <div
                id={"mlIngrdntFrmAccrdn" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#mlIngrdntFrmAccrdnHdr" + this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#mlIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body">
                  <div className="form-group mealIngrdntInputs">
                    <h6 className="mealIngrdntHdr">Custom Ingredient</h6>
                    <label>Recipe Ingredient</label>
                    <select
                      // ref="userInput": React prevents this, but I don't know what it does anyway...
                      required
                      className="form-control form-select"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient._id
                      }
                      disabled={
                        this.state.mealIngrdntFormState === "viewing"
                          ? true
                          : false
                      }
                      //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                      onChange={(e) =>
                        this.props.updateProp(
                          "mealIngredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "genRecipeIngredient",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                    >
                      {this.props.thisRecipesIngrdnts.map(function (
                        genRecipeIngredient
                      ) {
                        return (
                          <option
                            key={genRecipeIngredient._id}
                            value={genRecipeIngredient}
                          >
                            {genRecipeIngredient.ingredient.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Meal</label>
                    <select
                      // ref="userInput": React prevents this, but I don't know what it does anyway...
                      required
                      className="form-control form-select"
                      value={this.props.thisMealIngredient.meal._id}
                      disabled={
                        this.state.mealIngrdntFormState === "viewing"
                          ? true
                          : false
                      }
                      //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                      onChange={(e) =>
                        this.props.updateProp(
                          "mealIngredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "meal",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                    >
                      {this.props.allMeals.map(function (meal) {
                        return (
                          <option key={meal._id} value={meal}>
                            {meal.day.name + " - " + meal.mealType.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Record ID</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={this.state.thisMealIngredient._id}
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <form className="gnRcpIngrdntFrm">
            <div className="gnRcpIngrdntFrmHdr">
              <label className="gnRcpIngrdntHdr doubleHeightLabel">
                <h6>Default Qty</h6>
              </label>
              <EditOptions
                className="gnRcpIngrdntFrmIcns"
                parentObj={"genRecipeIngredient"}
                userType={this.state.userType}
                thisFormState={this.state.genRecipeIngrdntFormState}
                onSubmitFormChange={this.onSubmitFormChange}
                onClickCopy={this.onClickCopy}
                onClickEdit={this.onClickEdit}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
              />
              <input
                type={"number"}
                className="form-control gnRcpIngrdntQty"
                value={
                  this.state.thisMealIngredient.genRecipeIngredient.defaultQty
                }
                //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                onChange={(e) =>
                  this.props.updateProp(
                    "genRecipeIngredient",
                    this.props.thisMealIngredient.meal.mealType.code,
                    "defaultQty",
                    this.props.mealIngrdntsArrayIndex,
                    e
                  )
                }
                disabled={
                  this.state.genRecipeIngrdntFormState === "viewing"
                    ? true
                    : false
                }
              />
            </div>
            <div
              className="accordion accordion-flush flushElement"
              id={
                "gnRcpIngrdntFrmAccrdnFll" + this.props.thisMealIngredient._id
              }
            >
              <div className="accordion-item genRecipeAdminMenuBttn flushElement">
                <h2
                  className="accordion-header"
                  id={
                    "gnRcpIngrdntFrmAccrdnHdr" +
                    this.props.thisMealIngredient._id
                  }
                >
                  <button
                    className="accordion-button collapsed mealAdminAccrdnBttn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#gnRcpIngrdntFrmAccrdn" +
                      this.props.thisMealIngredient._id
                    }
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  ></button>
                </h2>
              </div>
              <div
                id={"gnRcpIngrdntFrmAccrdn" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#gnRcpIngrdntFrmAccrdnHdr" +
                  this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#gnRcpIngrdntFrmAccrdnFll" +
                  this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body">
                  <div className="form-group mealIngrdntInputs">
                    <h6 className="genRecipeIngrdntHdr">Recipe Ingredient</h6>
                    <label>Base Ingredient</label>
                    <select
                      // ref="userInput": React prevents this, but I don't know what it does anyway...
                      required
                      className="form-control form-select"
                      value={
                        this.props.thisMealIngredient.genRecipeIngredient
                          .ingredient._id
                      }
                      disabled={
                        this.state.genRecipeIngrdntFormState === "viewing"
                          ? true
                          : false
                      }
                      //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                      onChange={(e) =>
                        this.props.updateProp(
                          "genRecipeIngredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "ingredient",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                    >
                      {this.props.allIngredients.map(function (ingredient) {
                        return (
                          <option key={ingredient._id} value={ingredient}>
                            {ingredient.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Recipe</label>
                    <select
                      // ref="userInput": React prevents this, but I don't know what it does anyway...
                      required
                      className="form-control form-select"
                      value={this.props.thisMealIngredient.meal.genRecipe._id}
                      disabled={
                        this.state.genRecipeIngrdntFormState === "viewing"
                          ? true
                          : false
                      }
                      //Most guides tell you how to make an OnChange Event Handler that doesn't take an argument and in the function you reference "e.target.value." But if you need a second argument for your function, you cannot simply write the call as "function(e, arg)", it won't work. There are several solutions. One involves wrapping the function in an anonymous function, which is already a suggested alternative to binding, to bind the function to the parent object. Normally you would do this like so: "onChange={()=>function}". When you need the 2nd argument, you need to pass the "e" arg into the anonymous function, and then pass BOTH args into the called function, like so: "onChange={(e)=>function(arg, e)}". For other solutions, see this Stack Overflow thread: https://stackoverflow.com/questions/44917513/passing-an-additional-parameter-with-an-onchange-event
                      onChange={(e) =>
                        this.props.updateProp(
                          "genRecipeIngredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "genRecipe",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                    >
                      {this.props.thisMealsTypesRecipes.map(function (
                        genRecipe
                      ) {
                        return (
                          <option key={genRecipe._id} value={genRecipe}>
                            {genRecipe.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                    <label>Record ID</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient._id
                      }
                      disabled={true}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="mlIngrdntCrdBttmSctn">
          <form className="ingrdntFrm">
            <div className="ingrdntFrmHdr">
              <h6 className="ingrdntHdr">Base Ingredient</h6>
              <EditOptions
                className="ingrdntFrmIcns"
                parentObj={"ingredient"}
                userType={this.state.userType}
                thisFormState={this.state.ingredientFormState}
                onSubmitFormChange={this.onSubmitFormChange}
                onClickCopy={this.onClickCopy}
                onClickEdit={this.onClickEdit}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
                onCreate={this.onCreate}
              />
              <div className="form-group mealIngrdntInputs ingrdntUOM">
                <label>UOM</label>
                <select
                  required
                  className="form-control form-select"
                  value={
                    this.props.thisMealIngredient.genRecipeIngredient.ingredient
                      .unitOfMeasure._id
                  }
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "unitOfMeasure",
                      this.props.mealIngrdntsArrayIndex,
                      e
                    )
                  }
                >
                  {this.props.allUnitOfMeasures.map(function (unitOfMeasure) {
                    return (
                      <option key={unitOfMeasure._id} value={unitOfMeasure}>
                        {unitOfMeasure.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mealIngrdntInputs ingrdntWghtType">
                <label>Weight Type</label>
                <select
                  required
                  className="form-control form-select"
                  value={this.state.thisIngrdntsWeightType._id}
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "weightType",
                      this.props.mealIngrdntsArrayIndex,
                      e
                    )
                  }
                >
                  {this.props.allWeightTypes.map(function (weightType) {
                    return (
                      <option key={weightType._id} value={weightType}>
                        {weightType.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div
                className="ingrdntPicDiv"
                // style={{
                //   backgroundImage: `url(${this.state.thisMealIngredient.genRecipeIngredient.ingredient.photoURL})`,
                // }}
                style={
                  this.state.thisMealIngredient.genRecipeIngredient.ingredient
                    .photoURL == undefined
                    ? {
                        backgroundImage: `url(https://i.ibb.co/vHj5XWF/placeholderimg2.png)`,
                      }
                    : {
                        backgroundImage: `url(${this.state.thisMealIngredient.genRecipeIngredient.ingredient.photoURL})`,
                      }
                }
              ></div>

              <div className="form-group mealIngrdntInputs ingrdntBrnd">
                <label>Brand</label>
                <select
                  required
                  className="form-control form-select"
                  value={this.state.thisIngrdntsBrand._id}
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "brand",
                      this.props.mealIngrdntsArrayIndex,
                      e
                    )
                  }
                >
                  {this.props.allBrands.map(function (brand) {
                    return (
                      <option key={brand._id} value={brand}>
                        {brand.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group mealIngrdntInputs ingrdntName badge bg-primary">
                <label>Ingredient Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  value={
                    this.state.thisMealIngredient.genRecipeIngredient.ingredient
                      .name
                  }
                  //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                  onChange={(e) =>
                    this.props.updateProp(
                      "ingredient",
                      this.props.thisMealIngredient.meal.mealType.code,
                      "name",
                      this.props.mealIngrdntsArrayIndex,
                      e
                    )
                  }
                  disabled={
                    this.state.ingredientFormState === "viewing" ? true : false
                  }
                />
              </div>
            </div>
            <div
              className="accordion accordion-flush"
              id={"ingrdntAccrdnFull" + this.props.thisMealIngredient._id}
            >
              <div className="accordion-item">
                <h2
                  className="accordion-header"
                  id={"ingrdntAccrdnHdr" + this.props.thisMealIngredient._id}
                >
                  <button
                    className="accordion-button mealInnerAccrdnBttn collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={
                      "#ingrdntAccrdnBdy" + this.props.thisMealIngredient._id
                    }
                  ></button>
                </h2>
              </div>
              <div
                id={"ingrdntAccrdnBdy" + this.props.thisMealIngredient._id}
                className="accordion-collapse collapse"
                aria-labelledby={
                  "#ingrdntAccrdnHdr" + this.props.thisMealIngredient._id
                }
                data-bs-parent={
                  "#ingrdntAccrdnFull" + this.props.thisMealIngredient._id
                }
              >
                <div className="accordion-body ingrdntInnrAccrdn">
                  <div className="form-group mealIngrdntInputs">
                    <label>Calories</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.calories
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "calories",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Carbs</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.carbs
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "carbs",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Protein</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.protein
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "protein",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fat</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.fat
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "fat",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Fiber</label>
                    <input
                      type={"number"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.fiber
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "fiber",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="form-group mealIngrdntInputs">
                    <label>Photo URL</label>
                    <input
                      type={"text"}
                      className="form-control"
                      value={
                        this.state.thisMealIngredient.genRecipeIngredient
                          .ingredient.photoURL
                      }
                      //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                      onChange={(e) =>
                        this.props.updateProp(
                          "ingredient",
                          this.props.thisMealIngredient.meal.mealType.code,
                          "photoURL",
                          this.props.mealIngrdntsArrayIndex,
                          e
                        )
                      }
                      disabled={
                        this.state.ingredientFormState === "viewing"
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div
                  className="accordion accordion-flush ingrdntAdminMenu"
                  id={
                    "ingrdntAdminMenuAccrdnFull" +
                    this.props.thisMealIngredient._id
                  }
                >
                  <div className="accordion-item genRecipeAdminMenuBttn">
                    <h2
                      className="accordion-header"
                      id={
                        "ingrdntAdminMenuAccrdnHdr" +
                        this.props.thisMealIngredient._id
                      }
                    >
                      <button
                        className="accordion-button collapsed mealAdminAccrdnBttn"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={
                          "#ingrdntAdminMenuAccrdnBdy" +
                          this.props.thisMealIngredient._id
                        }
                        aria-expanded="true"
                        aria-controls="collapseOne"
                        disabled={this.state.userType == "admin" ? false : true}
                      >
                        {this.props.userType === "admin" ? (
                          <FontAwesomeIcon icon="fa-solid fa-lock-open" />
                        ) : (
                          <FontAwesomeIcon icon="fa-solid fa-lock" />
                        )}
                      </button>
                    </h2>
                  </div>
                  <div
                    id={
                      "ingrdntAdminMenuAccrdnBdy" +
                      this.props.thisMealIngredient._id
                    }
                    className="accordion-collapse collapse"
                    aria-labelledby={
                      "#ingrdntAdminMenuAccrdnHdr" +
                      this.props.thisMealIngredient._id
                    }
                    data-bs-parent={
                      "#ingrdntAdminMenuAccrdnFull" +
                      this.props.thisMealIngredient._id
                    }
                  >
                    <div className="accordion-body ingrdntInnerAccrdn">
                      <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                        <label>Author</label>
                        <select
                          ref="userInput"
                          required
                          className="form-control form-select"
                          value={
                            this.state.thisMealIngredient.genRecipeIngredient
                              .ingredient.GRFUser.handle
                          }
                          disabled={
                            this.state.ingredientFormState == "viewing"
                              ? true
                              : false
                          }
                          //updateProp = (stateObject, mealType, propToUpdate, arrayIndex, e)
                          onChange={(e) =>
                            this.props.updateProp(
                              "ingredient",
                              this.props.thisMealIngredient.meal.mealType.code,
                              "GRFUser",
                              this.props.mealIngrdntsArrayIndex,
                              e
                            )
                          }
                        >
                          {this.props.allGRFUsers.map(function (GRFUser) {
                            return (
                              <option key={GRFUser._id} value={GRFUser._id}>
                                {GRFUser.handle}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="form-group mealIngrdntInputs ingrdntFrmGrpWBttmPddng">
                        <label>Record ID</label>
                        <input
                          type={"text"}
                          className="form-control"
                          value={
                            this.state.thisMealIngredient.genRecipeIngredient
                              .ingredient._id
                          }
                          disabled={true}
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MealIngredientDetail;
