import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import jwtDecode from "jwt-decode";
import Home from "./components/pages/home/Home";
import JoinCleanUp from "./components/locations/JoinCleanUp"
import CleanUpDetail from "./components/locations/CleanUpDetail";
import Authentication from "./components/authentication/Authentication"
import UserProfile from "./components/pages/UserProfile"
import AboutUs from "./components/pages/about/AboutUs"
import CreateCleanUp from "./components/locations/create_clean_site/CreateCleanUp";
import axios from "axios";

//session expired using token
const token = localStorage.getItem("FBIdToken");
if (token) {
    const decodedIdToken = jwtDecode(token);
    if (decodedIdToken.exp * 1000 < Date.now()) {
        alert("session timed out.");
        window.location.href = "/authentication";
        localStorage.removeItem("FBIdToken");
        delete axios.defaults.headers.common["Authorization"];
    }
}

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/authentication" component={Authentication}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/about-us" component={AboutUs}/>
                    <Route exact path="/join-cleanup" component={JoinCleanUp}/>
                    <Route exact path="/create-cleanup" component={CreateCleanUp}/>
                    <Route exact path="/cleanup-detail/:id" component={CleanUpDetail}/>
                    <Route exact path="/profile" component={UserProfile}/>
                    <Redirect exact from="/" to="home"/>
                </Switch>
            </Router>
        </Provider>

    );
}

export default App;
