import React from "react";
import { Route, Redirect } from "react-router-dom";
import Base from "../components/BaseComponent/Base";
import { connect } from "react-redux";

export const Private = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Base>
                    <Component {...props} />
                </Base>
            ) : (
                <Redirect
                    to={{
                        pathname: "/entrance",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(Private);
