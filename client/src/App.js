import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import {Provider} from "react-redux";
import store from "./redux/store";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Home from "./components/Home";
import JoinCleanUp from "./components/map/JoinCleanUp"
import Authentication from "./components/authentication/Authentication"
import CleanUpDetail from "./components/map/CleanUpDetail";
import SearchBar from "./components/map/SearchBar"


//first comment for github
function App() {
    return (
        <Provider store={store}>
            <Router>
                {/*<NavBar/>*/}
                <Switch>
                    <Route exact path="/" component={Authentication}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/join_cleanup" component={JoinCleanUp}/>
                    <Route exact path="/join_cleanup/:id" component={CleanUpDetail}/>
                </Switch>
            </Router>
        </Provider>

    );
}

export default App;
