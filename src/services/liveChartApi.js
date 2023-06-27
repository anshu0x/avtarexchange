class ChartAPI {
    constructor() {
        this.API_URL = "https://api.coingecko.com/api/v3/";
    }

    globalInfo = async () => {
        try {
            const response = await fetch(this.API_URL + "global");
            const data = await response.json();

            return {
                status: "ok",
                ...data,
            };
        } catch (err) {
            return {
                status: "error",
            };
        }
    };

    allCoinInfo = async () => {
        try {
            const response = await fetch(
                this.API_URL +
                    "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
            );
            const data = await response.json();

            return {
                status: "ok",
                data: data,
            };
        } catch (err) {
            return {
                status: "error",
            };
        }
    };

    coinInfo = async (id) => {
        try {
            const response = await fetch(
                this.API_URL +
                    `coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
            );
            const data = await response.json();

            return {
                status: "ok",
                data: data,
            };
        } catch (err) {
            return {
                status: "error",
            };
        }
    };
}

export default ChartAPI;
