import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth"
import { Link, useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';
import loginImg from "../../../assets/register-fashion.jpg";

const Login = () => {

    const { handleLogin } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

     const handleSubmit = async (e) => {
         e.preventDefault();
        try {
            const user = await handleLogin({ email: formData.email, password: formData.password });
            if (user.role == "buyer") {
                navigate("/");
            } else if (user.role == "seller") {
                navigate("/seller/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="min-h-screen flex bg-[#fafafa] text-[#111]">

            {/* ✅ LEFT IMAGE */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden">

                {/* 🔥 IMAGE */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat"
                    style={{
                        backgroundImage: `url(${loginImg})`,
                        backgroundPosition: "center 20%" // 👈 no face cut
                    }}
                />

                {/* 🔥 DARK OVERLAY (for readable text) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>

                {/* 🔥 CONTENT */}
                <div className="relative z-10 flex flex-col justify-between p-16 w-full max-w-xl mx-auto">

                    <h2 className="text-[#FF8C00] tracking-[0.25em] uppercase text-sm font-semibold">
                        SNITCH.
                    </h2>

                    <div className="space-y-6 max-w-md">

                        <p className="text-xs tracking-[0.35em] text-[#FF8C00] uppercase">
                            Streetwear • Premium • Trending
                        </p>

                        <h1 className="text-5xl font-semibold leading-tight text-white">
                            Welcome <br /> back.
                        </h1>

                        <p className="text-gray-200 text-base leading-relaxed">
                            Sign in to continue exploring premium fashion and latest drops.
                        </p>

                        <div className="w-12 h-[2px] bg-[#FF8C00]"></div>

                    </div>
                </div>
            </div>

            {/* ✅ RIGHT FORM */}
            <div className="flex flex-1 items-center justify-center px-6 sm:px-10 lg:px-16">

                <div className="w-full max-w-md">

                    {/* HEADER */}
                    <div className="mb-10 space-y-2">
                        <h1 className="text-3xl font-semibold text-[#111]">
                            Sign in
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Welcome back to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                placeholder="hello@example.com"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* BUTTON */}
                        <button className="w-full bg-[#FF8C00] text-white py-3 font-semibold rounded-lg hover:bg-[#e67e00] transition">
                            Sign In
                        </button>

                        <ContinueWithGoogle />

                        {/* LINK */}
                        <p className="text-sm text-gray-500 text-center">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-[#FF8C00] font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;