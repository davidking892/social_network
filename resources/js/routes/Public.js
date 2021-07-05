import React from "react";
import { Route } from "react-router-dom";
import Base from "../components/BaseComponent/Base";

const Public = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => (
                <Base>
                    <Component {...props} />
                </Base>
            )}
        />
    );
};

export default Public;
