import "./styles.css";
import { useState } from "react";
import AVATAR from "./AVATAR.json";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaChevronDown, FaArrowDown } from "react-icons/fa";
import ShareformLogo from "../../assets/images/transfer.png";
import Send from "../../assets/images/paper-plane.png";
import Laout from "../layout";
import TransactionModal from "../modals/TransactionModal";
import Avatar from "../../assets/images/avtar.png";
import BNB from "../../assets/images/bnb.png";

const Web3 = require("web3");
const rpcURL = "https://bsc-dataseed.binance.org/";
//const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/"
const web3 = new Web3(rpcURL);
let AVATARtokenAddress = AVATAR.address;
let AVATARtokenABI = AVATAR.abi;

const coins = [
    {
        id: 1,
        name: "Avtar",
        image: Avatar,
    },
    {
        id: 2,
        name: "BNB",
        image: BNB,
    },
];

const Panel = ({ show, setShow }) => {
    const [amount, setAmount] = useState();
    const [receiverwallet, setReceiverwallet] = useState();
    const [txId, setTxId] = useState("");

    const [approvalModal, setApprovalModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);

    const [selected, setSelected] = useState(coins[0]);
    const [active, setActive] = useState(false);

    const add = ()=>{
       
        const config = {
            headers: {
            'Content-Type': 'application/json',
            "alg": "HS256",
            "typ": "JWT",
            "Authorization": "Bearer " + localStorage.getItem("sessionId"),
            }
        }
 
        axios.post("http://localhost:3001/transactions/add", {
            from: JSON.parse(localStorage.getItem("user-data")).id,
            to: receiverwallet,
            amount: amount,
            currency: selected.name
        }, config )
        .then(async res => {
          console.log(res)
          
        })
        .catch(err=>{
          console.log(err.stack)
          const errMsg = err.response?.data?.message;
        //    console.log(errMsg);
        } )
    }
    
    const transfer = async () => {
        const userData = JSON.parse(localStorage.getItem("user-data"));

        // console.log('user', userData)
        // const walletid = userData.wallet;

        // const contract = await new web3.eth.Contract(
        //     AVATARtokenABI,
        //     AVATARtokenAddress
        // );

        if (!amount) {
            alert("Invalid amount");
            return;
        }
        if (!receiverwallet) {
            alert("Invalid receiver wallet address");
            return;
        }
        if (parseInt(amount) < 0) {
            alert("Amount should be greater than zero");
        }

    
        try {
        
            if (selected.name === "BNB") {
                setApprovalModal(true);
    
                const transferAmount = await web3.utils.toWei(amount.toString());
                web3.eth.accounts
                    .signTransaction(
                        {
                            to: receiverwallet,
                            value: transferAmount,
                            gas: 3000000,
                        },
                        userData.privateKey
                    )
                    .then(async (res) => {
                        web3.eth
                            .sendSignedTransaction(res.rawTransaction)
                            .then((res) => {
                                console.log(res);
                                setTxId(res.transactionHash);
                            });
    
                        setApprovalModal(false);
                        setSuccessModal(true);
                        add();
                    })
                    .catch(() => {
                        setApprovalModal(false);
                        setErrorModal(true);
                    });
            } else if (selected.name === "Avtar") {
                setApprovalModal(true);

                //put avatart contract address to string for demo is equinox address
    
                const contract = await new web3.eth.Contract(AVATARtokenABI, "0xe4b7a93dff5f23639698d38415dacca820ff11ca");

    
    
                const transferAmount = await web3.utils.toWei(amount.toString());

                const acc = await web3.eth.accounts.privateKeyToAccount(userData.privateKey);
    
                var count = await web3.eth.getTransactionCount(acc.address);

                web3.eth.accounts
                    .signTransaction(
                        {
                            from: acc.address,
                            to: contract._address,
                            value: "0",
                            gas: 300000,
                            data: contract.methods.transfer(receiverwallet, transferAmount).encodeABI(), // transfer(to, amount);
                            nonce:web3.utils.toHex(count)
                        },
                        userData.privateKey
                    )
                    .then(async (res) => {
                       await web3.eth
                            .sendSignedTransaction(res.rawTransaction)
                            .then((res) => {
                                console.log(res);
                                setTxId(res.transactionHash);
                            });
    
                        setApprovalModal(false);
                        setSuccessModal(true);
                        add();
                    })
                    .catch(() => {
                        setApprovalModal(false);
                        setErrorModal(true);
                    });
            } else {
                alert("Invalid transfer option");
            }
        } catch (error) {
            console.log(error)
        }


        /*let contract = await new web3.eth.Contract(AVATARtokenABI, AVATARtokenAddress);
                const walletid = userData.wallet;
        console.log(receiverwallet, '----', amount)
        await contract.methods
          .transfer(receiverwallet, amount)
          .send({ from: '0x9a4a2F984617cC5d38D4527Ba46C4e57d3458C83' })
          .on("error", (err)=> {
            console.log(err, '--d---d')
          })
          .then((receipt) => {
            console.log("receipt", receipt);
          });*/
    };

    return (
        <>
            <TransactionModal
                open={approvalModal}
                setOpen={setApprovalModal}
                button={false}
            />
            <TransactionModal
                open={successModal}
                setOpen={setSuccessModal}
                title="Success"
                subTitle="Transaction has been successfully completed"
                refresh={false}
            />
            <TransactionModal
                open={errorModal}
                setOpen={setErrorModal}
                title="Error"
                subTitle="Make sure you have enough assets in your Avtar wallet"
                refresh={false}
            />

            <Laout show={show} setShow={setShow}>
                {txId && (
                    <div
                        className="bg-teal-100 border border-cian-400 text-blue-600 px-7 py-3 rounded relative w-11/12 mt-10 m-auto word-break"
                        role="alert"
                    >
                        <span className="block sm:inline">
                            Transaction Successfull
                        </span>
                        <strong className="ml-2 font-bold break-all">Tx: {txId}</strong>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg
                                className="fill-current h-6 w-6 text-red-500"
                                role="button"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                        </span>
                    </div>
                )}
                <div className=" mx-15 mt-10 flex justify-center items-center">
                    <div
                        className=" max-w-lg p-5 w-full bg-dark-500 rounded-xl text-white"
                        style={{
                            backgroundColor: "#1C1B1B",
                            paddingLeft: "30px",
                            paddingRight: "30px",
                        }}
                    >
                        <div
                            className="shareform-heading"
                            style={{
                                display: "flex",
                            }}
                        >
                            <img src={ShareformLogo} width={"5%"} />
                            <h4
                                style={{
                                    color: "white",
                                    paddingLeft: "25px",
                                }}
                            >
                                Send AVTAR tokens to any wallet address
                            </h4>
                        </div>
                        <form
                            className="sharefrom"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <label
                                className="block pt-5 "
                                for="address"
                                style={{
                                    color: "white",
                                }}
                            >
                                Receiver wallet address
                            </label>

                            <input
                                name="address"
                                id="address"
                                type={"text"}
                                value={receiverwallet}
                                onChange={(e) =>
                                    setReceiverwallet(e.target.value)
                                }
                                required
                            />

                            <input
                                name="amount"
                                id="amount"
                                type={"number"}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount here.."
                                required
                            />

                            <CustomInput
                                selected={selected}
                                setSelected={setSelected}
                                active={active}
                                setActive={setActive}
                            />

                            <button type="button" onClick={transfer}>
                                <img src={Send} width="5%" />
                                <h4>Send</h4>
                            </button>
                        </form>
                    </div>
                </div>
            </Laout>
        </>
    );
};

export default Panel;

const CustomInput = ({ selected, setSelected, active, setActive }) => (
    <div className="bg-dark-700 p-3 rounded-lg mt-1 relative mb-4">
        <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setActive((prev) => !prev)}
        >
            <div className="flex items-center justify-start">
                <img
                    src={selected.image}
                    alt={selected.name}
                    className=" w-7"
                />
                <p className="font-medium ml-2 text-base">{selected.name}</p>
            </div>
            <span className="text-graish ml-2">
                <FaChevronDown />
            </span>
        </div>

        <div
            className={`rounded-md absolute p-2 top-full left-0 border-t-0 border-2 border-darKGary w-full shadow-xl bg-gray transition-all duration-300 z-50 ${
                active
                    ? " max-h-96 opacity-100 pointer-events-auto"
                    : "max-h-0 overflow-y-hidden opacity-0 pointer-events-none"
            }`}
        >
            <div>
                {coins.map((coin, i) => (
                    <div
                        className="flex justify-between items-center hover:bg-dark-600 p-2 cursor-pointer rounded-md transition-all duration-300 "
                        onClick={() => {
                            setSelected(coin);
                            setActive((prev) => !prev);
                        }}
                        style={
                            i !== coins.length - 1
                                ? { marginBottom: "10px" }
                                : {}
                        }
                    >
                        <div className=" flex items-center flex-1">
                            <img
                                src={coin.image}
                                className="w-7"
                                alt={coin.name}
                            />
                            <p className="ml-2">{coin.name}</p>
                        </div>
                        <p>{coin.name}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
