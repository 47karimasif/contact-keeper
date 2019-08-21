import React,{Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch } from "react-router-dom"
import './App.css';

import Navbar from "./Components/layot/Navbar"
import Home from "./Components/pages/Home"
import About from "./Components/pages/About"
import Register from "./Components/Auth/Register"
import Login from "./Components/Auth/Login"
import Alerts from "./Components/layot/Alerts"

import ContactContextProvider from "./Contexts/ContactContext"
import AuthContextProvider    from "./Contexts/AuthContext"
import AlertContextProvider    from "./Contexts/AlertContext"
import setAuthToken from "../src/utils/setAuthToken"
import PrivateRoute from "./Components/Routing/PrivateRoute"

if(localStorage.token)  //check if there is a token in localstorage or not
{
    setAuthToken(localStorage.token)
}



const App = () => {

  return (
    <AuthContextProvider>
    <ContactContextProvider>
    <AlertContextProvider>
    <Router>
      
        <Fragment>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>

  </Router>
  </AlertContextProvider>
  </ContactContextProvider>
  </AuthContextProvider>
  )
}

export default App;
