import "./style.css";
import CustomInput from "../../components/customInput";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { login } from "../../redux/auth/auth-action";
import { useState, useEffect } from "react";
import shield from "../../assets/images/shield.png";

const Login = (props) => {
    const { auth } = props;

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(auth.loggedIn);
    }, [auth?.loggedIn]);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email is invalid")
            .required("Email is required")
            .min(5, "Minimum 5 characters")
            .max(50, "Maximum 50 characters"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const onSubmit = (fields) => {
        props.dispatch(login(fields));
    };

    if (loggedIn) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <div className="bg-black h-full w-full min-h-screen flex justify-center items-center text-white p-5">
                <div className="form-container rounded-3xl">
                    <div className="form-left p-5 sm:p-10">
                        <img src={shield} alt="shield" className="mb-12" />
                        <h2 className="text-white-100 mb-8 text-4xl font-bold">
                            Avtar Wallet
                        </h2>
                        <p className="text-gray-300 text-xl">
                            Avtar is a secure and easy to
                        </p>
                        <p className="text-gray-300 mb-8 text-xl">
                            Use crypto wallet. Store, send <br/>
                            receive your crypto assets<br/>
                            with ease.
                        </p>
                    
                        <p className="text-gray-300 mb-8 text-x0.8">
                            www.avtarexchange.com
                        </p>
                    </div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={onSubmit}
                    >
                        {({ errors, values, touched, setValues, isValid }) => (
                            <Form className="bg-dark-400 p-5 sm:p-10 rounded-3xl h-full">
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
                                <h1 className="mt-10 font-bold  text-xl text-center sm:text-left">
                                    Welcome to Avtar wallet
                                </h1>
                                <p className="mt-1 mb-10 text-center sm:text-left">
                                    Sign in to start
                                </p>

                                <CustomInput
                                    placeholder={"Email "}
                                    name="email"
                                    className="focus:outline-none"
                                    error={
                                        errors.email && touched.email ? 1 : 0
                                    }
                                />
                                <CustomInput
                                    type="password"
                                    placeholder={"Password"}
                                    name="password"
                                    className="focus:outline-none"
                                    error={
                                        errors.password && touched.password
                                            ? 1
                                            : 0
                                    }
                                />
                                <div className="flex items-center  justify-end mb-4 mt-7">
                                    {/* <div className="flex items-center">
                    <input type="checkbox" />
                    <label for="fruit2"></label>
                  </div> */}
                                    <a
                                        href="/forgot"
                                        className=" underline text-sm text-gray-400"
                                    >
                                        {/* Forgot Password? */}
                                    </a>
                                </div>
                                <button className=" bg-blue-600 w-full py-3 rounded">
                                    SIGN IN
                                </button>
                                <p className="text-sm text-center mt-3">
                                    Don't have an account?{" "}
                                    <Link
                                        to="/signup"
                                        className=" text-blue-600 underline"
                                    >
                                        Create One
                                    </Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Login);
