import React from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import data from './../../data/data.json';

// Metric Card Component
const MetricCard = ({ title, value, percentage, trend }) => {
  const isPositive = percentage >= 0;
  
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{value}</span>
          <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(percentage)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Line Chart Component (Sales)
const SalesChart = ({ data }) => {
  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Sales</h3>
        <select className="text-sm border rounded-md px-2 py-1 bg-white">
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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

// Donut Chart Component (Top Selling Items)
const TopSellingItems = ({ data }) => {
  const COLORS = ['#1E40AF', '#3B82F6', '#93C5FD', '#BFDBFE'];

  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Top selling items</h3>
      <div className="flex">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
              <span className="text-sm ml-auto">{item.value}kg</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Recent Supplier Payments Table
const RecentPayments = ({ payments }) => {
  return (
    <div className="bg-white mt-8 p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Recent Supplier Payments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Supplier Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Paid Amount</th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Due Amount</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="py-3 px-4 text-sm">{payment.supplier}</td>
                <td className="py-3 px-4 text-sm">{payment.date}</td>
                <td className="py-3 px-4 text-sm text-right">${payment.amount}</td>
                <td className="py-3 px-4 text-sm text-right">${payment.due}</td>
                <td className="py-3 px-4 text-sm">
                  <span className={`inline-flex justify-center px-2 py-1 rounded-full text-xs
                    ${payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Dashboard Component
const DashboardOverview = () => {
  const metrics = [
    { title: 'Total Sales', value: data[0].total_sales, percentage: 11.5 },
    { title: 'Total Expenses', value: '3,671', percentage: -2.4 },
    { title: 'Net Profit', value: '156', percentage: 15.3 },
    { title: 'Due Amount', value: '2,318', percentage: -6.4 },
    { title: 'Payment Received', value: '156', percentage: 15.3 }
  ];

  const salesData = [
    { month: 'Jan', supplier: 240, customer: 220 },
    { month: 'Feb', supplier: 300, customer: 280 },
    { month: 'Mar', supplier: 280, customer: 260 },
    { month: 'Apr', supplier: 320, customer: 300 },
    { month: 'May', supplier: 280, customer: 270 },
    { month: 'Jun', supplier: 300, customer: 290 }
  ];

  const topSellingItemsData = [
    { name: 'Smith', value: 110 },
    { name: 'Green', value: 110 },
    { name: 'Tomato', value: 83 },
    { name: 'Garlic', value: 30 }
  ];

  const recentPayments = [
    { id: 1, supplier: 'Supplier 1', date: '2024-01-10', amount: 1500, due: 500, status: 'Paid' },
    { id: 2, supplier: 'Supplier 2', date: '2024-01-09', amount: 2000, due: 0, status: 'Pending' },
    { id: 3, supplier: 'Supplier 3', date: '2024-01-08', amount: 1200, due: 200, status: 'Paid' },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Overview</h2>
      <div className="grid grid-cols-5 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <SalesChart data={salesData} />
        </div>
        <div>
          <TopSellingItems data={topSellingItemsData} />
        </div>
      </div>
      <RecentPayments payments={recentPayments} />
    </div>
  );
};

export default DashboardOverview;
