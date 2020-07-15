import React from "react";
import whiteBearAppLogo from "../../img/logo-app.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Header extends React.Component {
   logoutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   }
   render() {
      return (
         <>
            <img
               src={whiteBearAppLogo}
               alt="white bear logo"
               width="32px;"
               atl="white bear logo"
            />
            <h3 className="d-inline text-brand ">White Bear</h3>

            <Link
               to="/"
               className="float-right btn btn-link btn-navagation"
               onClick={() => {
                  this.logoutCurrentUser();
               }}
            >
               Log Out
            </Link>
         </>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default connect(mapStateToProps)(Header);
