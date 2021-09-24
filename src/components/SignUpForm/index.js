import { Component } from "react";

import { v4 as uuidv4 } from "uuid";

import "./index.css";

const initialRegForm = [
  {
    id: uuidv4(),
    newUsername: "rahul",
    newPassword: "rahul@2021",
  },
];

class SignUpForm extends Component {
  state = {
    regForm: initialRegForm,
    newUsername: "",
    newPassword: "",
    newRePassword: "",
    showSubmitError: false,
    errorMsg: "",
    mothersMaidenName: "",
  };

  onChangeUsername = (event) => {
    this.setState({ newUsername: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ newPassword: event.target.value });
  };

  onChangeRePassword = (event) => {
    this.setState({ newRePassword: event.target.value });
  };
  onChangeMothersName = (event) => {
    this.setState({ mothersMaidenName: event.target.value });
  };

  //   onSubmitSuccess = (jwtToken) => {
  //     const { history } = this.props;
  //     Cookies.set("jwt_token", jwtToken, {
  //       expires: 30,
  //     });
  //     history.replace("/");
  //   };

  //   onSubmitFailure = (errorMsg) => {
  //     this.setState({ showSubmitError: true, errorMsg });
  //   };

  getRegFormFromLocalStorage = () => {
    const parsedRegForm = JSON.parse(localStorage.getItem("registrationForm"));
    if (parsedRegForm === null) {
      return [];
    } else {
      return parsedRegForm;
    }
  };

  signUpForm = async (event) => {
    event.preventDefault();

    localStorage.setItem("registrationForm", JSON.stringify(this.state));

    const { newUsername, newPassword, mothersMaidenName } = this.state;
    const newUser = {
      id: uuidv4(),
      newUsername,
      newPassword,
      mothersMaidenName,
    };

    this.setState((prevState) => ({
      regForm: [...prevState.initialRegForm, newUser],
      newUsername: "",
      newPassword: "",
      mothersMaidenName: "",
    }));

    // const {
    //   newUsername,
    //   newPassword,
    //   newRePassword,
    //   showSubmitError,
    //   mothersMaidenName,
    //   errorMsg,
    // } = this.state;
    // if (
    //   newUsername === "" ||
    //   newPassword === "" ||
    //   newRePassword === "" ||
    //   mothersMaidenName === ""
    // ) {
    //   this.setState((showSubmitError: true));
    //   this.setState({ errorMsg: "*Please Fill The Fields" });
    //   console.log(errorMsg);
    // } else {
    //   console.log(true);
    // }

    // const data = JSON.parse(localStorage.getItem("registrationForm"));
    // console.log(data);
    // console.log(data.newUsername);
  };

  //   componentDidMount() {
  //     this.DATA = JSON.parse(localStorage.getItem("registrationForm"));
  //     console.log(this.DATA);

  //     if (localStorage.getItem("registrationForm")) {
  //       this.setState({
  //         newUsername: this.DATA.newUsername,
  //         newPassword: this.DATA.newPassword,
  //         newRePassword: this.DATA.newRePassword,
  //         mothersMaidenName: this.DATA.mothersMaidenName,
  //       });
  //     } else {
  //       this.setState({
  //         newUsername: "",
  //         newPassword: "",
  //         newRePassword: "",
  //         mothersMaidenName: "",
  //         showSubmitError: true,
  //       });
  //     }
  //   }

  onclickSignIn = () => {
    const { getBackToSignIn } = this.props;
    getBackToSignIn();
  };

  renderRegPasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Enter Password"
        />
      </>
    );
  };

  renderRegUsernameField = () => {
    const { username } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="username">
          EMAIL / USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Username"
        />
      </>
    );
  };

  renderRegRePasswordField = () => {
    const { password } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="rePassword">
          RE-ENTER PASSWORD
        </label>
        <input
          type="password"
          id="rePassword"
          className="password-input-filed"
          value={password}
          onChange={this.onChangeRePassword}
          placeholder="Confirm Password"
        />
      </>
    );
  };

  renderMothersMaidenNameField = () => {
    const { mothersMaidenName } = this.state;
    return (
      <>
        <label className="input-label" htmlFor="mothersName">
          SECURITY QUESTION
        </label>
        <input
          type="text"
          id="mothersName"
          className="username-input-filed"
          value={mothersMaidenName}
          onChange={this.onChangeMothersName}
          placeholder="Mother's Maiden Name"
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg } = this.state;
    return (
      <form className="form-container" onSubmit={this.signUpForm}>
        <h1 className="join-now-heading">Join Now</h1>
        <div className="input-container">{this.renderRegUsernameField()}</div>
        <div className="input-container">{this.renderRegPasswordField()}</div>
        <div className="input-container">{this.renderRegRePasswordField()}</div>
        <div className="input-container">
          {this.renderMothersMaidenNameField()}
        </div>
        <div className="signUp-btn-container">
          <button type="submit" className="signin-button">
            Register
          </button>
          <button
            type="button"
            onClick={this.onclickSignIn}
            className="signup-button"
          >
            Sign In
          </button>
        </div>
        {showSubmitError && <p className="error-message">{errorMsg}</p>}
      </form>
    );
  }
}

export default SignUpForm;
