import React, { useState,useEffect} from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import data from './../../data/data.json';
import RecentPayments from './RecentPayments';

const MetricCard = ({ title, value, percentage, trend, index }) => {
  const isPositive = percentage >= 0;

  
  const backgroundColor = index % 2 === 0 ? '#D9F2FB' : '#E2E5EA';

  return (
    <div className={`p-4 rounded-lg shadow-sm`} style={{ backgroundColor, height: '100px', width: '200px' }}>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{value}</span>
          <div
            className={`flex items-center text-sm ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(percentage)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// Line Chart Component
const SalesChart = ({ supplierRecords, customerRecords }) => {
  // State for the selected month
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Combine supplier and customer data
  const combinedData = supplierRecords.map((supplier, index) => ({
    month: supplier.month,
    supplier: supplier.bags,
    customer: customerRecords[index]?.bags || 0,
  }));

  // Filter data based on selected month
  const filteredData =
    selectedMonth === "All"
      ? combinedData
      : combinedData.filter((item) => item.month === selectedMonth);

  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow-sm">
      {/* Header with Month Filter */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Sales Records</h3>
        <select
          className="text-sm border rounded-md px-2 py-1 bg-white"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="All">All</option>
          {supplierRecords.map((record) => (
            <option key={record.month} value={record.month}>
              {record.month}
            </option>
          ))}
        </select>
      </div>

      {/* Line Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="supplier"
              stroke="#3B82F6"
              name="Supplier Records"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="customer"
              stroke="#93C5FD"
              name="Customer Records"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Donut Chart Component
const TopSellingItems = ({ items }) => {
  const COLORS = ['#1E40AF', '#3B82F6', '#93C5FD', '#BFDBFE'];

  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Top Selling Items</h3>
      <div className="flex">
        <div className="w-1/2">
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
        <div className="w-1/2 space-y-2">
          {items.map((item, index) => (
            <div key={item.item} className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-sm text-gray-600">{item.item}</span>
              <span className="text-sm ml-auto">{item.weight}kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardOverview = () => {
  // Get initial date from URL or default to first date in data
  const getInitialDate = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('date') || data[0].date;
  };

  const [selectedDate, setSelectedDate] = useState(getInitialDate());

  // Update URL when date changes
  useEffect(() => {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('date', selectedDate);
    window.history.pushState({}, '', newUrl);
  }, [selectedDate]);

  // Find current and previous data for calculations
  const currentIndex = data.findIndex(entry => entry.date === selectedDate);
  const currentData = data[currentIndex] || data[0];
  const previousData = currentIndex > 0 ? data[currentIndex - 1] : null;

  // Calculate percentage changes
  const calculatePercentage = (current, previous) => {
    if (!previous) return 0;
    return ((parseFloat(current) - parseFloat(previous)) / parseFloat(previous)) * 100;
  };

  const metrics = [
    {
      title: "Total Sales",
      value: currentData.total_sales,
      percentage: calculatePercentage(
        currentData.total_sales,
        previousData?.total_sales
      )
    },
    {
      title: "Total Expenses",
      value: currentData.total_expenses,
      percentage: calculatePercentage(
        currentData.total_expenses,
        previousData?.total_expenses
      )
    },
    {
      title: "Net Profit",
      value: currentData.net_profit,
      percentage: calculatePercentage(
        currentData.net_profit,
        previousData?.net_profit
      )
    },
    {
      title: "Due Amount",
      value: currentData.due_amount,
      percentage: calculatePercentage(
        currentData.due_amount,
        previousData?.due_amount
      )
    },
    {
      title: "Payment Received",
      value: currentData.payment_received,
      percentage: calculatePercentage(
        currentData.payment_received,
        previousData?.payment_received
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          {data.map((entry) => (
            <option key={entry.date} value={entry.date}>
              {entry.date}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            percentage={metric.percentage}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SalesChart
            supplierRecords={currentData.supplier_records}
            customerRecords={currentData.customer_records}
          />
        </div>
        <div>
          <TopSellingItems items={currentData.top_selling_products} />
        </div>
      </div>

      <RecentPayments payments={currentData.supplier_payments} />
    </div>
  );
};
export default DashboardOverview;
