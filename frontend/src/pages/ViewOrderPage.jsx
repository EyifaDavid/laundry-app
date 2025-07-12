import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../redux/slices/api/orderApiSlice";
import { setSelectedServices, setServiceDetails } from "../redux/slices/orderSlice";

const ViewOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrder(id));
  }, [dispatch, id]);

  const handleReorder = () => {
    const services = order.services.map((s) => s.serviceId);
    const serviceDetails = {};

    order.services.forEach((s) => {
      serviceDetails[s.serviceId] = {};
      s.items.forEach((item) => {
        serviceDetails[s.serviceId][item.itemId] = item.quantity;
      });
    });

    dispatch(setSelectedServices(services));
    dispatch(setServiceDetails(serviceDetails));
    navigate("/service/summary");
  };

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!order) return <p className="p-6 text-gray-500">No order found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order #{order._id.slice(-6).toUpperCase()}</h2>
      <p className="mb-2"><strong>Status:</strong> {order.status}</p>
      <p className="mb-2"><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">Services</h3>
        {order.services.map(service => (
          <div key={service.serviceId} className="mb-4 border-b pb-2">
            <p className="font-semibold">{service.name}</p>
            <ul className="ml-4 list-disc text-gray-700">
              {service.items.map(item => (
                <li key={item.itemId}>{item.name} x{item.quantity}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">Delivery Info</h3>
        <p>{order.deliveryInfo.fullName}</p>
        <p>{order.deliveryInfo.address}</p>
        <p>{order.deliveryInfo.phone}</p>
        <p>
          Pickup: {new Date(order.deliveryInfo.pickupTime).toLocaleString()} | Delivery:{" "}
          {order.deliveryInfo.deliveryDate}
        </p>
      </div>

      <button
        onClick={handleReorder}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Reorder This
      </button>
    </div>
  );
};

export default ViewOrderPage;
