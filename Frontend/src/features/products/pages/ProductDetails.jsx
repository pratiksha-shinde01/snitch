import React, { useEffect, useState, useMemo } from 'react'
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

    // ✅ NEW STATES
    const [selectedAttributes, setSelectedAttributes] = useState({})

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

    // ✅ DEFAULT SELECT FIRST VARIANT
    useEffect(() => {
        if (product?.variants?.length > 0) {
            setSelectedAttributes(product.variants[0].attributes || {})
        }
    }, [product])

    // ✅ FIND ACTIVE VARIANT
    const activeVariant = useMemo(() => {
        if (!product?.variants) return null

        return product.variants.find(v => {
            const vAttrs = v.attributes || {}
            return Object.entries(selectedAttributes).every(
                ([key, val]) => vAttrs[key] === val
            )
        })
    }, [product, selectedAttributes])

    // ✅ GET ALL AVAILABLE ATTRIBUTES
    const availableAttributes = useMemo(() => {
        if (!product?.variants) return {}

        const attrs = {}

        product.variants.forEach(v => {
            Object.entries(v.attributes || {}).forEach(([key, val]) => {
                if (!attrs[key]) attrs[key] = new Set()
                attrs[key].add(val)
            })
        })

        Object.keys(attrs).forEach(key => {
            attrs[key] = Array.from(attrs[key])
        })

        return attrs
    }, [product])

    // ✅ HANDLE ATTRIBUTE CHANGE (Intelligent Switching)
    const handleAttributeChange = (attr, value) => {
        const newAttrs = { ...selectedAttributes, [attr]: value }

        // 1. Try to find exact match with the new combination
        const exactMatch = product.variants.find(v => {
            const vAttrs = v.attributes || {}
            return Object.entries(newAttrs).every(
                ([k, v]) => vAttrs[k] === v
            )
        })

        if (exactMatch) {
            setSelectedAttributes(exactMatch.attributes)
            return
        }

        // 2. If no exact match, find ANY variant that has this new attribute value
        // This ensures the user's click always leads to a valid variant if one exists
        const alternativeMatch = product.variants.find(v => {
            const vAttrs = v.attributes || {}
            return vAttrs[attr] === value
        })

        if (alternativeMatch) {
            setSelectedAttributes(alternativeMatch.attributes)
        } else {
            // 3. Last resort fallback
            setSelectedAttributes(newAttrs)
        }
    }

    // ✅ RESET IMAGE WHEN VARIANT CHANGES
    useEffect(() => {
        setSelectedImage(0)
    }, [activeVariant])

    // ✅ NEXT/PREV IMAGE HANDLERS
    const handleNextImage = () => {
        if (displayImages.length > 0) {
            setSelectedImage((prev) => (prev + 1) % displayImages.length)
        }
    }

    const handlePrevImage = () => {
        if (displayImages.length > 0) {
            setSelectedImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)
        }
    }

    // ── Loading State ──────────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 text-xs tracking-widest uppercase">Loading…</p>
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

    // ✅ FALLBACK LOGIC
    const displayImages =
        activeVariant?.images?.length > 0
            ? activeVariant.images
            : product.images || []

    const displayPrice =
        activeVariant?.price?.amount
            ? activeVariant.price
            : product.price

    const activeImage = displayImages[selectedImage]?.url || '/placeholder.jpg'

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#111]">

            {/* ── NAVBAR ── */}
            <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-8 border-b border-gray-100 bg-white">
                <Link to="/" className="text-2xl font-black tracking-[0.2em] text-slate-900">
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
                            <span className="absolute top-4 left-4 bg-[#FF8C00] text-white text-xs font-semibold px-3 py-1 rounded-full tracking-wider uppercase z-10">
                                New Arrival
                            </span>

                            {/* Hover Navigation Buttons */}
                            {displayImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.preventDefault(); handlePrevImage(); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 flex items-center justify-center text-gray-800 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FF8C00] hover:text-white hover:scale-110 active:scale-95 z-20"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => { e.preventDefault(); handleNextImage(); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 backdrop-blur-md border border-gray-100 flex items-center justify-center text-gray-800 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#FF8C00] hover:text-white hover:scale-110 active:scale-95 z-20"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Counter Overlay */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 uppercase">
                                {selectedImage + 1} / {displayImages.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {displayImages.length > 1 && (
                            <div className="flex gap-3">
                                {displayImages.map((img, idx) => (
                                    <button
                                        key={img._id || idx}
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
                                ₹{displayPrice?.amount?.toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                                ₹{((displayPrice?.amount || 0) * 1.2).toFixed(0)}
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

                        {/* Dynamic Attribute Selectors */}
                        {Object.entries(availableAttributes).map(([attr, values]) => (
                            <div key={attr}>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
                                        Select {attr}
                                    </h2>
                                    {attr.toLowerCase() === 'size' && (
                                        <button className="text-xs text-[#FF8C00] underline underline-offset-2 hover:text-[#e67700] transition">
                                            Size Guide
                                        </button>
                                    )}
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {values.map(val => {
                                        const isSelected = selectedAttributes[attr] === val
                                        return (
                                            <button
                                                key={val}
                                                onClick={() => handleAttributeChange(attr, val)}
                                                className={`min-w-[48px] h-12 px-4 rounded-lg border text-sm font-semibold transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-[#FF8C00] text-[#FF8C00] bg-orange-50 ring-2 ring-[#FF8C00]/20'
                                                        : 'border-gray-200 text-gray-700 hover:border-[#FF8C00] hover:text-[#FF8C00] hover:bg-orange-50'
                                                    }`}
                                            >
                                                {val}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Stock Information */}
                        {activeVariant && (
                            <div className="flex items-center gap-2 -mt-2">
                                <div className={`w-2 h-2 rounded-full ${activeVariant.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                                <p className={`text-sm font-medium ${activeVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {activeVariant.stock > 0
                                        ? `${activeVariant.stock} units available`
                                        : 'Out of stock'}
                                </p>
                            </div>
                        )}

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