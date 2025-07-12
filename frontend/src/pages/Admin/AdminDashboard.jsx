import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to="orders" className={({ isActive }) => isActive ? "text-green-400" : ""}>
            Orders
          </NavLink>
          <NavLink to="users" className={({ isActive }) => isActive ? "text-green-400" : ""}>
            Users
          </NavLink>
          <NavLink to="services" className={({ isActive }) => isActive ? "text-green-400" : ""}>
            Services
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
