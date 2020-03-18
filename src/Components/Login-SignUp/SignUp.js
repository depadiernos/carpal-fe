import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

import "../../index.scss";
import "./SignUp.scss";

import { SignUpAction } from "../../Redux/Actions/UserAction";

function SignUp(props) {
    const { errors, touched } = props;

    return (
        <div className="login-container">
            <div className="module-nav">
                <NavLink className="login-title" to="/login">
                    Login
                </NavLink>
                {/* signup container */}
                <NavLink className="signup-link" to="/signup">
                    Sign Up
                </NavLink>
                <p role="signup-component">Sign Up</p>
            </div>

            {/* form container */}
            <Form className="formik-container">
                {touched.last_name && errors.last_name && (
                    <p>{errors.last_name}</p>
                )}
                <label>
                    <Field
                        className="formik-fields"
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                    />
                </label>
                {touched.first_name && errors.first_name && (
                    <p>{errors.first_name}</p>
                )}
                <label>
                    <Field
                        className="formik-fields"
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                    />
                </label>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <label>
                    <Field
                        className="formik-fields"
                        type="email"
                        name="email"
                        placeholder="email@email.com"
                    />
                </label>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    <Field
                        className="formik-fields"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                </label>

                <button className="form-btn" type="submit">
                    Submit
                </button>
            </Form>
        </div>
    );
}

const SignUpForm = withFormik({
    mapPropsToValues: values => {
        return {
            first_name: values.first_name || "",
            last_name: values.last_name || "",
            email: values.email || "",
            password: values.password || ""
        };
    },
    validationSchema: Yup.object().shape({
        first_name: Yup.string().required("Please enter your first name."),
        last_name: Yup.string().required("Please enter your last name."),
        email: Yup.string()
            .email("Please enter a valid email.")
            .required("Please enter your email."),
        password: Yup.string()
            .min(10, "Password must be at least 10 characters.")
            .required("Please enter your password.")
    }),
    handleSubmit(values, { props }) {
        props.SignUpAction(values);
    }
})(SignUp);

export default connect(null, { SignUpAction })(SignUpForm);