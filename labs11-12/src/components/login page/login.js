import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../Button";

const Login = () => {
    const handleSubmit = (values, { resetForm }) => {
        const savedEmail = localStorage.getItem("userEmail");
        
        if (savedEmail && savedEmail === values.email) {
            alert("Login successful!");
            window.location.href = "/"; 
        } else {
            alert("Invalid credentials!");
        }
    
        resetForm();
    };

    return (
        <div className="login-form">
            <h2>Submit the form to sign in</h2>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema = {Yup.object({
                    email: Yup.string()
                    .email("Invalid email address")
                    .matches(/.+@gmail\.com$/, "Email must end with @gmail.com")
                    .required("Email is required"),
                    password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type="email" name="email" placeholder="E-mail"/>
                            <ErrorMessage className="signup-error" name="email" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage className="signup-error" name="password" component="div" />
                        </div>
                        <div className="member-info">
                            <span>Not a member? </span>
                            <a href="/sign-up">Sign up</a>
                        </div>
                        <Button className="button" type="submit" text="LOGIN" disabled={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
