import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveryInfo } from "../redux/slices/orderSlice";
import { submitOrder } from "../redux/slices/api/orderApiSlice";
import { useNavigate } from "react-router-dom";

const DeliveryDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderState = useSelector(state => state.order);
  const auth = useSelector((state) => state.auth);
  const userId = auth.user?._id || auth.user?.id;

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    phone: "",
    pickupTime: "",
    deliveryDate: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    if (!form.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!form.deliveryDate) newErrors.deliveryDate = "Delivery date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    

    dispatch(setDeliveryInfo(form));

    // const orderData = {
    //   selectedServices: orderState.selectedServices,
    //   serviceDetails: orderState.serviceDetails,
    //   notes: orderState.notes,
    //   paymentMethod: orderState.paymentMethod,
    //   paymentDetails: orderState.paymentDetails,
    //   deliveryInfo: form,
    // };

 const services = orderState.selectedServices.map(serviceName => {
    const itemsObj = orderState.serviceDetails[serviceName] || {};
    const items = Object.entries(itemsObj)
      .map(([itemId, quantity]) => ({
        itemId: Number(itemId),
        name: '',   // Optional: add actual item names if available
        price: 0,   // Optional: add actual prices if available
        quantity,
      }))
      .filter(item => item.quantity > 0); // exclude items with zero quantity

    return {
      serviceId: serviceName,
      name: serviceName,
      items,
    };
  });

  const orderData = {
    userId, // make sure userId exists in orderState or get from auth
    services,
    notes: orderState.notes,
    paymentMethod: orderState.paymentMethod,
    paymentDetails: orderState.paymentDetails,
    deliveryInfo: form,
  };

  try {
    console.log('Submitting transformed order:', orderData);
      const res = await dispatch(submitOrder(orderData));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/status");
      } else {
        alert("Order failed: " + (res.payload?.message || "Please try again."));
      }
    } catch (err) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Enter Delivery Details</h2>

      {["fullName", "address", "phone"].map((field) => (
        <div key={field} className="mb-4">
          <input
            type="text"
            name={field}
            placeholder={
              field === "fullName"
                ? "Full Name"
                : field === "address"
                ? "Address"
                : "Phone Number"
            }
            value={form[field]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors[field] && (
            <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
          )}
        </div>
      ))}

      <div className="mb-4">
        <label className="block mb-1 font-medium text-sm">Pickup Time</label>
        <input
          type="datetime-local"
          name="pickupTime"
          value={form.pickupTime}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.pickupTime && (
          <p className="text-red-500 text-sm mt-1">{errors.pickupTime}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium text-sm">Delivery Date</label>
        <input
          type="date"
          name="deliveryDate"
          value={form.deliveryDate}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.deliveryDate && (
          <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
        )}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Place Order
      </button>
    </div>
  );
};

export default DeliveryDetails;
