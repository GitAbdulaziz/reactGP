import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux"; // Import the Redux provider
import { store } from "./redux/store"; // Import the Redux store
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import HomePage from "../src/views/Pages/HomePage";
import SearchApp from "components/Search/SearchApp";
import SignIn from "views/Pages/SignIn";
import SignUp from "views/Pages/SignUp";
import NotFound from "views/Pages/NotFound";
import About from "views/Pages/About";
import Catch from "components/Catch/Catch";
import { ChakraProvider } from "@chakra-ui/react";
import Contact from "views/Pages/Contact"

// Global error handler for ResizeObserver loop errors
const observerErrorHandler = (error) => {
  if (error.message.includes("ResizeObserver")) {
    // Ignore ResizeObserver-related errors
    console.warn("ResizeObserver error suppressed:", error.message);
    return;
  }
  throw error; // Rethrow other errors
};

// Attach the handler to the global error event
window.addEventListener("error", observerErrorHandler);


ReactDOM.render(
  <ChakraProvider>
  <Provider store={store}>
    <Router>
      <Switch>
        {/* Define your routes */}
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Route path="/search" component={SearchApp} />
        <Route path="/about" component={About} />
        <Route path="/notfound" component={NotFound} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/warning" component={Catch} />
        <Route path="/Contact" component={Contact} />

        <Route exact path="/home" component={HomePage} />

        {/* Redirect the root path to "/home" */}
        <Redirect exact from="/" to="/home" />

        {/* Catch-all route for undefined paths */}
        <Route component={NotFound} />
      </Switch>
    </Router>
    
  </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);