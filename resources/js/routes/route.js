import Home from "../pages/Home";
import Entrance from "../auth/Entrance";
import ForgotPassword from "../pages/ForgotPassword";

const routes = [
    {
        path: "/",
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: "/entrance",
        exact: true,
        component: Entrance
    },
    {
        path: "/forgot-password",
        exact: true,
        component: ForgotPassword
    }
];

export default routes;
