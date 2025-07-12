import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setServiceItemCount, setNotes } from "../redux/slices/orderSlice";

const items = [
  { id: 1, name: "Shirt", price: 5, icon: "👕" },
  { id: 2, name: "Trousers", price: 7, icon: "👖" },
  { id: 3, name: "Dress", price: 10, icon: "👗" },
];

const ServiceDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedServices = useSelector(state => state.order.selectedServices);
  const serviceDetails = useSelector(state => state.order.serviceDetails);
  const notes = useSelector(state => state.order.notes);

  const [localCounts, setLocalCounts] = useState(serviceDetails || {});
  const [note, setNote] = useState(notes || "");

  // Update local state from Redux on first load
  useEffect(() => {
    setLocalCounts(serviceDetails);
  }, [serviceDetails]);

  const handleCountChange = (serviceId, itemId, delta) => {
    const prevCount = localCounts[serviceId]?.[itemId] || 0;
    const newCount = Math.max(0, prevCount + delta);
    const updated = {
      ...localCounts,
      [serviceId]: {
        ...localCounts[serviceId],
        [itemId]: newCount,
      },
    };
    setLocalCounts(updated);

    // Sync with Redux
    dispatch(setServiceItemCount({ serviceId, itemId, count: newCount }));
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
    dispatch(setNotes(e.target.value));
  };

  const handleProceed = () => {
    navigate("/summary");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Select Items for Your Services</h2>

      {selectedServices.length === 0 ? (
        <p className="text-gray-600">No services selected.</p>
      ) : (
        selectedServices.map((serviceId) => (
          <div key={serviceId} className="mb-6 border-b pb-4">
            <h3 className="text-lg font-semibold mb-2 capitalize">{serviceId}</h3>
            {items.map((item) => {
              const count = localCounts[serviceId]?.[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <div className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    <small className="text-gray-500">${item.price}</small>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCountChange(serviceId, item.id, -1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{count}</span>
                    <button
                      onClick={() => handleCountChange(serviceId, item.id, 1)}
                      className="px-2 py-1 bg-blue-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}

      <textarea
        placeholder="Additional notes (optional)"
        className="w-full mt-4 p-2 border border-gray-300 rounded-md focus:ring-2 ring-blue-500"
        value={note}
        onChange={handleNoteChange}
      />

      <button
        onClick={handleProceed}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded"
      >
        Proceed to Summary
      </button>
    </div>
  );
};

export default ServiceDetails;
