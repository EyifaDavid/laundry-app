import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/api/adminApiSlice";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Registered Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {users.map(user => (
          <li key={user._id} className="p-4 bg-white shadow rounded">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
