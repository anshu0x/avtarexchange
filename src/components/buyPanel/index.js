import { GiHamburgerMenu } from "react-icons/gi";

const Panel = ({ show, setShow }) => {
  return (
    <>
      <div className="flex-1 bg-black mb-10">
        <div className="px-4 bg-dark-400 py-4 flex text-white justify-between lg:justify-end">
          <button
            className="lg:hidden"
            onClick={() => setShow((prev) => !prev)}
          >
            <GiHamburgerMenu />
          </button>
          <button className="border border-success-500 py-2 px-4">
            Connect Account
          </button>
        </div>
        <div className=" mx-10 mt-10 "></div>
      </div>
    </>
  );
};

export default Panel;
