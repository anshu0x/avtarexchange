import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Layout from "../components/layout";
import ChartAPI from "../services/liveChartApi";
import { useParams } from "react-router-dom";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const CoinChart = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [history, setHistory] = useState([]);

    const [error, setError] = useState(false);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: false,
            },
        },
    };

    useEffect(() => {
        let get = async () => {
            const response = await new ChartAPI().coinInfo(id);

            if (!response.error) {
                setName(response.data.name);
                setPrice(response.data.market_data.current_price.usd);
                setHistory(response.data.market_data.sparkline_7d.price);
            } else {
                setError(response.error);
            }
        };

        get();
    }, [id]);

    const listOfLength = (length) => {
        let list = [];

        for (let i = 0; i < length; i++) {
            list.push(i);
        }

        return list;
    };

    return (
        <div className="flex relative bg-black min-h-screen">
            <Sidebar show={show} setShow={setShow} />
            <Layout show={show} setShow={setShow}>
                {!error ? (
                    <div className="w-11/12 m-auto py-6">
                        <h2 className="text-gray-300 mb-2 text-3xl">{name}</h2>
                        <p className="text-gray-200 mb-10 text-4xl">${price}</p>

                        <div className="p-4 rounded-xl bg-dark-600">
                            <Line
                                style={{ maxWidth: "100%", minHeight: "500px" }}
                                data={{
                                    labels: listOfLength(history.length),
                                    datasets: [
                                        {
                                            borderColor: "#33a2ff",
                                            borderWidth: 2,
                                            pointRadius: 3,
                                            data: history,
                                        },
                                    ],
                                }}
                                options={chartOptions}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="min-h-full min-w-full flex items-center justify-center">
                        <h1 className="text-gray-100 text-4xl">{error}</h1>
                    </div>
                )}
            </Layout>
        </div>
    );
};

export default CoinChart;
