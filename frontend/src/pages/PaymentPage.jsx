import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPaymentMethod, setPaymentDetails } from "../redux/slices/orderSlice";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentMethod = useSelector(state => state.order.paymentMethod);
  const paymentDetails = useSelector(state => state.order.paymentDetails);

  const handleMethodChange = (method) => {
    dispatch(setPaymentMethod(method));
  };

  const handleDetailChange = (field, value) => {
    dispatch(setPaymentDetails({ ...paymentDetails, [field]: value }));
  };

  return (
    <div className="mt-6 space-y-4 max-w-md mx-auto">
      <h3 className="font-semibold text-xl mb-4">Payment Method</h3>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => handleMethodChange("cod")}
          />
          Pay on Delivery
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => handleMethodChange("card")}
          />
          Pay with Card
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="payment"
            value="mobile"
            checked={paymentMethod === "mobile"}
            onChange={() => handleMethodChange("mobile")}
          />
          Pay with Mobile Money
        </label>
      </div>

      {paymentMethod === "card" && (
        <div className="space-y-2 mt-2">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full p-2 border rounded"
            value={paymentDetails.cardNumber || ""}
            onChange={(e) => handleDetailChange("cardNumber", e.target.value)}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            className="w-full p-2 border rounded"
            value={paymentDetails.expiryDate || ""}
            onChange={(e) => handleDetailChange("expiryDate", e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full p-2 border rounded"
            value={paymentDetails.cvv || ""}
            onChange={(e) => handleDetailChange("cvv", e.target.value)}
          />
        </div>
      )}

      {paymentMethod === "mobile" && (
        <div className="space-y-2 mt-2">
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full p-2 border rounded"
            value={paymentDetails.mobileNumber || ""}
            onChange={(e) => handleDetailChange("mobileNumber", e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={paymentDetails.network || ""}
            onChange={(e) => handleDetailChange("network", e.target.value)}
          >
            <option value="">Select Network</option>
            <option>MTN</option>
            <option>Vodafone</option>
            <option>AirtelTigo</option>
          </select>
        </div>
      )}

      <button
        onClick={() => navigate("/delivery")}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Continue to Delivery
      </button>
    </div>
  );
};

export default PaymentPage;
