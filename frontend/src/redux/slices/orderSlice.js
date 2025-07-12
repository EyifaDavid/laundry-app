import { createSlice } from '@reduxjs/toolkit';
import { fetchOrder, fetchOrders, submitOrder } from './api/orderApiSlice';

const initialState = {
  order: null,
  selectedServices: [], // array of service IDs
  serviceDetails: {}, // { serviceId: { itemId: count, ... }, ... }
  notes: '',
  paymentMethod: 'cod',
  paymentDetails: {}, // card/mobile payment info
  deliveryInfo: {
    fullName: '',
    address: '',
    phone: '',
    pickupTime: '',
    deliveryDate: '',
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedServices(state, action) {
      state.selectedServices = action.payload;
    },
    setServiceDetails: (state, action) => {
      state.serviceDetails = action.payload;
    },
    updateServiceItems(state, action) {
    const { serviceId, items } = action.payload;
    state.serviceDetails[serviceId] = items;
    },
    setServiceItemCount(state, action) {
      const { serviceId, itemId, count } = action.payload;
      if (!state.serviceDetails[serviceId]) {
        state.serviceDetails[serviceId] = {};
      }
      state.serviceDetails[serviceId][itemId] = count;

      console.log("Setting item count:", action.payload);

    },
    setNotes(state, action) {
      state.notes = action.payload;
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload;
    },
    setPaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    setDeliveryInfo(state, action) {
      state.deliveryInfo = { ...state.deliveryInfo, ...action.payload };
    },
    resetOrder(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
      builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.lastOrder = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Order failed';
      })
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const {
  setSelectedServices,
  setServiceItemCount,
  setServiceDetails,
  updateServiceItems,
  setNotes,
  setPaymentMethod,
  setPaymentDetails,
  setDeliveryInfo,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
