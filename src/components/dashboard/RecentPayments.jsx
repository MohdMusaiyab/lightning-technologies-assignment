import React from "react";

const RecentPayments = ({ payments }) => {
  return (
    <div className="bg-white mt-8 p-2 rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Recent Supplier Payments</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Record No
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Farmer Name
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Net Amount
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Paid Amount
              </th>
              <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                Due Amount
              </th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.record_no} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-700">{payment.record_no}</td>
                <td className="py-3 px-4 text-sm text-gray-700">{payment.farmer_name}</td>
                <td className="py-3 px-4 text-sm text-right text-gray-700">
                  ${payment.net_amount}
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-700">
                  ${payment.paid_amount}
                </td>
                <td className="py-3 px-4 text-sm text-right text-gray-700">
                  ${payment.due_amount}
                </td>
                <td className="py-3 px-4 text-sm text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      payment.payment_status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {payment.payment_status}
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

export default RecentPayments;
