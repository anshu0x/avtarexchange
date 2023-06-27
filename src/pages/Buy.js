import { useState } from "react";
import Sidebar from "../components/sidebar";
import Panel from "../components/buyPanel";
const Buy = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex relative bg-black">
      <Sidebar show={show} setShow={setShow} />
      <Panel show={show} setShow={setShow} />
    </div>
  );
};

export default Buy;
