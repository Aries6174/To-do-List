"use client";

import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password,  setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    }

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                {/* Left side */}
                <section className="hidden lg:block px-8">
                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                        Get things done,
                        <br />
                        one task at a time.
                    </h1>

                    <p className="mt-6 text-lg text-slate-500 max-w-lg">
                        Stay organized, boost your productivity, and make
                        progress toward your goals.
                    </p>

                    <div className="mt-10 space-y-6">
                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Simple & Clean
                            </h3>
                            <p className="text-slate-500">
                                Focus on what matters.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Secure
                            </h3>
                            <p className="text-slate-500">
                                Your data is safe with us.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-slate-800">
                                Access Anywhere
                            </h3>
                            <p className="text-slate-500">
                                Your tasks, on any device.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Login card */}
                <section className="w-full max-w-md mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">

                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                                    <span className="text-white text-2xl">
                                        ✓
                                    </span>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold text-slate-900">
                                Welcome!
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Register to create your Account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-800"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-slate-700 mb-2"
                                >
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-800"
                                    >
                                        {showConfirmPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 transition"
                            >
                                Create Account
                            </button>

                        </form>
                        

                        {/* Log In */}
                        <p className="text-center text-sm text-slate-500 mt-8">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-blue-500 hover:text-blue-600"
                            >
                                Log In
                            </a>
                        </p>

                    </div>
                </section>
            </div>
        </main>
    );
}