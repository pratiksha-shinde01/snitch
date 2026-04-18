import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { useProduct } from '../hooks/useProduct'
import { useSelector } from 'react-redux'

const ProductDetails = () => {
    const { id } = useParams()
    const { handleGetProductById } = useProduct()
    const user = useSelector(state => state.auth.user)

    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [loading, setLoading] = useState(true)

    async function fetchProductDetails() {
        try {
            setLoading(true)
            const data = await handleGetProductById(id)
            setProduct(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) fetchProductDetails()
    }, [id])

    // ── Loading State ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#FF8C00] border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm tracking-widest uppercase">Loading…</p>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <p className="text-gray-500">Product not found.</p>
            </div>
        )
    }

    const images = product.images || []
    const activeImage = images[selectedImage]?.url || '/placeholder.jpg'

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#111]">

            {/* ── NAVBAR ── */}
            <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-6 border-b border-gray-200 bg-white">
                <Link to="/" className="text-xl font-bold tracking-widest text-[#FF8C00]">
                    SNITCH.
                </Link>
                <div className="flex items-center gap-6 text-sm">
                    {user ? (
                        <>
                            <span className="text-gray-700 font-medium">{user.fullname}</span>
                            {user.role === 'seller' && (
                                <Link to="/seller/dashboard" className="text-gray-600 hover:text-[#FF8C00] transition">
                                    Dashboard
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-[#FF8C00] transition">Login</Link>
                            <Link to="/register" className="bg-[#FF8C00] text-white px-4 py-2 rounded-md hover:bg-[#e67700] transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* ── BREADCRUMB ── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-6">
                <nav className="flex items-center gap-2 text-sm text-gray-400">
                    <Link to="/" className="hover:text-[#FF8C00] transition">Home</Link>
                    <span>/</span>
                    <span className="text-[#111] font-medium capitalize">{product.title}</span>
                </nav>
            </div>

            {/* ── MAIN CONTENT ── */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

                    {/* ── LEFT : IMAGE GALLERY ── */}
                    <div className="flex flex-col gap-4">

                        {/* Main image */}
                        <div className="relative w-full aspect-[4/5] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                            <img
                                key={activeImage}
                                src={activeImage}
                                alt={product.title}
                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                            />
                            {/* Orange tag */}
                            <span className="absolute top-4 left-4 bg-[#FF8C00] text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wider uppercase">
                                New Arrival
                            </span>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex gap-3">
                                {images.map((img, idx) => (
                                    <button
                                        key={img._id}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0
                                            ${selectedImage === idx
                                                ? 'border-[#FF8C00] shadow-md scale-105'
                                                : 'border-gray-200 hover:border-[#FF8C00]/50'
                                            }`}
                                    >
                                        <img src={img.url} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT : PRODUCT INFO ── */}
                    <div className="flex flex-col justify-start gap-6 py-2">

                        {/* Category pill */}
                        <span className="text-xs tracking-[0.25em] text-[#FF8C00] uppercase font-semibold">
                            Women's Fashion
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#111] leading-tight capitalize">
                            {product.title}
                        </h1>

                        {/* Rating row (static decoration) */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-4 h-4 ${i < 4 ? 'text-[#FF8C00]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">4.0 · 128 reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl font-extrabold text-[#FF8C00]">
                                ₹{product.price?.amount?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                ₹{((product.price?.amount || 0) * 1.2).toFixed(0)}
                            </span>
                            <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                20% OFF
                            </span>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Description */}
                        <div>
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Description</h2>
                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                {product.description}
                            </p>
                        </div>

                        {/* Size selector (static) */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Select Size</h2>
                                <button className="text-xs text-[#FF8C00] underline underline-offset-2 hover:text-[#e67700] transition">
                                    Size Guide
                                </button>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700
                                            hover:border-[#FF8C00] hover:text-[#FF8C00] hover:bg-orange-50
                                            focus:border-[#FF8C00] focus:text-[#FF8C00] focus:ring-2 focus:ring-[#FF8C00]/20
                                            transition-all duration-200"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <button
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-[#FF8C00] text-[#FF8C00]
                                    font-semibold py-4 rounded-xl hover:bg-[#FF8C00] hover:text-white
                                    active:scale-95 transition-all duration-200 text-sm tracking-wide"
                            >
                                {/* Cart icon */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M17 13l1.4 7M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                                </svg>
                                Add to Cart
                            </button>

                            <button
                                className="flex-1 flex items-center justify-center gap-2 bg-[#FF8C00] text-white
                                    font-semibold py-4 rounded-xl hover:bg-[#e67700] shadow-lg shadow-orange-200
                                    active:scale-95 transition-all duration-200 text-sm tracking-wide"
                            >
                                {/* Lightning icon */}
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Buy Now
                            </button>
                        </div>

                        {/* Delivery info */}
                        <div className="flex flex-col gap-3 pt-2">
                            {[
                                { icon: '🚚', text: 'Free delivery on orders above ₹999' },
                                { icon: '↩️', text: '7-day easy returns & exchanges' },
                                { icon: '🔒', text: 'Secure payments — 100% protected' },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-gray-500">
                                    <span className="text-base">{icon}</span>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* ── FOOTER ── */}
            <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-400 mt-16">
                © {new Date().getFullYear()} SNITCH. All rights reserved.
            </footer>

        </div>
    )
}

export default ProductDetails