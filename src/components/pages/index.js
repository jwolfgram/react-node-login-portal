/**
 * Created by joewolfgram on 7/30/17.
 */
import Landing from "./Landing";
import Login from "./Login";

const pages = {
  Login: {
    href: "/",
    navbarItem: true,
    component: Login
  },
  Home: {
    href: "/home",
    navbarItem: false,
    component: Landing
  }
};

export default pages;
