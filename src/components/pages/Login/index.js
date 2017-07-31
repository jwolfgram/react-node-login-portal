import React, {Component} from "react";
import {browserHistory} from "../../../utils/routes";
import {Link} from "react-router-dom";
import "./index.css";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {login, logout} from '../../../actions';
import Pages from "../";

const propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  history: PropTypes.object.isRequired // Provided by withRouter
};

const defaultProps = {
  isLoggedIn: false,
  username: null
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
    this.login = this.login.bind(this);
  }

  login(email, password) {
    this.props.login(this.refs.username.value, this.refs.password.value).then((user) => {
      console.log(user)
      if (!user) {
        this.setState({authError: "Login Incorrect"})
      } else {
        Pages.Home.navbarItem = true;
        this.props.history.replace('/home');
      }
    }).catch(error => window.alert(error));
  }

  render() {
    return (
      <div className="login-animate">
        <div className="animated bounceInUp">
          <div className="center-div cardWhite">
            <form className="form-horizontal">
              <fieldset>
                <legend>LOGIN</legend>
                <div>
                  {this.state.authError}
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input ref="username" type="text" placeholder="Username" className="form-control input-md"/>
                    <span className="help-block">Enter your username</span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12">
                    <input ref="password" type="password" placeholder="********" className="form-control input-md"/>
                    <span className="help-block">Enter your password</span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-12 text-center">
                    <button onClick={this.login} type="button" className="btn btn-primary">
                      LOGIN
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// Export
Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
const mapStateToProps = ({user}) => ({isLoggedIn: user.isLoggedIn, username: user.username});
const dispatch = {
  login,
  logout
};
export default connect(mapStateToProps, dispatch)(withRouter(Login));
