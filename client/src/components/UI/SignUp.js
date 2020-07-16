import React from "react";
import classnames from "classnames";
import hash from "object-hash";
import { v4 as getUuid } from "uuid";
import { EMAIL_REGEX } from "../../utils/helpers";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
      };
   }
   showInputs() {
      this.setState({
         isDisplayingInputs: true,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      });
   }
   async setEmailState(emailInput) {
      console.log(emailInput);
      const lowerCasedEmailInput = emailInput.toLowerCase();

      if (emailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (!EMAIL_REGEX.test(String(lowerCasedEmailInput))) {
         this.setState({
            emailError: "Please enter A VALID email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }
   checkHasLocalPart(passwordInput, emailInput) {
      const localPart = emailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return passwordInput.includes(localPart);
   }

   async setPasswordState(passwordInput, emailInput) {
      console.log(passwordInput);
      const uniqChars = [...new Set(passwordInput)];
      if (passwordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (passwordInput.length < 9) {
         this.setState({
            passwordError: "Password must be 9 characters.",
            hasPasswordError: true,
         });
      } else if (this.checkHasLocalPart(passwordInput, emailInput)) {
         this.setState({
            passwordError: "Password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "Password msut contain more then 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const emailInput = document.getElementById("email-input").value;
      const passwordInput = document.getElementById("password-input").value;

      await this.setEmailState(emailInput);
      await this.setPasswordState(passwordInput, emailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         // create user object
         const user = {
            id: getUuid(),
            email: emailInput,
            password: hash(passwordInput),
            createdOn: Date.now(),
         };
         console.log("created user object for POST", user);
         // post to API
         // Update currentUser in global state with API response
         // go to next page this.props.history.push("/create-answer");
      }
   }
   render() {
      return (
         <div className="offset-1 col-10 offset-sm-2 col-sm-8 offset-md-1 col-md-5 offset-lg-2 col-lg-4 offset-xl-1 col-xl-4">
            <div className="card p-3 mb-5">
               <h2 className="card-title">Nice to meet you</h2>
               <p className="mb-5">Sign up for White Bear. Free forever</p>
               {this.state.isDisplayingInputs && (
                  <>
                     <p className="mb-5 text-success">
                        Let's get you signed up.
                     </p>

                     <label htmlFor="email">Email address</label>
                     <input
                        type="email"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasEmailError,
                        })}
                        id="email-input"
                     />

                     {this.state.hasEmailError && (
                        <small className="text-danger mb-3">
                           {this.state.emailError}
                        </small>
                     )}

                     <label htmlFor="password">Create a password</label>

                     <span className="text-muted ">
                        Must be at least 9 characters.
                     </span>
                     <input
                        type="password"
                        className={classnames({
                           "form-control": true,
                           "is-invalid": this.state.hasPasswordError,
                        })}
                        id="password-input"
                     />
                     {this.state.hasPasswordError && (
                        <div className="text-danger ">
                           <small>{this.state.passwordError}</small>
                        </div>
                     )}

                     <button
                        className="btn btn-success float-right btn-block btn-lg  mt-3"
                        onClick={() => {
                           this.validateAndCreateUser();
                        }}
                     >
                        Let's go!
                     </button>
                  </>
               )}
               {!this.state.isDisplayingInputs && (
                  <>
                     <button
                        className="btn btn-success float-right w-100 car btn-lg"
                        onClick={() => {
                           this.showInputs();
                        }}
                     >
                        Sign up
                     </button>
                  </>
               )}
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
