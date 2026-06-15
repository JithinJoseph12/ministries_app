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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      return setError("Please enter email and password");
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid credentials");
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#eef2f9] flex">

      {/* LEFT SIDE */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden">

          <Image
src="/images/hero.jpg"
  width={5000}
  height={10000}
            alt="Church interior"
          className="w-full h-full object-cover scale-105 hover:scale-110 duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#03276e]/90 via-[#03276e]/65 to-[#000]/50" />

        <div className="absolute inset-0 flex flex-col justify-between p-16 text-white">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F7AD32] to-[#0A4CDF]" />

              <div>

                <h2 className="text-3xl font-bold tracking-wide">
                  THE UPPER ROOM
                </h2>

                <p className="text-xs tracking-[6px] text-gray-200">
                  MINISTRY HUB
                </p>

              </div>

            </div>

          </div>

          <div className="animate-[fadeIn_1s_ease]">

            <h1
              className="text-7xl leading-[0.9] font-bold"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Many
              <br />
              Ministries.
              <br />
              One Mission.
            </h1>

            <h3
              className="text-4xl italic mt-6 text-[#F4A523]"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              For the salvation of souls.
            </h3>

            <p className="mt-8 text-lg leading-8 text-gray-200 max-w-lg">
              The Upper Room unites Catholic ministries to foster
              collaboration, visibility and shared resources.
            </p>

          </div>

          <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">

            <p
              className="text-3xl leading-snug"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              “As the Father has sent me,
              even so I send you.”
            </p>

            <p className="mt-3 text-sm text-gray-200">
              — John 20:21
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md">

          <div className="bg-white/70 backdrop-blur-2xl rounded-[32px] shadow-2xl border border-white p-10">

            <div className="flex justify-center mb-5">

              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F7AD32] to-[#0A4CDF] flex items-center justify-center text-white text-2xl shadow-lg">

                <FaChurch />

              </div>

            </div>

            <h2
              className="text-5xl text-center text-[#11295C]"
              style={{
                fontFamily: "Cormorant Garamond",
              }}
            >
              Welcome Back
            </h2>

            <p className="text-center text-gray-500 mt-3 mb-8">
              Sign in to continue your ministry journey
            </p>

            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-5 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full h-14 rounded-2xl border border-gray-200 px-5 outline-none focus:border-[#0A4CDF] duration-300"
              />

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-14 rounded-2xl border border-gray-200 px-5 pr-14 outline-none focus:border-[#0A4CDF] duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <div className="flex justify-between text-sm">

                <label className="flex gap-2 items-center">

                  <input type="checkbox" />

                  Remember me

                </label>

                <span className="text-[#0A4CDF] cursor-pointer hover:underline">
                  Forgot Password?
                </span>

              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#0A4CDF] text-white font-semibold flex justify-center items-center gap-3 hover:bg-[#03276e] hover:-translate-y-1 duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >

                {loading ? "Signing In..." : "Sign In"}

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

            <button className="w-full h-14 rounded-2xl border border-gray-200 hover:bg-gray-50 duration-300 font-medium">

              Continue with Google

            </button>

            <p className="text-center mt-8 text-gray-600">

              Don't have an account?{" "}

              <Link
                href="/signup"
                className="text-[#0A4CDF] font-semibold hover:underline"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </main>
  );
}