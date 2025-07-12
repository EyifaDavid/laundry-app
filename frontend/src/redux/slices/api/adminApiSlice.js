// src/redux/slices/api/adminApiSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../utils/api";

// Fetch all orders
export const fetchAllOrders = createAsyncThunk("admin/fetchOrders", async (_, thunkAPI) => {
  try {
    const res = await api.get("/admin/orders");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
  }
});

// Update order status
export const updateOrderStatus = createAsyncThunk("admin/updateStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await api.put(`/orders/${id}`, { status });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update order");
  }
});

// Fetch users
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (_, thunkAPI) => {
  try {
    const res = await api.get("/admin/users");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch users");
  }
});

// Fetch services
export const fetchServices = createAsyncThunk("admin/fetchServices", async (_, thunkAPI) => {
  try {
    const res = await api.get("/services");
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch services");
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    orders: [],
    users: [],
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update order
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
        state.orders = updated;
      })
      // Users
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Services
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
      });
  },
});

export default adminSlice.reducer;
