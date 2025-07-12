import React from 'react';
import { motion } from 'framer-motion';

const CounterInput = ({ label, value, onIncrement, onDecrement }) => (
  <motion.div
    className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-xl"
    whileHover={{ scale: 1.02 }}
  >
    <span className="font-medium text-gray-700">{label}</span>
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrement}
        className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600"
      >-</button>
      <span className="min-w-[20px] text-center">{value}</span>
      <button
        onClick={onIncrement}
        className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-600"
      >+</button>
    </div>
  </motion.div>
);

export default CounterInput;