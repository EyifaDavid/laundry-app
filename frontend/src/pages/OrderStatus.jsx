import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { gsap } from "gsap";

const stages = [
  {
    id: 1,
    label: "Order Picked Up",
    description: "Your laundry has been picked up and is on its way to the facility.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 2,
    label: "In Laundry",
    description: "Your laundry is being cleaned with utmost care and quality.",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 3,
    label: "Laundry Cleaned",
    description: "Your laundry is cleaned and ready! Scheduled delivery on the given date and time.",
    image: "https://images.unsplash.com/photo-1541534741688-6078f67a7565?auto=format&fit=crop&w=400&q=60",
  },
  {
    id: 4,
    label: "Delivered",
    description: "Your laundry has been delivered. Thank you for choosing us!",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=60",
  },
];

const stepperCircleStyle = (isActive, isCompleted) =>
  `w-10 h-10 rounded-full flex items-center justify-center border-2 ${
    isCompleted
      ? "bg-green-600 border-green-600 text-white"
      : isActive
      ? "border-green-600 text-green-600"
      : "border-gray-300 text-gray-400"
  }`;

const OrderStatus = ({ deliveryDate, deliveryTime }) => {
  const [currentStage, setCurrentStage] = useState(1);
  const contentRef = useRef(null);

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.isAdmin;

  const current = stages.find((s) => s.id === currentStage);

  // GSAP animation
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.5 }
      );
    }
  }, [currentStage]);

  const nextStage = () => {
    if (isAdmin && currentStage < stages.length) {
      setCurrentStage(currentStage + 1);
    }
  };

  const prevStage = () => {
    if (isAdmin && currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Order Status</h2>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-10">
        {stages.map((stage, idx) => {
          const isActive = stage.id === currentStage;
          const isCompleted = stage.id < currentStage;
          const isLast = idx === stages.length - 1;

          return (
            <div key={stage.id} className="flex-1 flex flex-col items-center relative">
              <div
                className={stepperCircleStyle(isActive, isCompleted)}
                onClick={() => isAdmin && setCurrentStage(stage.id)}
                style={{ cursor: isAdmin ? "pointer" : "default" }}
                aria-label={stage.label}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  stage.id
                )}
              </div>

              <span
                className={`mt-2 text-sm font-semibold ${
                  isActive ? "text-green-700" : "text-gray-500"
                }`}
              >
                {stage.label}
              </span>

              {!isLast && (
                <div
                  className={`absolute top-5 right-[-50%] w-full h-1 ${
                    isCompleted ? "bg-green-600" : "bg-gray-300"
                  }`}
                  style={{ zIndex: -1 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Stage Content with GSAP */}
      <div
        ref={contentRef}
        className="flex flex-col md:flex-row items-center gap-8 transition-opacity"
      >
        <img
          src={current.image}
          alt={current.label}
          className="w-full max-w-sm rounded-lg shadow-md object-cover"
        />
        <div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">{current.label}</h3>
          <p className="text-gray-600 mb-3">{current.description}</p>

          {current.id === 3 && (deliveryDate || deliveryTime) && (
            <p className="text-green-700 font-semibold">
              Scheduled Delivery: {deliveryDate}{" "}
              {deliveryTime && `at ${deliveryTime}`}
            </p>
          )}
        </div>
      </div>

      {/* Admin-only Navigation Buttons */}
      {isAdmin && (
        <div className="mt-10 flex justify-between">
          <button
            onClick={prevStage}
            disabled={currentStage === 1}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={nextStage}
            disabled={currentStage === stages.length}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
