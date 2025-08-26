/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { authAxios } from "./services/auth";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard({ onLogout }) {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState("IND");
  const [start, setStart] = useState("2010");
  const [end, setEnd] = useState("2020");

  const fetchData = async () => {
    try {
      const res = await authAxios.get(
        `http://127.0.0.1:8000/api/population/?country=${country}&start=${start}&end=${end}`
      );
      const chartData = res.data.labels.map((year, i) => ({
        year,
        value: res.data.values[i],
      }));
      setData(chartData);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Population Dashboard
        </h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* 🔹 Filters */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Filters
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country code (e.g., IND)"
              className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              value={start}
              onChange={(e) => setStart(e.target.value)}
              placeholder="Start year"
              className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-400"
            />
            <input
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              placeholder="End year"
              className="px-3 py-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button
              onClick={fetchData}
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* 🔹 Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Population Trend (Line)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-medium text-gray-700 mb-4">
              Population Comparison (Bar)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
