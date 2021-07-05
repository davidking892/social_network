import Http from "./Http";
import * as action from "../store/actions";

export const register = credentials => {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/auth/register", credentials)
                .then(res => resolve(res.data))
                .catch(err => {
                    const { status, errors } = err.response.data;
                    const data = { status, errors };
                    return reject(data);
                });
        });
};

export const resetPassword = credentials => {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/auth/forgot-password", credentials)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        });
};

export const login = credentials => {
    return dispatch =>
        new Promise((resolve, reject) => {
            Http.post("api/auth/login", credentials)
                .then(res => {
                    dispatch(action.authLogin(res.data));
                    return resolve();
                })
                .catch(err => {
                    const { status, errors } = err.response.data;
                    const data = { status, errors };
                    return reject(data);
                });
        });
};
