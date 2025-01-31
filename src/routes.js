// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Locations from "views/Dashboard/Locations.js";
import Subscription from "views/Dashboard/Subscription.js";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import HomePage from "../src/views/Pages/HomePage";
import SearchApp from "components/Search/SearchApp";
import {
  HomeIcon,
  SearchLogo,
  CreditIcon,
  PersonIcon,
  SignInLogo,
  SignUpLogo,
  StatisticsIcon,
  LocationLogo
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <StatisticsIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },  {
    path: "/locations",
    name: "Locations",
    icon: <LocationLogo color='inherit' />,
    component: Locations,
    layout: "/admin",
  },
  {
    path: "/home",
    name: "HomePage",
    icon: <HomeIcon color='inherit' />,
    component: HomePage,
    layout: "",
  },
 
  {
    path: "/search",
    name: "SearchApp",
    icon: <SearchLogo color='inherit' />,
    component: SearchApp,
    layout: "",
  },
  
  {
    path: "/subscription",
    name: "Subscription",
    icon: <CreditIcon color='inherit' />,
    component: Subscription,
    layout: "/admin",
  },
 
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <SignInLogo color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <SignUpLogo color='inherit' />,
        secondaryNavbar: true,
        component: SignUp,
        layout: "/auth",
      },
      
    ],
  },
];
export default dashRoutes;
