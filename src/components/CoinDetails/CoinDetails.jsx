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
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[30vh] text-error">
        <p className="text-lg font-cyber">Failed to load coin details.</p>
        <p className="text-base-content">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-base-200/30 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-primary/20 min-h-4xl mt-16">
        {isLoading ? (
          <div className="flex w-full justify-center">
            <span className="loading loading-ring loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6 mb-8">
              <img
                src={coin?.image?.large}
                alt={`${coin?.name} logo`}
                className="w-24 h-24 rounded-full ring-4 ring-primary/20 bg-base-300"
              />
              <div>
                <h1 className="text-4xl font-cyber mb-2 text-primary">
                  {coin?.name} ({coin?.symbol.toUpperCase()})
                </h1>
                <p className="text-base-content">
                  Market Rank:{" "}
                  <span className="text-primary">
                    #{coin?.market_cap_rank}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Current Price */}
              <div className="flex flex-col p-4 bg-base-300/50 rounded-lg border border-primary/10">
                <span className="text-base-content font-medium">
                  Current Price:
                </span>
                <span className="text-2xl text-primary">
                  ${coin?.market_data?.current_price?.usd?.toLocaleString()}
                </span>
              </div>

              {/* Market Cap */}
              <div className="flex flex-col p-4 bg-base-300/50 rounded-lg border border-primary/10">
                <span className="text-base-content font-medium">Market Cap:</span>
                <span className="text-2xl text-primary">
                  ${coin?.market_data?.market_cap?.usd?.toLocaleString()}
                </span>
              </div>

              {/* Circulating Supply */}
              <div className="flex flex-col p-4 bg-base-300/50 rounded-lg border border-primary/10">
                <span className="text-base-content font-medium">
                  Circulating Supply:
                </span>
                <span className="text-xl text-primary">
                  {coin?.market_data?.circulating_supply?.toLocaleString()}{" "}
                  {coin?.symbol.toUpperCase()}
                </span>
              </div>

              {/* Total Supply */}
              <div className="flex flex-col p-4 bg-base-300/50 rounded-lg border border-primary/10">
                <span className="text-base-content font-medium">
                  Total Supply:
                </span>
                <span className="text-xl text-primary">
                  {coin?.market_data?.total_supply
                    ? coin?.market_data?.total_supply?.toLocaleString()
                    : "N/A"}
                </span>
              </div>

              {/* High/Low */}
              <div className="flex flex-col col-span-2 p-4 bg-base-300/50 rounded-lg border border-primary/10">
                <span className="text-base-content font-medium">
                  24h High/Low:
                </span>
                <span className="text-xl text-primary">
                  ${coin?.market_data?.high_24h?.usd} / $
                  {coin?.market_data?.low_24h?.usd}
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-base-300/50 rounded-lg border border-primary/10">
              <h2 className="text-xl font-cyber text-base-content mb-2">
                Description:
              </h2>
              <p className="text-base-content text-sm">
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
