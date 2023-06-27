import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const VerifyEmail = (props) => {
  const search = useLocation().search;
  const [token] = useState(new URLSearchParams(search).get("token"));
  const [msg, setMsg] = useState("verifing");
  useEffect(() => {
    console.log(token);
    axios
      .post(`${process.env.REACT_APP_API_URL}/verify-email`, { token: token })
      .then((res) => setMsg("Verified Successfully"))
      .catch((err) => setMsg("Verification Failed"));
  }, []);
  return (
    <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">
      <div className="mail__wrapper max-w-md mx-auto">
        <div className="mail__content bg-white p-8 shadow-md">
          <div className="content__header text-center tracking-wide border-b">
            <h1 className="text-3xl h-48 flex items-center justify-center">
              {msg}
            </h1>
          </div>
          <Link to={"/login"}>
            <button className="text-sm tracking-wide bg-red rounded w-full my-8 p-4">
              Click here to Sign in
            </button>
          </Link>
        </div>
        <div className="text-center text-sm text-grey-darker mt-8"></div>
      </div>
    </div>
  );
};

export default VerifyEmail;
