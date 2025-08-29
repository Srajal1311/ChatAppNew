import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider.jsx";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = { email: data.email, password: data.password };

    try {
      const res = await axios.post("/api/user/login", userInfo, {
        withCredentials: true,
      });
      if (res?.data) {
        toast.success("Login successful");
        localStorage.setItem("ChatApp", JSON.stringify(res.data));
        setAuthUser(res.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">
          <div className="px-6 py-7 sm:px-8 sm:py-9">
            <h1 className="text-3xl font-bold text-center text-zinc-100">
              Chat <span className="text-emerald-400">App</span>
            </h1>
            <p className="mt-1 text-center text-zinc-400">Welcome back</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                      border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                      ${errors.email ? "border-red-500/70 focus:ring-red-500/20 focus:border-red-500/70" : ""}`}
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                      border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                      ${errors.password ? "border-red-500/70 focus:ring-red-500/20 focus:border-red-500/70" : ""}`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "At least 8 characters" },
                      pattern: {
                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                        message: "Include uppercase, lowercase, and a number",
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.password.message ||
                      "Password must be at least 8 characters and contain 1 uppercase, 1 lowercase, and 1 number"}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-zinc-400">
                  New user?
                  <Link
                    to="/Signup"
                    className="ml-1 text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Signup
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600
                             text-white font-medium px-4 py-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* tiny footer hint */}
        <p className="text-center text-xs text-zinc-500 mt-3">
          Forgot your password? Contact administrator.
        </p>
      </div>
    </div>
  );
}
