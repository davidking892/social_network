import * as ActionTypes from "../action_types";
import Http from "../../services/Http";

const defaultUser = {
    id: null,
    name: null,
    email: null
};

const initialState = {
    isAuthenticated: false,
    user: defaultUser
};

const logout = state => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    const stateObj = Object.assign({}, state, {
        isAuthenticated: false,
        user: defaultUser
    });
    return stateObj;
};

const checkAuth = state => {
    const access_token = localStorage.getItem("access_token");

    const stateObj = Object.assign({}, state, {
        isAuthenticated: !!access_token,
        user: JSON.parse(localStorage.getItem("user"))
    });

    if (state.isAuthenticated) {
        Http.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    }

    return stateObj;
};

const authLogin = (state, payload) => {
    const { access_token: AccessToken, user } = payload;
    localStorage.setItem("access_token", AccessToken);
    localStorage.setItem("user", JSON.stringify(user));
    Http.defaults.headers.common.Authorization = `Bearer${AccessToken}`;

    const stateObj = Object.assign({}, state, {
        isAuthenticated: true,
        user
    });

    return stateObj;
};

const Auth = (state = initialState, { type, payload } = action) => {
    switch (type) {
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state, payload);
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        default:
            return state;
    }
};

export default Auth;
