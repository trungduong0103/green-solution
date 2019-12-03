import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import Register from "./components/authentication/Temp/Register";
import Login from "./components/authentication/Temp/Login";
import Home from "./components/Home";
import JoinCleanUp from "./components/map/JoinCleanUp"
import CreateCleanUp from "./components/map/CreateCleanUp"
import Authentication from "./components/authentication/Authentication"
import CleanUpDetail from "./components/map/CleanUpDetail";
// import './stylesheets/App.css';

//first comment for github
function App() {
    return (
        <Provider store={store}>
            <Router>
                {/*<NavBar/>*/}
                <Switch>
                    <Route exact path="/authentication" component={Authentication}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/join-cleanup" component={JoinCleanUp}/>
                    <Route exact path="/create-cleanup" component={CreateCleanUp}/>
                    <Route exact path="/join-cleanup/:id" component={CleanUpDetail}/>
                    <Redirect exact from="/" to="home"/>
                </Switch>
            </Router>
        </Provider>

    );
}

export default App;
