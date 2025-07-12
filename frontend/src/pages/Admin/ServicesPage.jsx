import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/slices/api/adminApiSlice";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { services } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Services</h2>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service._id} className="p-4 bg-white rounded shadow">
            <p><strong>Name:</strong> {service.name}</p>
            <p><strong>Items:</strong> {service.items.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;
