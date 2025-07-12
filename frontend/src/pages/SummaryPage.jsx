import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ServiceDetails from "./ServiceDetails";

const items = [
  { id: 1, name: "Shirt", price: 5, icon: "👕" },
  { id: 2, name: "Trousers", price: 7, icon: "👖" },
  { id: 3, name: "Dress", price: 10, icon: "👗" },
];

const services = [
  { id: "wash", name: "Wash & Fold" },
  { id: "dryclean", name: "Dry Cleaning" },
  { id: "iron", name: "Ironing" },
];



const SummaryPage = () => {
  const navigate = useNavigate();
  const selectedServices = useSelector(state => state.order.selectedServices);
  const serviceDetails = useSelector(state => state.order.serviceDetails);
  const notes = useSelector(state => state.order.notes);

  const getItemDetails = (itemId) => items.find(i => i.id === Number(itemId)) || {};

  const totalCost = selectedServices.reduce((sum, serviceId) => {
    const itemCounts = serviceDetails[serviceId] || {};
    return sum + Object.entries(itemCounts).reduce((acc, [itemId, count]) => {
      const item = getItemDetails(itemId);
      return acc + (item.price || 0) * count;
    }, 0);
  }, 0);

  console.log("Selected Services:", selectedServices);
  console.log("Service Details:", serviceDetails);


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      {selectedServices.length === 0 && <p>No services selected</p>}

    {selectedServices
  .filter(serviceId => services.some(s => s.id === serviceId)) // ✅ Filter only valid service IDs
  .map(serviceId => {
    const service = services.find(s => s.id === serviceId);
    const itemCounts = serviceDetails[serviceId] || {};
    const selectedItems = Object.entries(itemCounts).filter(([_, count]) => count > 0);

    return (
      <div key={serviceId} className="mb-4 border p-4 rounded shadow">
        <h3 className="font-semibold mb-2">{service?.name || serviceId}</h3>
        <ul>
          {selectedItems.length > 0 ? (
            selectedItems.map(([itemId, count]) => {
              const item = getItemDetails(itemId);
              return (
                <li key={itemId} className="flex justify-between">
                  <span>{item.icon} {item.name}</span>
                  <span>{count} x ${item.price} = ${count * item.price}</span>
                </li>
              );
            })
          ) : (
            <li className="text-gray-500">No items selected</li>
          )}
        </ul>
      </div>
    );
  })}


      {notes && (
        <div className="mb-4 p-4 bg-yellow-50 rounded border border-yellow-300">
          <strong>Additional Notes:</strong>
          <p>{notes}</p>
        </div>
      )}

      <div className="text-right font-bold text-lg mb-6">
        Total: ${totalCost.toFixed(2)}
      </div>

      <button
        onClick={() => navigate("/payment")}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default SummaryPage;
