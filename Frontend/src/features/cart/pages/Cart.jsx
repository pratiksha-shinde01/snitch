import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCart } from '../hook/useCart'
import { Link, useNavigate } from 'react-router'

/* SVG Icons for clean look */
const MinusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
)

const TrashIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
)

// "High-End Stealth Editorial" / Obsidian Lens Design System Tokens
const tokens = {
    background: '#f9fafb',          // light gray background
    surface: '#ffffff',
    surfaceContainerLow: '#ffffff',
    surfaceContainer: '#ffffff',
    surfaceContainerHigh: '#f3f4f6',
    surfaceContainerHighest: '#e5e7eb',
    surfaceBright: '#f9fafb',

    onSurface: '#111827',           // dark text
    onSurfaceVariant: '#6b7280',    // gray text

    primary: '#ff6a00',             // orange accent
    primaryContainer: '#ff8c00',
    onPrimary: '#ffffff',

    outlineVariant: '#e5e7eb'
}

const Cart = () => {
    // Redux fallback to empty array
    const cartItems = useSelector(state => state.cart.items) || []
    const { handleGetCart, handleIncrementCartItem, handleRemoveCartItem } = useCart()
    const navigate = useNavigate()

    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        handleGetCart()
    }, [])

    useEffect(() => {
        if (cartItems?.length) {
            const initial = {}
            cartItems.forEach(item => {
                initial[item._id] = item.quantity ?? 1
            })
            setQuantities(initial)
        }
    }, [cartItems])

    const changeQty = (id, delta) => {
        setQuantities(prev => {
           const newQty = Math.max(1, (prev[id] ?? 1) + delta)
           return { ...prev, [id]: newQty }
        })
    }

    const subtotal = cartItems.reduce((sum, item) => {
        const qty = quantities[item._id] ?? item.quantity ?? 1
        return sum + (item.price?.amount ?? 0) * qty
    }, 0)

    const freeShippingThreshold = 15000
    const shippingFree = subtotal >= freeShippingThreshold
    const totalPieces = cartItems.length

    const getVariantDetails = (product, variantId) => {
        if (!product?.variants || !variantId) return null
        return product.variants.find(v => v._id === variantId) ?? null
    }

    const getDisplayImage = (product, variant) => {
        if (variant?.images?.length) return variant.images[0].url
        if (product?.images?.length) return product.images[0].url
        return null
    }

    const formatCurrency = (amount, currency = 'INR') =>
        `${currency} ${Number(amount).toLocaleString('en-IN')}`

    if (!cartItems.length) {
        return (
            <>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
                <div className="min-h-screen flex flex-col" style={{ backgroundColor: tokens.background, color: tokens.onSurface, fontFamily: "'Inter', sans-serif" }}>
                    {/* Nav */}
                    <nav className="px-8 lg:px-16 xl:px-24 pt-10 pb-6 flex items-center justify-between">
                        <Link to="/" className="text-xl font-semibold tracking-[-0.02em] hover:opacity-80 transition-opacity" style={{ color: tokens.primary }}>
                            Snitch.
                        </Link>
                        <button onClick={() => navigate(-1)} className="text-[0.6875rem] uppercase tracking-[0.1em] font-medium transition-colors hover:opacity-70" style={{ color: tokens.onSurfaceVariant }}>
                            Return to Archive
                        </button>
                    </nav>

                    <div className="flex-1 flex flex-col items-center justify-center gap-6 pb-24 px-8">
                        <p className="text-4xl md:text-5xl font-medium tracking-tight text-center" style={{ color: tokens.onSurface }}>
                            Your selection is empty.
                        </p>
                        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-center" style={{ color: tokens.onSurfaceVariant }}>
                            Curate your collection
                        </p>
                        <Link
                            to="/"
                            className="mt-6 px-10 py-4 text-[0.75rem] uppercase tracking-[0.1em] font-medium rounded-2xl transition-all duration-300"
                            style={{
                                background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.primaryContainer})`,
                                color: tokens.onPrimary,
                            }}
                        >
                            Explore the Archive
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
            <div className="min-h-screen pb-24 selection:bg-[#ff9153]/30" style={{ backgroundColor: tokens.background, fontFamily: "'Inter', sans-serif" }}>
                {/* Header / Nav */}
         

                <div className="max-w-7xl mx-auto px-8 lg:px-16 xl:px-24 pt-8 lg:pt-16">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                        
                        {/* LEFT COLUMN - Cart Items */}
                        <div className="w-full lg:w-[65%]">
                            {/* Heading */}
                            <div className="mb-10 pl-4 lg:pl-10" style={{ borderLeft: `2px solid ${tokens.primary}` }}>
                                <h1 className="text-4xl lg:text-5xl font-medium tracking-tight mb-2" style={{ color: tokens.onSurface }}>
                                    Your Selection
                                </h1>
                                <p className="text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: tokens.onSurfaceVariant }}>
                                    {totalPieces} {totalPieces === 1 ? 'piece' : 'pieces'}
                                </p>
                            </div>

                            {/* Cart Item List */}
                            <div className="flex flex-col gap-6">
                                {cartItems.map(item => {
                                    const { product, variant: variantId, price, _id } = item
                                    const variantDetail = getVariantDetails(product, variantId)
                                    const imageUrl = getDisplayImage(product, variantDetail)
                                    const displayPrice = price ?? variantDetail?.price ?? product?.price
                                    const qty = quantities[_id] ?? item.quantity ?? 1
                                    const attributes = variantDetail?.attributes ?? {}
                                    const stock = variantDetail?.stock

                                    return (
                                        <div
                                            key={_id}
                                            className="flex gap-6 md:gap-8 p-6 md:p-8 rounded-[1.5rem] transition-colors duration-300 group"
                                            style={{ backgroundColor: tokens.surfaceContainer }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = tokens.surfaceBright}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = tokens.surfaceContainer}
                                        >
                                            {/* Product Image */}
                                            <div
                                                className="flex-shrink-0 overflow-hidden rounded-[1rem] relative"
                                                style={{
                                                    width: 'clamp(100px, 15vw, 140px)',
                                                    aspectRatio: '4/5',
                                                    backgroundColor: tokens.surfaceContainerLow,
                                                }}
                                            >
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={product?.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-100" />
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    {/* Title */}
                                                    <h2 className="text-xl lg:text-2xl font-medium tracking-tight mb-4" style={{ color: tokens.onSurface }}>
                                                        {product?.title}
                                                    </h2>

                                                    {/* Attributes */}
                                                    {Object.keys(attributes).length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {Object.entries(attributes).map(([key, val]) => (
                                                                <span
                                                                    key={key}
                                                                    className="px-2 py-1 text-[0.6875rem] uppercase tracking-[0.1em] font-medium rounded-lg"
                                                                    style={{ backgroundColor: tokens.surfaceContainerHigh, color: tokens.onSurfaceVariant }}
                                                                >
                                                                    {key}: <span style={{ color: tokens.onSurface }}>{val}</span>
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between items-baseline mb-4">
                                                        <p className="text-[0.875rem] font-medium tracking-wider" style={{ color: tokens.primary }}>
                                                            {displayPrice ? formatCurrency(displayPrice.amount, displayPrice.currency) : '—'}
                                                        </p>
                                                        {stock !== undefined && (
                                                            <p className="text-[0.6875rem] uppercase tracking-[0.1em]" style={{ color: stock > 0 ? tokens.onSurfaceVariant : tokens.primary }}>
                                                                {stock > 0 ? `${stock} in stock` : 'Out of stock'}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Action Row */}
                                                <div className="flex items-center justify-between mt-auto pt-4 relative">
                                                    {/* Ghost Border */}
                                                    <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: `${tokens.outlineVariant}26` }} />
                                                    
                                                    {/* Quantity control */}
                                                    <div className="flex items-center gap-4">
                                                        <button
                                                            onClick={() => changeQty(_id, -1)}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
                                                            style={{ color: tokens.onSurface }}
                                                        >
                                                            <MinusIcon />
                                                        </button>
                                                        <span className="text-[0.875rem] font-medium w-4 text-center" style={{ color: tokens.onSurface }}>
                                                            {qty}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                changeQty(_id, 1)
                                                                if (handleIncrementCartItem) handleIncrementCartItem({ productId: product._id, variantId })
                                                            }}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
                                                            style={{ color: tokens.primary }}
                                                        >
                                                            <PlusIcon />
                                                        </button>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            if (handleRemoveCartItem) handleRemoveCartItem(_id)
                                                        }}
                                                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-gray-100 group-hover:opacity-100 opacity-60"
                                                        style={{ color: tokens.onSurfaceVariant }}
                                                        title="Remove item"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* RIGHT COLUMN - Order Summary (Sticky) */}
                        <div className="w-full lg:w-[35%] lg:sticky lg:top-24">
                            <div
                                className="p-8 rounded-[1.5rem]"
                                style={{ 
                                    backgroundColor: tokens.surfaceContainer,
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <h2 className="text-2xl font-medium tracking-tight mb-8" style={{ color: tokens.onSurface }}>
                                    Order Summary
                                </h2>

                                <div className="flex flex-col gap-5 mb-8">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: tokens.onSurfaceVariant }}>
                                            Subtotal
                                        </span>
                                        <span className="text-[0.875rem] font-medium tracking-wider" style={{ color: tokens.onSurface }}>
                                            {formatCurrency(subtotal)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: tokens.onSurfaceVariant }}>
                                            Shipping
                                        </span>
                                        <span className="text-[0.75rem] tracking-[0.1em] text-right" style={{ color: shippingFree ? tokens.primary : tokens.onSurfaceVariant }}>
                                            {shippingFree ? 'Free' : 'Complimentary > ₹15,000'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: tokens.onSurfaceVariant }}>
                                            Taxes
                                        </span>
                                        <span className="text-[0.75rem] uppercase tracking-[0.1em]" style={{ color: tokens.onSurfaceVariant }}>
                                            Included
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full h-[1px] mb-8" style={{ backgroundColor: `${tokens.outlineVariant}26` }} />

                                <div className="flex justify-between items-end mb-10">
                                    <span className="text-[0.875rem] uppercase tracking-[0.1em] font-medium" style={{ color: tokens.onSurface }}>
                                        Grand Total
                                    </span>
                                    <span className="text-2xl font-medium tracking-wider" style={{ color: tokens.primary }}>
                                        {formatCurrency(subtotal)}
                                    </span>
                                </div>

                                <button
                                    className="w-full py-4 text-[0.875rem] uppercase tracking-[0.1em] font-medium rounded-[1rem] transition-all duration-300 hover:opacity-90 shadow-[0_0_20px_rgba(255,145,83,0.15)]"
                                    style={{
                                        background: `linear-gradient(135deg, ${tokens.primary}, ${tokens.primaryContainer})`,
                                        color: tokens.onPrimary,
                                    }}
                                >
                                    Proceed to Checkout
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full mt-4 py-4 text-[0.75rem] uppercase tracking-[0.1em] font-medium rounded-[1rem] transition-colors duration-300 bg-transparent hover:bg-gray-100"
                                    style={{ 
                                        color: tokens.onSurface,
                                        border: `1px solid ${tokens.outlineVariant}40`
                                    }}
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart