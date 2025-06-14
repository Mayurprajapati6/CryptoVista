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
      background: 'transparent',
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
        style: { colors: "#00ff9d" },
        show: true,
        rotate: -45,
      },
      tickAmount: 5,
    },
    yaxis: {
      labels: {
        style: { colors: "#00ff9d" },
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
    colors: ["#00ff9d"],
    grid: {
      borderColor: "rgba(0, 255, 157, 0.1)",
      strokeDashArray: 0, // Solid grid lines
      xaxis: {
        lines: {
          show: true, // Show vertical lines
          color: "rgba(0, 255, 157, 0.1)", // Yellow vertical lines
          width: 1,
        },
      },
      yaxis: {
        lines: {
          show: true, // Show horizontal lines
          color: "rgba(0, 255, 157, 0.1)", // Yellow horizontal lines
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
    <div className="bg-base-200/30 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-primary/20 max-w-4xl mx-auto mt-10 min-h-96 mb-10">
      <div className="flex items-center mb-6">
        {/* Coin Name */}
        <h2 className="text-primary text-3xl font-cyber">
          {coinId.toUpperCase()} <br/><span className="text-2xl">Price Chart</span>
        </h2>
      </div>

      {/* Parameter Selection */}
      <div className="flex gap-6 mb-8">
        {/* Days Selector */}
        <div className="w-1/3">
          <label className="text-primary font-cyber block mb-2">Select Days</label>
          <select
            className="select select-bordered w-full bg-base-200 text-primary border-primary/20 focus:border-primary"
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
          <label className="text-primary font-cyber block mb-2">Select Currency</label>
          <select
            className="select select-bordered w-full bg-base-200 text-primary border-primary/20 focus:border-primary"
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
        <div className="flex justify-center">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-error text-center mt-4 font-cyber">Error fetching data. Please try again.</div>
      )}

      {/* Chart */}
      {!isLoading && !error && (
        <div className="p-4 rounded-xl bg-base-300/30 border border-primary/10">
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
