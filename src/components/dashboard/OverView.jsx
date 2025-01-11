import React, { useState, useEffect } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import data from "./../../data/data.json";
import RecentPayments from "./RecentPayments";

const MetricCard = ({ title, value, percentage, index }) => {
  const isPositive = percentage >= 0;
  const bgClass = index % 2 === 0 ? "bg-blue-100" : "bg-gray-300";
  
  
  
  const formattedPercentage = Number(percentage).toFixed(2);

  return (
    <div className={`p-4 rounded-lg shadow-sm ${bgClass} h-full `}>
      <div className="space-y-2">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl lg:text-2xl font-semibold ">{value}</span>
          <div
            className={`flex items-center text-sm space-x-1 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{Math.abs(formattedPercentage)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SalesChart = ({ supplierRecords, customerRecords }) => {
  const [selectedMonth, setSelectedMonth] = useState("All");

  const combinedData = supplierRecords.map((supplier, index) => ({
    month: supplier.month,
    supplier: supplier.bags,
    customer: customerRecords[index]?.bags || 0,
  }));

  const filteredData =
    selectedMonth === "All"
      ? combinedData
      : combinedData.filter((item) => item.month === selectedMonth);

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <h3 className="font-medium text-gray-800">Sales Records</h3>
        <select
          className="text-sm border rounded-md px-3 py-1.5 bg-white w-full sm:w-auto"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="All">All Months</option>
          {supplierRecords.map((record) => (
            <option key={record.month} value={record.month}>
              {record.month}
            </option>
          ))}
        </select>
      </div>

      <div className="h-48 sm:h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="supplier" 
              stroke="#3B82F6" 
              strokeWidth={2} 
              dot={false} 
              name="Supplier"
            />
            <Line 
              type="monotone" 
              dataKey="customer" 
              stroke="#93C5FD" 
              strokeWidth={2} 
              dot={false} 
              name="Customer"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const TopSellingItems = ({ items }) => {
  const COLORS = ["#1E40AF", "#3B82F6", "#93C5FD", "#BFDBFE"];

  return (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm h-full">
      <h3 className="font-medium text-gray-800 mb-4">Top Selling Items</h3>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 min-h-[200px]">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={items}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="weight"
              >
                {items.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 space-y-3 mt-4 lg:mt-0 lg:pl-4">
          {items.map((item, index) => (
            <div key={item.item} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-600 flex-1">{item.item}</span>
              <span className="text-sm font-medium">{item.weight}kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [selectedDate, setSelectedDate] = useState(data[0].date);

  useEffect(() => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("date", selectedDate);
    window.history.pushState({}, "", newUrl);
  }, [selectedDate]);

  const currentIndex = data.findIndex((entry) => entry.date === selectedDate);
  const currentData = data[currentIndex] || data[0];
  const previousData = currentIndex > 0 ? data[currentIndex - 1] : null;

  const calculatePercentage = (current, previous) => {
    if (!previous) return 0;
    return ((parseFloat(current) - parseFloat(previous)) / parseFloat(previous)) * 100;
  };

  const metrics = [
    {
      title: "Total Sales",
      value: currentData.total_sales,
      percentage: calculatePercentage(currentData.total_sales, previousData?.total_sales),
    },
    {
      title: "Total Expenses",
      value: currentData.total_expenses,
      percentage: calculatePercentage(currentData.total_expenses, previousData?.total_expenses),
    },
    {
      title: "Net Profit",
      value: currentData.net_profit,
      percentage: calculatePercentage(currentData.net_profit, previousData?.net_profit),
    },
    {
      title: "Due Amount",
      value: currentData.due_amount,
      percentage: calculatePercentage(currentData.due_amount, previousData?.due_amount),
    },
    {
      title: "Payment Received",
      value: currentData.payment_received,
      percentage: calculatePercentage(currentData.payment_received, previousData?.payment_received),
    },
  ];

  return (
    <div className="p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full sm:w-auto border rounded-md px-4 py-2 bg-white shadow-sm"
        >
          {data.map((entry) => (
            <option key={entry.date} value={entry.date}>
              {entry.date}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            percentage={metric.percentage}
            index={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <div className="lg:col-span-2">
          <SalesChart
            supplierRecords={currentData.supplier_records}
            customerRecords={currentData.customer_records}
          />
        </div>
        <div>
          <TopSellingItems items={currentData.top_selling_products} />
        </div>
      </div>

      <div className="mt-8">
        <RecentPayments payments={currentData.supplier_payments} />
      </div>
    </div>
  );
};

export default DashboardOverview;