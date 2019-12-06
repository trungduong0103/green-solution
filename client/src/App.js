import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import JoinCleanUp from "./components/locations/JoinCleanUp"
import CreateCleanUp from "./components/locations/CreateCleanUp"
import CleanUpDetail from "./components/locations/CleanUpDetail";
import Authentication from "./components/authentication/Authentication"
import UserProfile from "./components/UserProfile"
import AboutUs from "./components/AboutUs"
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
