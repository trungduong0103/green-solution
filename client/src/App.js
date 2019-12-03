import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from "react-redux";
import store from "./redux/store";
import Home from "./components/Home";
import JoinCleanUp from "./components/map/JoinCleanUp"
import CreateCleanUp from "./components/map/CreateCleanUp"
import CleanUpDetail from "./components/map/CleanUpDetail";
import Authentication from "./components/authentication/Authentication"

function App() {
    return (

        <Provider store={store}>
            <Router>
                {/*<NavBar/>*/}
                <Switch>
                    <Route exact path="/authentication" component={Authentication}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/join-cleanup" component={JoinCleanUp}/>
                    <Route exact path="/create-cleanup" component={CreateCleanUp}/>
                    <Route exact path="/cleanup-detail/:id" component={CleanUpDetail}/>
                    <Redirect exact from="/" to="home"/>
                </Switch>
            </Router>
        </Provider>

    );
}

export default App;
