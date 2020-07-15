import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
   constructor(props) {
      super(props);
      this.state = { hasLoginBeenClicked: false, emailError: "" };
   }
   loginClicked() {
      this.setState({
         hasLoginBeenClicked: true,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
      });
   }
   async setEmailState() {
      const emailInput = document.getElementById("Login-email").value;
      const lowerCasedEmailInput = emailInput.toLowerCase();
      if (emailInput === "")
         this.setState({
            emailError: "Please enter email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCasedEmailInput) === false) {
         this.setState({
            emailError: "Please enter VALID email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please enter password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Password must be 9 characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndVerifyUser() {
      console.log("Validate me!");
      const emailInput = document.getElementById("Login-email").value;
      const passwordInput = document.getElementById("Login-password").value;

      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdOn: Date.now(),
         };
         console.log("created user object for POST", user);
         axios
            .get(
               "https://raw.githubusercontent.com/Edd-wordd/white-bear-mpa/master/src/mock%20data/user.JSON"
            )
            .then((res) => {
               // handle success
               const currentUser = res.data;
               console.log(currentUser);
               this.props.dispatch({
                  type: actions.UPDATE_CURRENT_USER,
                  payload: res.data,
               });
            })
            .catch((error) => {
               // handle error
               console.log(error);
            });
         this.props.history.push("/create-answer");
      }
   }
   render() {
      return (
         <div className="offset-1 col-10 offset-sm-2 col-sm-8 offset-md-1 col-md-5 offset-lg-1 col-lg-4 offset-xl-1 col-xl-5">
            <div className="card p-3 mb-5">
               <h2 className="card-title">Welcome back</h2>
               <p className="mb-5">
                  Log in with your email address and password.
               </p>
               <label htmlFor="Login-email">Email address</label>
               <input
                  type="email"
                  className={classnames({
                     "form-control": true,
                     "is-invalid": this.state.hasEmailError,
                  })}
                  id="Login-email"
               />
               {this.state.hasEmailError && (
                  <small className=" mb-3 text-danger">
                     {this.state.emailError}
                  </small>
               )}

               <label htmlFor="password">Password</label>
               <input
                  type="password"
                  className={classnames({
                     "form-control": true,
                     "is-invalid": this.state.hasPasswordError,
                  })}
                  id="Login-password"
               />

               {this.state.hasPasswordError && (
                  <small className=" mb-3 text-danger">
                     {this.state.passwordError}
                  </small>
               )}

               <button
                  id="loginPage"
                  className="btn btn-success float-right mt-4"
                  onClick={() => {
                     this.validateAndVerifyUser();
                  }}
               >
                  Log in
               </button>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(Login));
