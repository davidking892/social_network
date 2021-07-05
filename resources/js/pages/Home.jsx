import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import debounce from "../tools/debounce";
import Http from "../services/Http";
import { connect } from "react-redux";
import Display from "./Display";
import * as action from "../store/actions";

class Home extends Component {
    constructor() {
        super();

        this.state = {
            message: ""
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.supplyData(name, value);
    };

    supplyData = debounce((name, value) => {
        this.setState({
            [name]: value
        });
    }, 500);

    handlePost = e => {
        e.preventDefault();

        Http.post("/api/createPost", {
            message: this.state.message
        })
            .then(res => {
                this.setState({
                    message: ""
                });
            })
            .catch(err => {
                const { status, errors } = err.response.data;
                console.log(errors);
            });
    };

    handleLogout = e => {
        e.preventDefault();

        this.props.dispatch(action.authLogout());
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/entrance" }
        };

        const { isAuthenticated } = this.props;

        if (!isAuthenticated) {
            <Redirect to={from} />;
        }

        return (
            <>
                <div className="container mt-4 text-center">
                    <Button onClick={this.handleLogout}>LogOut</Button>
                </div>
                <Grid container spacing={8} className="justify-content-center">
                    <Grid item md={6} className="mt-4">
                        <h3>What do you have to say?</h3>

                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="3"
                                    placeholder="Enter email"
                                    name="message"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>

                            <Button onClick={this.handlePost}>
                                Create Post
                            </Button>
                        </Form>
                    </Grid>
                </Grid>
                <Display
                    isAuthenticated={this.props.isAuthenticated}
                    authUser={this.props.user}
                />
            </>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user
});

export default connect(mapStateToProps)(Home);
