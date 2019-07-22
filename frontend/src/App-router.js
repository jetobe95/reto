import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginScreen from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
function AppRoute(params) {
    return (
        <Router>
            <Route path="/" exact component={LoginScreen} />
            <Route path="/home" exact component={Home} />
            <Route path="/register/"  exact component={Register} />
           
        </Router>
    )
}
export default AppRoute