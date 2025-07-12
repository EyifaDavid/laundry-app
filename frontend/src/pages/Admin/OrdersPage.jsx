// OrdersPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/api/adminApiSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(state => state.order) || {};
  const { orders = [], loading, error } = orderState;


  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrderStatus({ id, status: newStatus }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {orders.map(order => (
        <div key={order._id} className="bg-white p-4 mb-4 rounded shadow">
          <p><strong>User:</strong> {order.deliveryInfo.fullName}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="mt-2 border px-2 py-1"
          >
            <option>Picked Up</option>
            <option>In Laundry</option>
            <option>Laundry Cleaned</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
