import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import userReducer from "./reducers/UsersReducer";
import UIReducer from "./reducers/UIReducer";
import locationsReducer from "./reducers/LocationsReducer"
import formReducer from "./reducers/FormReducer";

const initialState = {};

const reducers = combineReducers({
    user: userReducer,
    UI: UIReducer,
    locationsData: locationsReducer,
    formState: formReducer
});

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;
