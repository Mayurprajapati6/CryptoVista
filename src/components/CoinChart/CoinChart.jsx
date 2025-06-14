
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import fetchCoinChart from "../../services/fetchCoinChart";
import { useLocation } from "react-router-dom";

function CoinChart() {
  const { coinId = "bitcoin" } = useParams(); // Get coinId from URL params
  const [days, setDays] = useState(7); // Default 7 days
  const [currency, setCurrency] = useState("usd"); // Default USD
  const [precision, setPrecision] = useState(null); // Default daily precision
  const { state } = useLocation(); // Access the state passed from the parent
  // State for chart data and labels
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const { data, isLoading, error } = useQuery(
    ['coinChart', coinId, days, currency, precision],
    () => fetchCoinChart(days, precision, currency, coinId),
    {
      retry: 3,
      cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes
      staleTime: 1000 * 60 * 2, // Consider data fresh for 2 minutes
    }
  );


  useEffect(() => {
    if (data) {
      const prices = data.prices.map((item) => item[1]);
      const timestamps = data.prices.map((item) =>
        new Date(item[0]).toLocaleDateString()
      );
      setChartData(prices);
      setChartLabels(timestamps);
    }
  }, [data]);


  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
      background: '#1a103d',
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800, // Animation speed
        animateGradually: {
          enabled: true,
          delay: 150, // Delay for gradual animation
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350, // Smooth animation for data change
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        style: { colors: "#FBBF24" },
        show: true,
        rotate: -45,
      },
      tickAmount: 5,
    },
    yaxis: {
      labels: {
        style: { colors: "#FBBF24" },
      },
    },
    tooltip: {
      theme: "dark",
      x: { show: true },
    },
    theme: {
      mode: "dark",
      palette: "palette1",
    },
    colors: ["#FBBF24"],
    grid: {
      borderColor: "#1a103d",
      strokeDashArray: 0, // Solid grid lines
      xaxis: {
        lines: {
          show: true, // Show vertical lines
          color: "#FBBF24", // Yellow vertical lines
          width: 1,
        },
      },
      yaxis: {
        lines: {
          show: true, // Show horizontal lines
          color: "#FBBF24", // Yellow horizontal lines
          width: 1,
        },
      },
    },
  };

  const series = [
    {
      name: `${coinId.toUpperCase()} Price`,
      data: chartData, // Using chartData
    },
  ];

  return (
    <div className="bg-[#282056] p-8 rounded-lg shadow-xl border border-[#FFD700] max-w-4xl mx-auto mt-10 min-h-96 mb-10">
      <div className="flex items-center mb-6">
        {/* Coin Name */}
        <h2 className="text-yellow-500 text-3xl font-bold">
          {coinId.toUpperCase()} <br/><span className="text-2xl">Price Chart</span>
        </h2>
      </div>

      {/* Parameter Selection */}
      <div className="flex gap-6 mb-8">
        {/* Days Selector */}
        <div className="w-1/3">
          <label className="text-yellow-500 font-semibold block mb-2">Select Days</label>
          <select
            className="select select-bordered w-full text-yellow-400  focus:ring-2 focus:ring-yellow-500"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="1">1 Day</option>
            <option value="7">7 Days</option>
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="365">1 Year</option>
          </select>
        </div>

        {/* Currency Selector */}
        <div className="w-1/3">
          <label className="text-yellow-500 font-semibold block mb-2">Select Currency</label>
          <select
            className="select select-bordered w-full text-yellow-400  focus:ring-2 focus:ring-yellow-500"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
            <option value="inr">INR</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center text-yellow-500 text-lg">
        <span className="loading loading-ring loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-red-500 text-center mt-4">Error fetching data. Please try again.</div>
      )}

      {/* Chart */}
      {!isLoading && !error && (
        <div className="p-4 rounded-xl">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="line"
            height={350}
          />
        </div>
      )}
    </div>
  );
}

export default CoinChart;
