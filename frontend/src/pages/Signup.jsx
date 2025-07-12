import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/slices/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import Lottie from "lottie-react";
import laundryAnim from "../assets/laundry-animation.json";
import devX from "../assets/images/devx.jpg";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [matchError, setMatchError] = useState("");

  useEffect(() => {
    gsap.from(formRef.current, {
      duration: 0.8,
      opacity: 1,
      y: 40,
      ease: "power3.out",
    });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMatchError("Passwords do not match");
      return;
    }

    setMatchError("");
    const res = await dispatch(
      registerUser({ name: form.name, email: form.email, password: form.password })
    );
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl bg-white">
        {/* Left - Animation */}
        <div>
          <div className="text-center flex flex-col justify-center items-center ">
          <img src={devX} alt=""
          className="size-20 rounded-full" />
          <p className="text-shadow-lg font-bold text-3xl">Laundry App</p>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center">
          <Lottie animationData={laundryAnim} loop={true} className="w-3/4 h-3/4" />
        </div>

        </div>
  
        {/* Right - Form */}
        <div ref={formRef} className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-center text-shadow-lg mb-6">
            Create an Account
          </h2>

          {error && <p className="text-center text-red-600 mb-4 text-sm">{error}</p>}
          {matchError && <p className="text-center text-red-500 mb-4 text-sm">{matchError}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-4 py-2"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a
              href="/log-in"
              className="text-green-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
