import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth"
import { Link, useNavigate } from 'react-router';
import ContinueWithGoogle from '../components/ContinueWithGoogle';
import registerImg from "../../../assets/register-fashion.jpg";

const Register = () => {

    const { handleRegister } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister({
                email: formData.email,
                contact: formData.contactNumber,
                password: formData.password,
                isSeller: formData.isSeller,
                fullname: formData.fullName
            });
            navigate("/");
        } catch {
            alert("Registration failed");
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
                        backgroundImage: `url(${registerImg})`,
                        backgroundPosition: "center 20%"
                    }}
                />

                {/* 🔥 DARK GRADIENT (KEY FIX) */}
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
                            Create your <br /> identity.
                        </h1>

                        <p className="text-gray-200 text-base leading-relaxed">
                            Join a community of trendsetters and explore curated fashion collections.
                        </p>

                        <div className="w-12 h-[2px] bg-[#FF8C00]"></div>

                    </div>
                </div>
            </div>

            {/* ✅ RIGHT FORM */}
            <div className="flex flex-1 items-center justify-center px-6 sm:px-10 lg:px-16">

                <div className="w-full max-w-md">

                    <div className="mb-10 space-y-2">
                        <h1 className="text-3xl font-semibold text-[#111]">
                            Create account
                        </h1>
                        <p className="text-gray-500 text-sm">
                            Start your fashion journey today
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label className="text-sm text-gray-600 block mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 block mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-3 outline-none focus:border-[#FF8C00]"
                                placeholder="+91 9876543210"
                            />
                        </div>

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

                        <label className="flex items-center gap-2 text-sm text-gray-600">
                            <input type="checkbox" name="isSeller" onChange={handleChange} />
                            Register as seller
                        </label>

                        <button className="w-full bg-[#FF8C00] text-white py-3 font-semibold rounded-lg hover:bg-[#e67e00] transition">
                            Create Account
                        </button>

                        <ContinueWithGoogle />

                        <p className="text-sm text-gray-500 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-[#FF8C00] font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;