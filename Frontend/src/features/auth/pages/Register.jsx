import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth"
import { Link, useNavigate } from 'react-router';

const Register = () => {

    const { handleRegister } = useAuth()
    const navigate = useNavigate()

    const [ formData, setFormData ] = useState({
        fullName: '',
        contactNumber: '',
        email: '',
        password: '',
        isSeller: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [ name ]: type === 'checkbox' ? checked : value
        }));
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
    } catch (error) {
        alert(
            error.response?.data?.message ||
            error.response?.data?.errors?.[0]?.msg ||
            "Registration failed"
        );
    }
};

    return (
        <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] font-sans selection:bg-[#FF8C00] selection:text-[#131313] flex flex-col lg:flex-row">

            {/* ✅ LEFT SIDE UPDATED ONLY */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#131313] items-center justify-center overflow-hidden border-r border-[#1c1b1b]">

                <div className="absolute inset-0 bg-gradient-to-br from-[#1c1b1b] to-[#131313]"></div>

                <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#FF8C00]/10 blur-[120px] rounded-full"></div>
                <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[#FF8C00]/5 blur-[100px] rounded-full"></div>

                <div className="relative z-10 p-16 flex flex-col h-full justify-between w-full max-w-2xl">

                    <h2 className="text-[#FF8C00] text-xl font-bold tracking-widest uppercase">Snitch.</h2>

                    <div className="mt-auto mb-10 w-full space-y-6">

                        <p className="text-xs tracking-[0.25em] uppercase text-[#FF8C00]">
                            Streetwear • Premium • Trending
                        </p>

                        <p className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1] text-white">
                            Define your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C00] to-[#FFA500]">
                                aesthetic.
                            </span>
                        </p>

                        <p className="text-[#a39b87] max-w-md text-lg leading-relaxed">
                            Discover premium clothing, latest drops, and curated styles designed for modern fashion lovers.
                        </p>

                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF8C00]/40 to-transparent"></div>

                        <div className="flex items-center gap-10 pt-4">
                            <div>
                                <p className="text-white font-bold text-xl">10K+</p>
                                <p className="text-xs text-[#5a5858] uppercase tracking-wider">Products</p>
                            </div>

                            <div>
                                <p className="text-white font-bold text-xl">500+</p>
                                <p className="text-xs text-[#5a5858] uppercase tracking-wider">Brands</p>
                            </div>

                            <div>
                                <p className="text-white font-bold text-xl">24/7</p>
                                <p className="text-xs text-[#5a5858] uppercase tracking-wider">Support</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ✅ RIGHT SIDE (YOUR ORIGINAL — NOT CHANGED) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 min-h-screen overflow-y-auto z-10 bg-[#0e0e0e]">
                <div className="w-full max-w-md bg-[#131313] lg:bg-transparent p-10 md:p-14 lg:p-6 rounded-2xl lg:rounded-none shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] lg:shadow-none">
                    <div className="mb-12">
                        <h2 className="text-sm uppercase tracking-widest text-[#FF8C00] font-medium mb-3">Welcome to Snitch</h2>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">Elevate Your Style</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                        {/* 👇 YOUR ORIGINAL INPUTS — untouched */}
                        <div className="flex flex-col">
                            <label className="text-sm text-[#d0c6ab] mb-2 font-medium">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FF8C00] outline-none px-4 py-3 transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="e.g. John Doe"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-[#d0c6ab] mb-2 font-medium">Contact Number</label>
                            <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FF8C00] outline-none px-4 py-3 transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-[#d0c6ab] mb-2 font-medium">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FF8C00] outline-none px-4 py-3 transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="hello@example.com"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-[#d0c6ab] mb-2 font-medium">Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required
                                className="bg-[#1c1b1b] lg:bg-[#0e0e0e] text-white border-b-2 border-[#4d4732] focus:border-[#FF8C00] outline-none px-4 py-3 transition-colors duration-300 focus:bg-[#201f1f] lg:focus:bg-[#131313]"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" name="isSeller" checked={formData.isSeller} onChange={handleChange}
                                className="w-5 h-5 accent-[#FF8C00]" />
                            <span className="text-[#e5e2e1] hover:text-[#FF8C00]">Register as Seller</span>
                        </div>

                        <a href="/api/auth/google" className="text-sm text-[#e5e2e1] hover:text-[#FF8C00]">
                            Continue with Google
                        </a>

                        <button type="submit"
                            className="mt-6 w-full bg-[#FF8C00] text-[#131313] font-bold py-4 rounded hover:bg-[#FF9C2A] transition">
                            Sign Up
                        </button>

                        <div className="text-center mt-6">
                            <Link to="/login" className="text-sm text-[#999077] hover:text-[#FF8C00]">
                                Already have an account? Sign in
                            </Link>
                        </div>

                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;