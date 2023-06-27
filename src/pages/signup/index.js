import "./style.css";
import CustomInput from "../../components/customInput";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { signUp } from "../../redux/auth/auth-action";
import { useEffect, useState } from "react";

const SignUp = (props) => {
    const { auth } = props;

    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        setRegistered(auth.registered);
    }, [auth?.registered]);

    const SignUpSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("Name is required")
            .min(5, "Minimum 5 characters")
            .max(50, "Maximum 50 characters"),
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required")
            .min(5, "Minimum 5 characters")
            .max(200, "Maximum 200 characters"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
    });

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
    };

    const onSubmit = (fields) => {
        fields.confirmPassword = fields.password;
        props.dispatch(signUp(fields));
    };

    return (
        <div className="bg-black h-full w-full min-h-screen flex justify-center items-center text-white">
            <div className="max-w-md w-full bg-dark-400 py-10 px-10">
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={SignUpSchema}
                    onSubmit={onSubmit}
                >
                    {({ errors, values, touched, setValues, isValid }) => (
                        <Form>
                            {auth.error && (
                                <div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                    role="alert"
                                >
                                    <span className="block sm:inline">
                                        {auth.error}
                                    </span>
                                </div>
                            )}

                            {auth.registered && (
                                <div className="rounded p-3 sm:p-2 border-2 border-green-600 bg-green-300 mb-5">
                                    <p className="text-green-600">
                                        Check your email. We have sent a
                                        verification link on your email
                                    </p>
                                </div>
                            )}

                            <h1 className="mt-10 font-bold  text-xl">
                                New here?
                            </h1>
                            <p className="mt-1 mb-10 ">
                                Signing up is easy. It only takes a few steps
                            </p>

                            <CustomInput
                                placeholder={"Username"}
                                name="fullName"
                                className="focus:outline-none"
                                error={
                                    errors.fullName && touched.fullName ? 1 : 0
                                }
                            />
                            <CustomInput
                                placeholder={"Email"}
                                name="email"
                                className="focus:outline-none"
                                error={errors.email && touched.email ? 1 : 0}
                            />
                            <CustomInput
                                type="password"
                                placeholder={"Password"}
                                name="password"
                                className="focus:outline-none"
                                error={
                                    errors.password && touched.password ? 1 : 0
                                }
                            />
                            <div className="flex items-center justify-end mb-4 mt-7">
                                {/* <div className="flex items-center">
                <input type="checkbox" />
                <label for="fruit2"></label>
              </div> */}
                                <a
                                    href="/forgot"
                                    className=" underline text-sm text-gray-400"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <button
                                className=" bg-blue-600 w-full py-3 rounded"
                                type="submit"
                            >
                                SIGN UP
                            </button>
                            <p className="text-sm text-center mt-3">
                                Already have an account? {""}
                                <Link
                                    to="/login"
                                    className=" text-blue-600 underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(SignUp);
