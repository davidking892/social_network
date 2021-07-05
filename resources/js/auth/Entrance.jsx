import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Form, Button } from "react-bootstrap";
import { Grid } from "@material-ui/core";
import debounce from "../tools/debounce";
import { connect } from "react-redux";
import { register, login } from "../services/authService";
import { Redirect, Link } from "react-router-dom";

class Entrance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: "",
            response: {
                error: false,
                message: ""
            }
        };
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.submitData(name, value);
    };

    submitData = debounce((name, value) => {
        this.setState({
            [name]: value
        });
    }, 500);

    handleLogin = e => {
        e.preventDefault();

        const { email, password } = this.state;

        const credentials = { email, password };

        this.props
            .dispatch(login(credentials))

            .catch(err => {
                console.log(err);
            });
    };

    handleRegister = e => {
        e.preventDefault();

        const { name, email, password } = this.state;

        const credentials = { name, email, password };

        this.props
            .dispatch(register(credentials))
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/" }
        };

        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }

        return (
            <>
                <Helmet>
                    <title>Entrance</title>
                </Helmet>

                <Grid container className="">
                    <Grid item md={6} className="p-3">
                        <h3>Sign Up</h3>
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    name="name"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                onClick={this.handleRegister}
                            >
                                register
                            </Button>
                        </Form>
                    </Grid>
                    <Grid item md={6} className="p-3">
                        <h3>Sign In</h3>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={this.handleChange}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Check me out"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={this.handleLogin}
                            >
                                login
                            </Button>
                        </Form>
                        <div className="password-reset-link text-center">
                            <Link to="/forgot-password" href="/forgot-password">
                                Forgot Your Password?
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(Entrance);
