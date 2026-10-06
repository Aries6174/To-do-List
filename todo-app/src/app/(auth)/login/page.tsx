"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        setError("");
        
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();

        if(!response.ok) {
            setError(data.error ?? "Login failed");
            return;
        }

        router.push("/");
    };

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
                                Welcome back!
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Log in to your account to continue.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

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

                            {/* Remember / Forgot */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-slate-600">
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-blue-500"
                                    />
                                    Remember me
                                </label>

                                <button
                                    type="button"
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            )}

                            {/* Login */}
                            <button
                                type="submit"
                                className="w-full rounded-lg bg-blue-500 py-3 font-semibold text-white hover:bg-blue-600 transition"
                            >
                                Log In
                            </button>

                        </form>

                        {/* Register */}
                        <p className="text-center text-sm text-slate-500 mt-8">
                            Don&apos;t have an account?{" "}
                            <a
                                href="/register"
                                className="font-medium text-blue-500 hover:text-blue-600"
                            >
                                Sign up
                            </a>
                        </p>

                    </div>
                </section>
            </div>
        </main>
    );
}