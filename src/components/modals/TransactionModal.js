import "./style.css";
import Logo from "../../assets/images/avtar.png";

const TransactionModal = ({
    open,
    setOpen,
    title = "Awaiting approval..",
    subTitle = "Please be patient till the transaction completes",
    refresh = true,
    button = true,
}) => {
    return (
        <div
            className={`custom-modal approval   ${
                open ? "active" : ""
            } font-poppins`}
        >
            <div className="custom-modal-content-wrapper">
                <div className="container">
                    <div className="custom-modal-wrapper text-center">
                        <div className="mb-2 text-start">
                            <img src={Logo} alt="" className="w-10 logo_icon" />
                        </div>
                        <h1 className="font-semibold text-dark mb-2">
                            {title}
                        </h1>
                        <p className="text-lg text-grey md:mx-20 mb-4  font-medium">
                            {subTitle}
                        </p>
                        {refresh && (
                            <p className="text-grey text-sm font-normal mb-4 font-12">
                                ( Do not close the tab or refresh the page )
                            </p>
                        )}
                        {button && (
                            <div className="inform-btn">
                                <button
                                    className="py-2.5 px-12 ok_btn rounded-full bg-blue-500"
                                    onClick={() => setOpen(false)}
                                >
                                    Ok
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionModal;
