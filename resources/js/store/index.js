import { applyMiddleware, createStore, compose } from "redux";
import ReduxThunk from "redux-thunk";
import RootReducer from "./reducers";

const store = createStore(RootReducer, compose(applyMiddleware(ReduxThunk)));
export default store;
