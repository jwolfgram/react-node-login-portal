/**
 * Created by joewolfgram on 7/30/17
 */
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Pages from "../components/pages";
import Navigation from "../components/common/Navigation";

class Navbar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  render() {
    browserHistory = this.context.router.history;
    return <Navigation menuItems={Pages} router={this.context.router}/>;
  }
}

function populateRoutes() {
  let routesArray = [];
  let routesWithParamsArray = [];
  for (let componentName in Pages) {
    routesArray.push(<Route key={componentName} path={Pages[componentName].href} exact component={Pages[componentName].component}/>);
  }
  return routesArray;
}

const Routes = props => {
  return (
    <BrowserRouter {...props}>
      <div>
        <Route component={Navbar}/>
        <Switch>
          {populateRoutes()}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export let browserHistory;
export default Routes;
