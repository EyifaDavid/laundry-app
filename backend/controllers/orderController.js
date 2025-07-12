import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
    ...req.body,
    userId: req.user._id, // ✅ always use authenticated user's ID
  });
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserOrders = async (req, res) => {
  console.log("Fetching orders for user:", req.params.userId); // ✅ Debug log
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optional: authorization check
     if (order.userId !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    console.error("Order fetch error:", err);
    res.status(500).json({ message: "Failed to get order" });
  }
};

