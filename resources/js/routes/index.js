import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./route";
import PublicRoute from "./Public";
import PrivateRoute from "./Private";

const index = () => {
    return (
        <Router>
            <Switch>
                {routes.map((route, index) => {
                    if (route.auth) {
                        return <PrivateRoute key={index} {...route} />;
                    }
                    return <PublicRoute key={index} {...route} />;
                })}
            </Switch>
        </Router>
    );
};

export default index;
