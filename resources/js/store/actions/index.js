import * as ActionTypes from "../action_types";

export function authLogout() {
    return {
        type: ActionTypes.AUTH_LOGOUT
    };
}

export function authCheck() {
    return {
        type: ActionTypes.AUTH_CHECK
    };
}

export function authLogin(payload) {
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    };
}
