import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  itemId: Number,
  name: String,
  price: Number,
  quantity: Number,
});

const serviceSchema = new mongoose.Schema({
  serviceId: String,
  name: String,
  items: [itemSchema],
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  services: [serviceSchema],
  notes: String,
  paymentMethod: String,
  paymentDetails: {},
  deliveryInfo: {
    fullName: String,
    address: String,
    phone: String,
    pickupTime: String,
    deliveryDate: String,
  },
  status: {
    type: String,
    default: 'Picked Up',
    enum: ['Picked Up', 'In Laundry', 'Cleaned', 'Delivered'],
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
