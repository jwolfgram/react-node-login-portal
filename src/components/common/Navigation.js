import React, {Component} from 'react';
import {browserHistory, Routes} from '../../utils/routes';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserDropdown: null,
      navigationLinks: [],
      isUserAuthenticated: false
    };
    this.showNavigationLink = this.showNavigationLink.bind(this);
    this.webLogin = this.webLogin.bind(this);
    this.loadProfile = this.loadProfile.bind(this);
  }

  componentWillMount() { //Whatever happens here is added to state before component is mounted
    let navigationLinks = this.props.menuItems;
    let navigationArr = [];
    for (let menuName in navigationLinks) {
      let menuObject = navigationLinks[menuName];
      if (menuObject.hasOwnProperty('href')) {
        menuObject.name = menuName;
        navigationArr.push(menuObject);
      }
    }
    this.setState({navigationLinks: this.state.navigationLinks.concat(navigationArr)})
  }

  webLogin(err, userData, authenticated) {
    let history = this.props.router.history;

    if (authenticated) {
      history.push('/dashboard');
    } else {
      history.push('/welcome');
    }
    this.setState({showUserDropdown: false, isUserAuthenticated: authenticated});
  }

  loadProfile() {
    this.setState({showUserDropdown: false});
    let history = this.props.router.history;
    history.push('/profile');
  }

  showNavigationLink() { //This also seems to be handling the actual implementation of which navbar to display (Menu items or show login only on navbar)
    let path = this.props.router.history.location.pathname;
    let navigationLinks = this.props.menuItems;
    let navigationArr = [];

    for (let menuName in navigationLinks) {
      let menuObject = navigationLinks[menuName];
      if (menuObject.hasOwnProperty('href')) {
        let paramsArray = menuObject.href.match(/[:]\w+/g);
        if (path === menuObject.href) {
          menuObject.isActive = true;
        } else {
          if (typeof(paramsArray) === undefined) {
            if (menuObject.href.includes(path)) {
              menuObject.isActive = true;
            }
          } else {
            menuObject.isActive = false;
          }
        }
        menuObject.name = menuName;
        navigationArr.push(menuObject);
      }
    }

    return (
      <Navbar.Collapse>
        <ul className="nav navbar-nav">
          {this.state.navigationLinks.map((menuItems, i) => {
            if (menuItems.hasOwnProperty('isActive') && menuItems['navbarItem']) {
              if (menuItems.isActive === true) {
                return (
                  <li role="presentation" className="active" key={i + "_navItem"} href='#'>
                    <Link key={i} to={menuItems.href}>{menuItems.name}</Link>
                  </li>
                );
              } else {
                return (
                  <li role="presentation" key={i + "_navItem"} href='#'>
                    <Link key={i} to={menuItems.href}>{menuItems.name}</Link>
                  </li>
                );
              }
            }
            return
          })}
        </ul>
      </Navbar.Collapse>
    )
  }

  render() {
    return (
      <div id="navigation-container" className="container-fluid">
        <Navbar fixedTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <img className="navbar-logo" src="/images/mernStack.png" alt="#"/>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          {this.showNavigationLink()}
        </Navbar>
      </div>
    );
  }
}
