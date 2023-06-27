import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import AnalyticsCard from "../components/Analytics/AnalyticsCard";
import AnalyticsTable from "../components/Analytics/AnalyticsTable";
import ChartAPI from "../services/liveChartApi";

const LiveChart = () => {
    const [show, setShow] = useState(false);

    const [bitcoin, setBitcoin] = useState(0);
    const [bitImg, setBitImg] = useState("")

    const [ethereum, setEthereum] = useState(0)
    const [ethImg, setEthImg] = useState("")

    const [coinList, setCoinList] = useState([]);

    useEffect(() => {
        let get = async () => {
            const response = await new ChartAPI().coinInfo("bitcoin");

            if (response.status === "ok") {
                setBitcoin(response.data.market_data.current_price.usd)
                setBitImg(response.data.image.small);
            }
        };

        get();
    }, []);

    useEffect(() => {
        let get = async () => {
            const response = await new ChartAPI().coinInfo("ethereum");

            if (response.status === "ok") {
                setEthereum(response.data.market_data.current_price.usd);
                setEthImg(response.data.image.small);
            }
        };

        get();
    }, []);

    useEffect(() => {
        let get = async () => {
            const response = await new ChartAPI().allCoinInfo();

            if (response.status === "ok") {
                setCoinList(response.data);
            }
        };

        get();
    }, []);

    return (
        <div className="flex relative bg-black min-h-screen">
            <Sidebar show={show} setShow={setShow} />
            <Layout show={show} setShow={setShow}>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <AnalyticsCard title="Bitcoin" value={bitcoin} image={bitImg}/>

                    <AnalyticsCard title="Ethereum" value={ethereum} image={ethImg}/>
                </div>

                <AnalyticsTable coinList={coinList} />
            </Layout>
        </div>
    );
};

export default LiveChart;
