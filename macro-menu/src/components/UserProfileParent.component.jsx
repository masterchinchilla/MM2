import React, { Component } from "react";
class UserProfileParent extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      ...currentUser,
    };
  }

  render() {
    return (
      <div style={{ marginTop: "4rem", fontSize: "3rem" }}>Hello World</div>
    );
  }
}

export default UserProfileParent;
