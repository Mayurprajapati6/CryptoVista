import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchCoinDetails from "../../services/fetchCoinDetails";

function CoinDetails() {
  const { coinId } = useParams();

  const {
    data: coin,
    isLoading,
    isError,
    error,
  } = useQuery(["coins", coinId], () => fetchCoinDetails(coinId), {
    retry: 3,
    retryDelay: 2000,
    cacheTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 5, // 5 minutes cache stale time
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[30vh] text-yellow-500">
        <p className="text-lg font-bold">Failed to load coin details.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className=" text-yellow-500 p-6 broder border-yellow-400">
      <div className="max-w-4xl mx-auto bg-[#282056] rounded-lg shadow-lg p-8 border border-[#FFD700] min-h-4xl mt-16">
        {isLoading ? (
          <div className="flex w-full justify-center text-yellow-400">
          <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6 mb-8">
              <img
                src={coin?.image?.large}
                alt={`${coin?.name} logo`}
                className="w-24 h-24 rounded-full bg-gray-300"
              />
              <div>
                <h1 className="text-4xl font-bold mb-2 text-yellow-500">
                  {coin?.name} ({coin?.symbol.toUpperCase()})
                </h1>
                <p className="text-gray-300">
                  Market Rank:{" "}
                  <span className="text-yellow-500">
                    #{coin?.market_cap_rank}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Current Price */}
              <div className="flex flex-col">
                <span className="text-gray-300 font-semibold">
                  Current Price:
                </span>
                <span className="text-2xl text-yellow-500">
                  ${coin?.market_data?.current_price?.usd?.toLocaleString()}
                </span>
              </div>

              {/* Market Cap */}
              <div className="flex flex-col">
                <span className="text-gray-300 font-semibold">Market Cap:</span>
                <span className="text-2xl text-yellow-500">
                  ${coin?.market_data?.market_cap?.usd?.toLocaleString()}
                </span>
              </div>

              {/* Circulating Supply */}
              <div className="flex flex-col">
                <span className="text-gray-300 font-semibold">
                  Circulating Supply:
                </span>
                <span className="text-xl text-yellow-500">
                  {coin?.market_data?.circulating_supply?.toLocaleString()}{" "}
                  {coin?.symbol.toUpperCase()}
                </span>
              </div>

              {/* Total Supply */}
              <div className="flex flex-col">
                <span className="text-gray-300 font-semibold">
                  Total Supply:
                </span>
                <span className="text-xl text-yellow-500">
                  {coin?.market_data?.total_supply
                    ? coin?.market_data?.total_supply?.toLocaleString()
                    : "N/A"}
                </span>
              </div>

              {/* High/Low */}
              <div className="flex flex-col col-span-2">
                <span className="text-gray-300 font-semibold">
                  24h High/Low:
                </span>
                <span className="text-xl text-yellow-500">
                  ${coin?.market_data?.high_24h?.usd} / $
                  {coin?.market_data?.low_24h?.usd}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-300 mb-2">
                Description:
              </h2>
              <p className="text-gray-300 text-sm">
                {coin?.description?.en?.slice(0, 500) ||
                  "Description not available."}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CoinDetails;
