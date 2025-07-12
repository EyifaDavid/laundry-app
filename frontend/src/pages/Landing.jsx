import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTshirt, FaSoap, FaHotTub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedServices } from "../redux/slices/orderSlice";
import { fetchOrders } from "../redux/slices/api/orderApiSlice";


const services = [
  { id: "wash", name: "Wash & Fold", description: "Quick wash & fold", icon: <FaTshirt className="text-4xl text-blue-500" /> },
  { id: "dryclean", name: "Dry Cleaning", description: "Delicate cleaning", icon: <FaHotTub className="text-4xl text-green-500" /> },
  { id: "iron", name: "Ironing", description: "Pressed & perfect", icon: <FaSoap className="text-4xl text-yellow-500" /> },
];

const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedServices = useSelector(state => state.order.selectedServices);
  const { orders, loading, error } = useSelector(state => state.order);

  const handleToggleService = (id) => {
    let updated;
    if (selectedServices.includes(id)) {
      updated = selectedServices.filter(s => s !== id);
    } else {
      updated = [...selectedServices, id];
    }
    dispatch(setSelectedServices(updated));
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      navigate("/service/summary");
    }
  };
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold mb-4">Welcome, {user?.name || "User"} 👋</h1>
        <p className="text-gray-600 mb-6">Select one or more laundry services to get started</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {services.map(service => (
          <motion.div
            key={service.id}
            onClick={() => handleToggleService(service.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`bg-white p-6 rounded-2xl shadow flex flex-col justify-center items-center transition cursor-pointer hover:shadow-xl border-2 ${selectedServices.includes(service.id) ? 'border-green-500' : 'border-transparent'}`}
          >
            <div className="mb-4">{service.icon}</div>
            <h2 className="text-xl font-bold text-gray-800">{service.name}</h2>
            <p className="text-gray-500">{service.description}</p>
          </motion.div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="mb-10 text-center">
          <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>
          <ul className="mb-4 text-gray-700">
            {services
              .filter(service => selectedServices.includes(service.id))
              .map(service => (
                <li key={service.id} className="flex items-center justify-center gap-2">
                  {service.icon}
                  <span>{service.name}</span>
                </li>
              ))}
          </ul>
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Continue with {selectedServices.length} Service{selectedServices.length > 1 && 's'}
          </button>
        </div>
      )}

      {/* Latest Orders... can remain same */}
      <div className="p-1 md:p-6">
 <motion.div
  className="bg-white p-6 rounded-lg shadow-md"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <h2 className="text-2xl font-semibold mb-4">Your Recent Orders</h2>

  {orders?.length === 0 ? (
    <p className="text-gray-500">No recent orders found.</p>
  ) : (
    <ul className="space-y-4">
      {orders?.slice(0, 5).map((order) => (
        <motion.li
          key={order._id}
          onClick={() => navigate(`/order/${order._id}`)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-lg cursor-pointer w-full hover:bg-gray-50 shadow transition hover:shadow-xl flex justify-between items-center"
        >
          <div>
            <p className="font-semibold text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</p>
            <p className="text-gray-600">
              Services:{" "}
              {order.services.map((s) => s.name).join(", ")}
            </p>
            <p className="text-gray-500 text-sm">
              Placed: {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {order.status}
          </span>
        </motion.li>
      ))}
    </ul>
  )}
</motion.div>

    </div>
    </div>
  );
};

export default Dashboard;
