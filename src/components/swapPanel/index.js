import { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import Avatar from "../../assets/images/avtar.png";
import BNB from "../../assets/images/bnb.png";
import Layout from "../layout";
import axios from "axios";
import CONFIG from "./config.json";
import TransactionModal from "../modals/TransactionModal";
// import AVATAR from "../mainPanel/tokenabi/AVATAR.json";
import AVATAR from "./testnetAvatar.json";
const coins = [
  {
    id: 0,
    name: "Avatar",
    image: Avatar,
    shortName: "Avatar",
  },
  {
    id: 1,
    name: "BNB",
    image: BNB,
    shortName: "BNB",
  },
];

const Web3 = require("web3");
const rpcURL = "https://bsc-dataseed.binance.org/";
//const rpcURL = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const web3 = new Web3(rpcURL);
let AVATARtokenAddress = CONFIG.address;
let AVATARtokenABI = CONFIG.abi;
const BASEPRICE = 200;
const Panel = ({ show, setShow }) => {
  const [approvalModal, setApprovalModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [selected, setSelected] = useState(coins[0]);
  const [selected2, setSelected2] = useState(coins[1]);
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [avatarPrice, setAvatarPrice] = useState({});
  const [avatarValue, setAvatarValue] = useState("");
  const [bnbValue, setBnbValue] = useState("");
  const [txId, setTxId] = useState("");
  const reg = /^\d*\.?\d*$/;
  const avatarInputHandler = (e) => {
    if (reg.test(e.target.value)) {
      setAvatarValue(e.target.value);
      setBnbValue(e.target.value / Number(BASEPRICE));
    }
  };

  const bnbInputHandler = (e) => {
    if (reg.test(e.target.value)) {
      setBnbValue(e.target.value);
      setAvatarValue(Number(BASEPRICE) * e.target.value);
      console.log(Number(BASEPRICE) * e.target.value);
    }
  };

  useEffect(() => {
    const getPrice = async () => {
      const {
        data: { data },
      } = await axios.get(
        "https://api.pancakeswap.info/api/v2/tokens/0xe4B7a93dFF5F23639698D38415DaCCA820Ff11CA"
      );
      console.log(data);
      setAvatarPrice(data);
    };
    getPrice();
  }, []);

  const arrOfCoinsAddress = [
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    "0xe4B7a93dFF5F23639698D38415DaCCA820Ff11CA",
  ];

  const swap = async () => {
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const contract = await new web3.eth.Contract(
      AVATARtokenABI,
      AVATARtokenAddress
    );

    const avatarContract = await new web3.eth.Contract(
      AVATAR.abi,
      AVATAR.address
    );
    const acc = await web3.eth.accounts.privateKeyToAccount(
      userData.privateKey
    );

    if (avatarContract) {
      let AVATARbalance = await avatarContract.methods
        .balanceOf(acc.address)
        .call();

      console.log(web3.utils.fromWei(AVATARbalance, "ether"));
      console.log(AVATARbalance);

      if (!bnbValue) {
        alert("Invalid amount");
        return;
      }
      if (Number(web3.utils.fromWei(AVATARbalance, "ether")) < avatarValue) {
        alert("you do not have sufficient balance!");
        return;
      }
      if (contract) {
        setApprovalModal(true);
        const amount = await web3.utils.toWei(bnbValue.toString());
        const amount2 = await web3.utils.toWei(avatarValue.toString());

        const acc = await web3.eth.accounts.privateKeyToAccount(
          userData.privateKey
        );

        var count = await web3.eth.getTransactionCount(acc.address, "latest");
        console.log(amount, amount2, acc, count);
        web3.eth.accounts
          .signTransaction(
            {
              from: acc.address,
              to: contract._address,
              value: amount,
              gas: 300000,
              data: contract.methods
                .swapETHForExactTokens(
                  amount2,
                  [
                    "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
                    "0xb703538C2919778b6e43c02f63d92853f28b8343",
                  ],
                  acc.address,
                  Math.floor(Date.now() / 1000) + 60 * 10
                )
                .encodeABI(),
              nonce: web3.utils.toHex(count),
            },
            userData.privateKey
          )
          .then(async (res) => {
            await web3.eth
              .sendSignedTransaction(res.rawTransaction)
              .then((res) => {
                console.log(res);
                setTxId(res.transactionHash);
                console.log("HASH", res.transactionHash);
              });

            setApprovalModal(false);
            setSuccessModal(true);
            // add();
          })
          .catch((err) => {
            console.log(err);
            setApprovalModal(false);
            setErrorModal(true);
          });
        //   contract.methods.swapETHForExactTokens();
      }
    }
  };

  return (
    <>
      <Layout show={show} setShow={setShow}>
        {txId && (
          <div
            className="bg-teal-100 border border-cian-400 text-blue-600 px-7 py-3 rounded relative w-11/12 mt-10 m-auto word-break"
            role="alert"
          >
            <span className="block sm:inline">Transaction Successfull</span>
            <strong className="ml-2 font-bold break-all">Tx: {txId}</strong>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setTxId("")}
            >
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
        <div className=" mx-10 mt-10 flex justify-center items-center">
          <SwapForm
            selected={selected}
            setSelected={setSelected}
            active={active}
            setActive={setActive}
            selected2={selected2}
            setSelected2={setSelected2}
            active2={active2}
            setActive2={setActive2}
            avatarPrice={avatarPrice}
            avatarValue={avatarValue}
            avatarInputHandler={avatarInputHandler}
            bnbValue={bnbValue}
            bnbInputHandler={bnbInputHandler}
            swap={swap}
          />
        </div>
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
      </Layout>
    </>
  );
};

export default Panel;

const SwapForm = ({
  selected,
  selected2,
  setSelected,
  setSelected2,
  active,
  active2,
  setActive,
  setActive2,
  avatarPrice,
  avatarValue,
  avatarInputHandler,
  bnbValue,
  bnbInputHandler,
  swap,
}) => (
  <div className=" max-w-lg p-4 w-full bg-dark-600 rounded-xl text-white">
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Swap</h2>
        <p>
          <span>Price :</span> <span>{avatarPrice.price}</span>
        </p>
      </div>
      <div className="mt-4">
        <CustomInput
          selected={selected}
          setSelected={setSelected}
          active={active}
          setActive={setActive}
          value={avatarValue}
          handler={avatarInputHandler}
        />
        <div className="text-center">
          <span className="my-4 text-center flex justify-center text-xl">
            <FaArrowDown />
          </span>
        </div>
        <CustomInput
          selected={selected2}
          setSelected={setSelected2}
          active={active2}
          setActive={setActive2}
          title={"You Receive"}
          value={bnbValue}
          handler={bnbInputHandler}
        />
        <button
          className="customButton block py-3 px-4 w-full mt-4 rounded-xl"
          onClick={swap}
        >
          Swap
        </button>
      </div>
    </form>
  </div>
);

const CustomInput = ({
  selected,
  setSelected,
  active,
  setActive,
  title = "You Pay",
  value,
  handler,
}) => (
  <div>
    <p className="text-sm text-graish">{title}</p>
    <div className="bg-dark-700  py-2 px-3 rounded-lg mt-1 relative">
      <p className="text-graish">{selected.name}</p>
      <div className="flex items-baseline mt-2 flex-col sm:flex-row sm:items-center">
        <div
          className="flex items-center cursor-pointer "
          //   onClick={() => setActive((prev) => !prev)}
        >
          <img src={selected.image} alt="" className=" w-7" />
          <p className="font-medium ml-2 text-base">{selected.shortName}</p>
        </div>
        <input
          type="number"
          className="flex-1 bg-transparent focus:outline-none text-left sm:text-right text-lg"
          defaultValue={0}
          disabled={selected.name === "BNB"}
          value={value}
          onChange={handler}
        />
      </div>
      {/* <div
        className={`rounded-md absolute top-full left-0 border-t-0 border-2 border-darKGary w-full shadow-xl bg-gray transition-all duration-300 z-50 ${
          active
            ? " max-h-96 opacity-100"
            : "max-h-0 overflow-y-hidden opacity-0"
        }`}
      >
        <div className="pt-4 p-2">
          {coins.map((coin, i) => (
            <div
              className="mb-4 flex justify-between items-center hover:bg-dark-600 p-2 cursor-pointer rounded-md transition-all duration-300 "
              onClick={() => {
                setSelected(coin);
                setActive((prev) => !prev);
              }}
            >
              <div className=" flex items-center flex-1">
                <img src={coin.image} className="w-7" alt={coin.name} />
                <p className="ml-2">{coin.shortName}</p>
              </div>
              <p className="hidden sm:block">{coin.name}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  </div>
);
