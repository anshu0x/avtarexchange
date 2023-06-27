import { useEffect, useState } from "react";
import TableRow from "./TableRow";

const AnalyticsTable = ({ coinList = [] }) => {
    const [showCoins, setShowCoins] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setShowCoins(coinList);
    }, [coinList]);

    useEffect(() => {
        let tempCoins = [];

        coinList.forEach((coin) => {
            if (coin.id.toLowerCase().includes(searchQuery.toLowerCase())) {
                tempCoins.push(coin);
            }
        });

        setShowCoins(tempCoins);
    }, [searchQuery]);

    return (
        <section class="body-font">
            <div class="container px-5 py-0 mx-auto">
                <div class="flex flex-col text-left w-full mb-4">
                    <div class="relative text-gray-200">
                        <input
                            type="text"
                            name="name"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                            }}
                            class="p-2 text-base text-gray-100 bg-gray-900 rounded-md focus:outline-none focus:bg-gray-800 w-full"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <div class=" w-full mx-auto overflow-auto">
                    <table class="table-auto w-full text-left whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 rounded-tl rounded-bl">
                                    Rank
                                </th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 l">
                                    Name
                                </th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                                    Symbol
                                </th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                                    Price
                                </th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                                    Price(24h)%
                                </th>
                                <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600">
                                    Market cap
                                </th>
                                <th class="w-10 title-font tracking-wider font-medium text-gray-200 text-sm bg-dark-600 rounded-tr rounded-br"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {showCoins.map((coin, index) => (
                                <TableRow
                                    key={index}
                                    coin={coin}
                                    index={index}
                                />
                            ))}
                        </tbody>
                    </table>
                    {!coinList.length && (
                        <h2 className="text-gray-200 text-2xl text-center my-5 w-full">
                            Loading...
                        </h2>
                    )}
                    {!showCoins.length && coinList.length && (
                        <h2 className="text-gray-200 text-2xl text-center my-5 w-full">
                            No match found
                        </h2>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AnalyticsTable;
