import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, thunkAPI) => {
    try {
      console.log('Submitting order:', orderData);
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data || 'Server Error');
    }
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user?._id || state.auth.user?.id;
    try {
      const res = await api.get(`/orders/user/${userId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch orders");
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (orderId, thunkAPI) => {
    try {
      const res = await api.get(`/orders/${orderId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch order");
    }
  }
);