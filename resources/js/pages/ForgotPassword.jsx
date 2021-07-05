import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import classNames from "classnames";
import { resetPassword } from "../services/authService";

class ForgotPassword extends Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            success: false,
            email: "",
            errors: {},
            response: {
                error: false,
                message: ""
            }
        };
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        const credentials = {
            email: this.state.email
        };

        this.setState({ response: { error: false, message: "" } });

        this.setState({ loading: true });
        this.submit(credentials);
    };

    submit(credentials) {
        this.props
            .dispatch(resetPassword(credentials))
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/" }
        };
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            return <Redirect to={from} />;
        }

        const { response, errors, loading } = this.state;

        return (
            <div>
                <div className="d-flex flex-column flex-row align-content-center py-5">
                    <div className="container">
                        <div className="row">
                            <div className="section-login col-lg-6 ml-auto mr-auto">
                                <h4>Request Password Reset</h4>

                                <div className="card-login card mb-3">
                                    <div className="card-body">
                                        {this.state.success && (
                                            <div
                                                className="alert alert-success text-center"
                                                role="alert"
                                            >
                                                A password reset link has been
                                                sent!
                                            </div>
                                        )}

                                        {response.error && (
                                            <div
                                                className="alert alert-danger text-center"
                                                role="alert"
                                            >
                                                {response.message}
                                            </div>
                                        )}

                                        {!this.state.success && (
                                            <form
                                                className="form-horizontal"
                                                method="POST"
                                                onSubmit={this.handleSubmit}
                                                ref={el => {
                                                    this.forgotPasswordForm = el;
                                                }}
                                            >
                                                <div className="form-group">
                                                    <label htmlFor="email">
                                                        Email Address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        className={classNames(
                                                            "form-control",
                                                            {
                                                                "is-invalid":
                                                                    "email" in
                                                                    errors
                                                            }
                                                        )}
                                                        placeholder="Enter email"
                                                        required
                                                        onChange={
                                                            this.handleChange
                                                        }
                                                        disabled={loading}
                                                    />

                                                    {"email" in errors && (
                                                        <div className="invalid-feedback">
                                                            {errors.email}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="form-group text-center">
                                                    <button
                                                        type="submit"
                                                        className={classNames(
                                                            "btn btn-primary",
                                                            {
                                                                "btn-loading": loading
                                                            }
                                                        )}
                                                    >
                                                        Send Password Reset
                                                        Email
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ForgotPassword.defaultProps = {
    location: {
        state: {
            pathname: "/"
        }
    }
};

const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps)(ForgotPassword);
