import { useState } from "react";
import Sidebar from "../components/sidebar";
import Panel from "../components/sendPanal";
const Buy = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex relative bg-black min-h-screen">
      <Sidebar show={show} setShow={setShow} />
      <Panel show={show} setShow={setShow}/>
    </div>
  );
};

export default Buy;
