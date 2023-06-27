import React, { useState, useEffect } from "react";
import { useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import User from "../../assets/images/user.png";
import User2 from "../../assets/images/user2.png";
import Wallet from "../../assets/images/wallet.png";
import Key from "../../assets/images/key.png";
import Key2 from "../../assets/images/key2.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../../redux/auth/auth-action";

const Index = ({ children, show, setShow, dispatch }) => {
    const navigator = useNavigate();

    const [showPopup, setShowPopup] = useState(false);
    const [userDetails, setUserDetails] = useState({
        fullName: "",
        privateKey: "",
        walletKey: "",
    });
    const [privateKeys, setPrivateKey] = useState({
        userPrivateKey: "Click here to see private key",
    });
    const store = useStore();
    const state = store.getState();
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user-data"));
        if (userData) {
            setUserDetails({
                fullName: userData.fullName,
                privateKey: userData.jwtToken,
                walletKey: userData.wallet,
            });
        } else {
            navigator("/login/");
        }
    }, [store]);

    const onLogout = () => {
        dispatch(logout());
        navigator("/login");
    };

    return (
        <>
            <div className="flex-1 bg-black mb-10">
                <div className="px-4 bg-dark-400 py-4 flex text-white justify-between lg:justify-end sticky top-0 z-10">
                    <button
                        className="lg:hidden"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        <GiHamburgerMenu />
                    </button>
                    <button
                        className="border border-success-500 py-2 px-4 profile-button"
                        onClick={() => setShowPopup(!showPopup)}
                    >
                        <img src={User} width={"100%"} />
                        <span>{userDetails.fullName}</span>
                    </button>
                    {showPopup && (
                        <div className="profile-popup">
                            <div className="section">
                                <img src={User2} />
                                <p>{userDetails.fullName}</p>
                            </div>
                            <div className="section">
                                <img src={Wallet} />
                                <p>0.00 USD</p>
                            </div>
                            <div className="section">
                                <img src={Key} />
                                <a
                                    className="break-all"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (userDetails.privateKey) {
                                            setPrivateKey({
                                                ...privateKeys,
                                                userPrivateKey:
                                                    userDetails.privateKey,
                                            });
                                        } else {
                                            setPrivateKey(
                                                "Can't access privatekey"
                                            );
                                        }
                                    }}
                                >
                                    {privateKeys.userPrivateKey}
                                </a>
                            </div>
                            <div className="section">
                                <img src={Key2} />
                                <p tool className="break-all">
                                    {userDetails.walletKey}
                                </p>
                            </div>
                            <div className="section">
                                <p onClick={onLogout}>Logout</p>
                            </div>
                        </div>
                    )}
                </div>
                {children}
            </div>
        </>
    );
};

export default connect()(Index);
