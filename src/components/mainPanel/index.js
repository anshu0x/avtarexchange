import "./styles.css";
import { useState, useEffect } from "react";
import Avtar from "../../assets/images/avtar.png";
import Bnb from "../../assets/images/bnb.png";
import Usdt from "../../assets/images/usdt.png";
import Eth from "../../assets/images/eth.png";
import Layout from "../layout";
import axios from "axios";
import USDT from "./tokenabi/USDT.json";
import BNB from "./tokenabi/BNB.json";
import AVATAR from "./tokenabi/AVATAR.json";
import ETH from "./tokenabi/ETH.json";

const Web3 = require("web3");
const rpcURL = "https://bsc-dataseed.binance.org/";
//const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);

const Panel = ({ show, setShow }) => {
  const [USDTbalance, setUSDTBalance] = useState(0);
  const [BNBbalance, setBNBBalance] = useState(0);
  const [ETHbalance, setETHBalance] = useState(0);
  const [AVATARbalance, setAVATARBalance] = useState(0);

  const [walletid, setWalletid] = useState();

  const [USDTContract, setUSDTContract] = useState();
  const [BNBContract, setBNBContract] = useState();
  const [ETHContract, setETHContract] = useState();
  const [AVATARContract, setAVATARContract] = useState();

  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  async function getUSDTBalance() {
    let USDTbalance = await USDTContract.methods.balanceOf(walletid).call();
    setUSDTBalance(USDTbalance / 1000000000000000000);
    return USDTbalance;
  }
  // async function getUSDTBalance() {
  //   let USDTbalance =  await web3.eth.getBalance(walletid);
  //   setUSDTBalance((USDTbalance)/1000000000000000000);
  //   return USDTbalance;
  // }

  async function getBNBBalance() {
    // let BNBbalance = await BNBContract.methods.balanceOf(walletAddress).call();
    let BNBbalance = await web3.eth.getBalance(walletid);
    setBNBBalance(BNBbalance / 1000000000000000000);
    return BNBbalance;
  }
  async function getETHBalance() {
    let ETHbalance = await ETHContract.methods.balanceOf(walletid).call();
    //setETHBalance(ETHbalance);
    setETHBalance(ETHbalance / 1000000000000000000);

    return ETHbalance;
  }
  async function getAVATARBalance() {
    let AVATARbalance = await AVATARContract.methods.balanceOf(walletid).call();
    setAVATARBalance(AVATARbalance / 1000000000000000000);
    return AVATARbalance;
  }

  useEffect(() => {
    if (
      walletid &&
      USDTContract &&
      BNBContract &&
      ETHContract &&
      AVATARContract
    ) {
      getUSDTBalance();
      getBNBBalance();
      getETHBalance();
      getAVATARBalance();
    }
  }, [walletid, USDTContract, BNBContract, ETHContract, AVATARContract]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user-data"));
    // const walletid = userData?.wallet
    console.log("From main pannel and here userData is ", userData);
    setWalletid(web3.utils.toChecksumAddress(userData?.wallet));

    // USDTtoken
    let USDTtokenAddress = USDT.address;
    let USDTtokenABI = USDT.abi;
    setUSDTContract(new web3.eth.Contract(USDTtokenABI, USDTtokenAddress));
    // BNBtoken
    let BNBtokenAddress = BNB.address;
    let BNBtokenABI = BNB.abi;
    setBNBContract(new web3.eth.Contract(BNBtokenABI, BNBtokenAddress));
    // ETHtoken
    let ETHtokenAddress = ETH.address;
    let ETHtokenABI = ETH.abi;
    setETHContract(new web3.eth.Contract(ETHtokenABI, ETHtokenAddress));
    // AVATARtoken
    let AVATARtokenAddress = AVATAR.address;
    let AVATARtokenABI = AVATAR.abi;
    setAVATARContract(
      new web3.eth.Contract(AVATARtokenABI, AVATARtokenAddress)
    );
  }, []);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sessionId"),
      },
    };
    axios
      .get(`http://localhost:3001/transactions/get`, config)
      .then(async (res) => {
        console.log(res);
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err.response?.data?.message;
        setError(errMsg);
      });
  }, []);

  return (
    <>
      <Layout show={show} setShow={setShow}>
        <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-8 mx-10 mt-10 ">
          <div className="coins">
            <div className="details">
              <span className="price">{AVATARbalance.toFixed(2)}</span>
              <br />
              <span className="name">AVTAR</span>
            </div>
            <img src={Avtar} />
          </div>

          <div className="coins">
            <div className="details">
              <span className="price">{ETHbalance.toFixed(2)}</span>
              <br />
              <span className="name">ETH</span>
            </div>
            <img src={Eth} />
          </div>
          <div className="coins">
            <div className="details">
              <span className="price">{BNBbalance.toFixed(2)}</span>
              <br />
              <span className="name">BNB</span>
            </div>
            <img src={Bnb} />
          </div>
          <div className="coins">
            <div className="details">
              <span className="price">{USDTbalance.toFixed(2)}</span>
              <br />
              <span className="name">USDT</span>
            </div>
            <img src={Usdt} />
          </div>
        </div>
        <div className="mx-10 mt-10 recent-transactions">
          <p>Recent Transcations</p>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>From Address</th>
                <th>To Address</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length ? (
                transactions.map((transaction, index) => (
                  <tr>
                    <td>{transaction.userID}</td>
                    <td>{transaction.from}</td>
                    <td>{transaction.to}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.currency}</td>
                    <td>
                      {new Date(transaction.date).toLocaleDateString()} <br />
                      {new Date(transaction.date).toLocaleTimeString()}
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>

          {!transactions.length && !error && (
            <div
              className=" text-blue-300 px-4 py-3 mt-3 text-center text-2xl"
              role="alert"
            >
              <span className="block sm:inline">
                No transactions to display
              </span>
            </div>
          )}

          {error && (
            <div
              className=" text-red-300 px-4 py-3 mt-3 text-center text-2xl"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Panel;
