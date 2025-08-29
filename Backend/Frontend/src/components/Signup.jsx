import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const validatePasswordMatch = (value) =>
    value === password || "Passwords do not match";

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const res = await axios.post("/api/user/signup", userInfo);
      if (res?.data) {
        toast.success("Signup successful");
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
            <p className="mt-1 text-center text-zinc-400">Create your account</p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                    border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                    ${errors.username ? "border-red-500/70 focus:ring-red-500/20" : ""}`}
                  {...register("username", { required: true, minLength: 3 })}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-400">
                    Username must be at least 3 characters
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                    border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                    ${errors.email ? "border-red-500/70 focus:ring-red-500/20" : ""}`}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">Email is required</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                    border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                    ${errors.password ? "border-red-500/70 focus:ring-red-500/20" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
                      message: "Include uppercase, lowercase, and a number",
                    },
                  })}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-zinc-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  className={`w-full rounded-lg border bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 px-3 py-2.5 outline-none transition
                    border-zinc-700 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20
                    ${errors.confirmPassword ? "border-red-500/70 focus:ring-red-500/20" : ""}`}
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: validatePasswordMatch,
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-zinc-400">
                  Have an account?
                  <Link
                    to="/login"
                    className="ml-1 text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Login
                  </Link>
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-600
                             text-white font-medium px-4 py-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Signing up..." : "Signup"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <p className="text-center text-xs text-zinc-500 mt-3">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
