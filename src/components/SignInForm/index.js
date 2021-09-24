import { Component } from "react";

import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import "./index.css";
import SignUpForm from "../SignUpForm";

class SignInForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    signUpClicked: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  getBackToSignIn = () => {
    this.setState((prev) => ({ signUpClicked: !prev.signUpClicked }));
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onclickSignup = () => {
    this.setState((prev) => ({ signUpClicked: !prev.signUpClicked }));
  };

  renderPasswordField = () => {
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

  renderUsernameField = () => {
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

  render() {
    const { showSubmitError, errorMsg, signUpClicked } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    console.log(signUpClicked);

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dmnrh67gl/image/upload/v1632163422/Red_and_Black_Game_Pad_Flat_Illustrative_Gaming_and_Technology_Product_Logo_xh5nog.gif"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />
        <img
          src="https://res.cloudinary.com/dmnrh67gl/image/upload/v1632162285/43Z_2107.w010.n001.5B.p8.5_wr88z5.jpg"
          className="login-image"
          alt="website login"
        />
        {signUpClicked ? (
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              src="https://res.cloudinary.com/dmnrh67gl/image/upload/v1632163422/Red_and_Black_Game_Pad_Flat_Illustrative_Gaming_and_Technology_Product_Logo_xh5nog.gif"
              className="login-website-logo-desktop-image"
              alt="website logo"
            />
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="btn-container">
              <button type="submit" className="signin-button">
                Sign In
              </button>
              <button
                type="button"
                onClick={this.onclickSignup}
                className="signup-button"
              >
                Sign Up
              </button>
            </div>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        ) : (
          <SignUpForm getBackToSignIn={this.getBackToSignIn} />
        )}
      </div>
    );
  }
}

export default SignInForm;
