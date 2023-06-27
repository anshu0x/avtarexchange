const TableRow = ({ coin, index }) => {
    return (
        <tr
            className={
                index !== 0
                    ? `text-gray-300 border-t-2 border-gray-900`
                    : undefined
            }
        >
            <td class="text-gray-300 px-4 py-3">{coin.market_cap_rank}</td>
            <td class="text-gray-300 px-4 py-3 break-all">
                <img
                    className="w-8 inline-block mr-2"
                    src={coin.image}
                    alt={coin.id}
                />
                <span>{coin.id}</span>
            </td>
            <td class="text-gray-300 px-4 py-3">{coin.symbol}</td>
            <td class="text-gray-300 px-4 py-3 break-all">
                ${coin.current_price}
            </td>
            <td
                class="text-gray-300 px-4 py-3 break-all"
                style={
                    coin.price_change_percentage_24h >= 0
                        ? { color: "#61d97c" }
                        : { color: "#ff1e4d" }
                }
            >
                {parseFloat(coin.price_change_percentage_24h).toFixed(4)}%
            </td>
            <td class="text-gray-300 px-4 py-3 break-all">
                ${coin.market_cap}
            </td>
            <td class="text-gray-300 px-4 py-3">
                <a className="py-1 px-3" href={`/chart/${coin.id}`}>
                    &gt;
                </a>
            </td>
        </tr>
    );
};

export default TableRow;
