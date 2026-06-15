"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaEyeSlash,
  FaArrowRight,
  FaChurch,
} from "react-icons/fa";
import Image from "next/image";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError("All fields are required");
    }
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }
    if (!formData.agreedToTerms) {
      return setError("You must agree to the Terms & Conditions");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Account created successfully! Redirecting...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef2f9] flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">

        <Image
          src="/images/hero.jpg"
          width={5000}
          height={10000}
          alt="Church interior"
          className="w-full h-full object-cover scale-105 hover:scale-110 duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#03276e]/90 via-[#03276e]/65 to-black/50" />

        <div className="absolute inset-0 flex flex-col justify-between p-16 text-white">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F7AD32] to-[#0A4CDF]" />

            <div>

              <h2
                className="text-3xl font-bold"
                style={{ fontFamily: "Cormorant Garamond" }}
              >
                THE UPPER ROOM
              </h2>

              <p className="text-xs tracking-[6px]">
                MINISTRY HUB
              </p>

            </div>

          </div>

          <div>

            <h1
              className="text-7xl leading-[0.9]"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Join
              <br />
              The
              <br />
              Mission.
            </h1>

            <h3
              className="text-4xl italic mt-5 text-[#F4A523]"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Become part of something greater.
            </h3>

            <p className="mt-8 text-lg leading-8 max-w-lg text-gray-200">
              Create your account and connect with ministries,
              events, and resources that strengthen faith and
              community.
            </p>

          </div>

          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20">

            <p
              className="text-3xl leading-snug"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              "Let your light shine before others."
            </p>

            <p className="mt-3 text-sm text-gray-200">
              — Matthew 5:16
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-lg">

          <div className="bg-white/70 backdrop-blur-2xl rounded-[32px] border border-white shadow-2xl p-10">

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7AD32] to-[#0A4CDF] flex items-center justify-center text-white text-2xl">

                <FaChurch />

              </div>

            </div>

            <h2
              className="text-center text-5xl text-[#11295C]"
              style={{ fontFamily: "Cormorant Garamond" }}
            >
              Create Account
            </h2>

            <p className="text-center text-gray-500 mt-3 mb-8">
              Join the Upper Room Ministry Hub
            </p>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-5 text-sm text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-5 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#0A4CDF]"
                />

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#0A4CDF]"
                />

              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#0A4CDF]"
              />

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-14 rounded-2xl border border-gray-200 px-5 pr-14 outline-none focus:border-[#0A4CDF]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              <div className="relative">

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full h-14 rounded-2xl border border-gray-200 px-5 pr-14 outline-none focus:border-[#0A4CDF]"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>

              </div>

              <label className="flex items-center gap-3 text-sm text-gray-600">

                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />

                I agree to the Terms & Conditions

              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#0A4CDF] text-white font-semibold flex items-center justify-center gap-3 hover:bg-[#03276e] hover:-translate-y-1 duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >

                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <FaArrowRight />}

              </button>

            </form>

            <div className="flex items-center gap-4 my-8">

              <div className="flex-1 h-px bg-gray-300" />

              <span className="text-gray-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-300" />

            </div>

            <button className="w-full h-14 rounded-2xl border border-gray-200 hover:bg-gray-50 duration-300">

              Continue with Google

            </button>

            <p className="text-center mt-8 text-gray-600">

              Already have an account?{" "}

              <Link
                href="/login"
                className="text-[#0A4CDF] font-semibold hover:underline"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}