const AnalyticsCard = ({
    title,
    image,
    value,
    green = false,
    change = false,
    changeValue = 0,
}) => {
    const border = { borderColor: green ? "#61d97c" : "#33a2ff" };

    return (
        <div
            className="p-5 m-5 rounded-xl text-left bg-dark-300 border-l-8 flex items-center gap-4"
            style={border}
        >
            <img src={image} alt={title}/>
            <div>
                <h3 className="mb-5 text-2xl text-gray-200">{title}</h3>

                <p className="text-4xl break-all text-gray-200">${value}</p>

                {change && (
                    <>
                        {changeValue !== 0 && (
                            <span
                            className={`mr-1 ${
                                changeValue > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                            >
                                {changeValue > 0 ? "▲" : "▼"}
                            </span>
                        )}
                        <span className="text-base mt-3 text-gray-200">
                            {parseFloat(changeValue).toFixed(2)}%
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

export default AnalyticsCard;
