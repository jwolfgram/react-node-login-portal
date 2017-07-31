import React, {Component} from "react";
import {browserHistory} from "../../../utils/routes";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import "./index.css";
import {withRouter} from 'react-router';
import {login, logout} from '../../../actions';
import Pages from "../";
import {getRandomQuote} from '../../../utils/API.js';

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

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      authorName: null,
      quoteText: null
    }
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    getRandomQuote().then((res) => {
      let quoteText = res.content.replace(/<\/?[^>]+(>|$)/g, "")
      let authorName = res.title
      this.setState({quoteText, authorName})
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoggedIn) {
      this.props.history.replace('/');
    }
  }

  logout() {
    Pages.Home.navbarItem = false;
    this.props.logout()
  }

  showQuote() {
    if (this.state.quoteText) {
      return (
        <div className="text-center">
          <div className="card quote-box">
            <blockquote>{this.state.quoteText}</blockquote>
            <cite>{this.state.authorName}</cite>
          </div>
        </div>
      )
    }

  }

  render() {
    return (
      <div className="fixed-container">
        <div>
          <div className="ext-center">
            <h1 className="text-center">Welcome {this.props.username}!</h1>
            <p className="text-center">
              {this.props.message}
            </p>
            {this.showQuote()}
            <hr/>
          </div>
          <div className="center-btn row-btn-margin">
            <button onClick={this.logout} className="btn btn-danger" type="button" role="button">
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

// Export
Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;
const mapStateToProps = ({user}) => ({username: user.username, message: user.message, isLoggedIn: user.isLoggedIn});
const dispatch = {
  login,
  logout
};
export default connect(mapStateToProps, dispatch)(withRouter(Landing));
