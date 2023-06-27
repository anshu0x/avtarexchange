import "./login/style.css";
import axios from "axios";
import CustomInput from "../components/customInput";
import { Link, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import shield from "../assets/images/shield.png";

const ResetPass = (props) => {
    const { auth } = props;

    const search = useLocation().search;
    const [token] = useState(new URLSearchParams(search).get("token"));

    const [loggedIn, setLoggedIn] = useState(false);

    const [passReset, setPassReset] = useState(false);
    const [error, setError] = useState("");

    const modalStyles = {
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        pointerEvents: passReset ? "auto" : "none",
        opacity: passReset ? 1 : 0,
    };

    useEffect(() => {
        setLoggedIn(auth.loggedIn);
    }, [auth?.loggedIn]);

    const ResetSchema = Yup.object().shape({
        token: Yup.string().required("Token required"),
        password: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
        confirmPassword: Yup.string()
            .required("Password is required")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,25}$/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
    });

    const initialValues = {
        token: token,
        password: "",
        confirmPassword: "",
    };

    const onSubmit = (data) => {
        setError("");
        axios
            .post(`${process.env.REACT_APP_API_URL}reset-password`, data)
            .then(async (res) => {
                setPassReset(true);
            })
            .catch((err) => {
                setError("Invalid Token");
            });
    };

    if (loggedIn) {
        return <Navigate replace to="/" />;
    } else {
        return (
            <>
                <div className="bg-black h-full w-full min-h-screen flex justify-center items-center text-white p-5">
                    <div className="form-container rounded-3xl">
                        <div className="form-left p-5 sm:p-10">
                            <img src={shield} alt="shield" className="mb-12" />
                            <h2 className="text-gray-100 mb-8 text-4xl font-bold">
                                Avtar Wallet
                            </h2>
                            <p className="text-gray-300 text-xl">
                                Avtar is secure and easy to
                            </p>
                            <p className="text-gray-300 mb-8 text-xl">
                                Use crypto wallet.
                            </p>
                            <p className="text-gray-300 mb-8 italic text-2xl">
                                Store, Transfer, Receive.
                            </p>
                        </div>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={ResetSchema}
                            onSubmit={onSubmit}
                        >
                            {({
                                errors,
                                values,
                                touched,
                                setValues,
                                isValid,
                            }) => (
                                <Form className="bg-dark-400 p-5 sm:p-10 rounded-3xl h-full">
                                    {error && (
                                        <div
                                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                            role="alert"
                                        >
                                            <span className="block sm:inline">
                                                {error}
                                            </span>
                                        </div>
                                    )}
                                    <h1 className="mt-10 font-bold  text-xl text-center sm:text-left">
                                        Welcome to Avtar wallet
                                    </h1>
                                    <p className="mt-1 mb-10 text-center sm:text-left">
                                        Resest password
                                    </p>

                                    <CustomInput
                                        placeholder={"Password"}
                                        name="password"
                                        type="password"
                                        className="focus:outline-none"
                                        error={
                                            errors.password && touched.password
                                                ? 1
                                                : 0
                                        }
                                    />
                                    <CustomInput
                                        type="password"
                                        placeholder={"Confirm Password"}
                                        name="confirmPassword"
                                        className="focus:outline-none"
                                        error={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                                ? 1
                                                : 0
                                        }
                                    />

                                    <div className="flex items-center  justify-end mb-4 mt-7">
                                        <a
                                            href="/login"
                                            className=" underline text-sm text-gray-400"
                                        >
                                            Login instead?
                                        </a>
                                    </div>
                                    <button className=" bg-blue-600 w-full py-3 rounded">
                                        Reset
                                    </button>
                                    <p className="text-sm text-center mt-3">
                                        Don't have an account?
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

                <div
                    className="w-full h-screen fixed top-0 left-0 flex justify-center items-center p-10"
                    style={modalStyles}
                >
                    <div className="p-10 rounded-lg bg-dark-400 max-w-full max-h-full overflow-y-auto relative text-center">
                        <h2 className="text-gray-100 bold text-xl mb-10">
                            Password changed successfully!
                        </h2>
                        <Link
                            to="/login"
                            className="bg-blue-600 w-full p-3 rounded text-gray-200"
                        >
                            Go to Login Page
                        </Link>
                    </div>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(ResetPass);
