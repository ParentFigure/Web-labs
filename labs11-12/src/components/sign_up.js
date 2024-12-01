import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "./Button";


const SignUp = () => {
    const handleSubmit = (values, { resetForm }) => {
        localStorage.setItem("userEmail", values.email); // Зберігаємо email у LocalStorage
        resetForm();
        window.location.href = "/"; // Перенаправлення на захищену сторінку
    };

    return (
        <div className="register-form">
            <h2>Register new account</h2>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema = {Yup.object({
                    username: Yup.string()
                    .required("Username is required"),
                    email: Yup.string()
                    .email("Invalid email address")
                    .matches(/.+@gmail\.com$/, "Email must end with @gmail.com")
                    .required("Email is required"),
                    password: Yup.string()
                        .min(6, "Password must be at least 6 characters")
                        .required("Password is required"),
                    confirmPassword: Yup.string()
                        .oneOf([Yup.ref("password"), null], "Passwords must match")
                        .required("Confirm password is required"),
                })}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field type="text" name="username" placeholder="Username"/>
                            <ErrorMessage className="signup-error" name="username" component="div" />
                        </div>
                        <div>
                            <Field type="email" name="email" placeholder="E-mail"/>
                            <ErrorMessage className="signup-error" name="email" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage className="signup-error" name="password" component="div" />
                        </div>
                        <div>
                            <Field type="password" name="confirmPassword" placeholder="Retype password" />
                            <ErrorMessage className="signup-error" name="confirmPassword" component="div" />
                        </div>
                        <div className="member-info">
                            <span>Already have an account? </span>
                            <a href="/login">Sign in</a>
                        </div>
                        <Button className="button" type="submit" text="SIGN ME UP" disabled={isSubmitting} />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
