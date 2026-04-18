import React, { useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Dashboard = () => {
    const { handleGetSellerProduct } = useProduct();
    const sellerProducts = useSelector(state => state.product.sellerProducts);
    const navigate = useNavigate();

    useEffect(() => {
        handleGetSellerProduct();
    }, []);

    return (
        <>
            {/* Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen selection:bg-[#F97316]/20"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >
                <div className="max-w-6xl mx-auto px-8 lg:px-16 xl:px-24">

                    {/* ── Top Bar ── */}
                    <div className="pt-10 flex items-center gap-5">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-lg transition"
                            style={{ color: '#B5ADA3' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#F97316'}
                            onMouseLeave={e => e.currentTarget.style.color = '#B5ADA3'}
                        >
                            ←
                        </button>

                       <span
    className="text-sm tracking-[0.25em] uppercase"
    style={{
        fontFamily: "'Cormorant Garamond', serif",
        color: '#1b1c1a',   // 🔥 dark for visibility
        letterSpacing: '0.25em',
        fontWeight: 500
    }}
>
    Snitch.
</span>
                    </div>

                    {/* ── Header ── */}
                    <div className="pt-12 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">

                        <div>
                            <h1
                                className="text-4xl lg:text-5xl font-light leading-tight"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: '#1b1c1a'
                                }}
                            >
                                Your Vault
                            </h1>

                            <div className="mt-4 w-14 h-px bg-[#F97316]" />
                        </div>

                        {/* 🔥 PRIMARY ORANGE BUTTON */}
                        <button
                            onClick={() => navigate('/seller/create-product')}
                            className="py-4 px-8 text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-300"
                            style={{
                                backgroundColor: '#F97316',
                                color: '#ffffff'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = '#EA580C';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = '#F97316';
                            }}
                            onMouseDown={e => {
                                e.currentTarget.style.backgroundColor = '#C2410C';
                            }}
                            onMouseUp={e => {
                                e.currentTarget.style.backgroundColor = '#EA580C';
                            }}
                        >
                            New Listing
                        </button>

                    </div>

                    {/* ── Product Grid ── */}
                    {sellerProducts && sellerProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 pb-24">

                            {sellerProducts.map(product => {
                                const imageUrl = product.images?.[0]?.url || '/fallback.png';

                                return (
                                    <div 
                                    onClick={()=>{navigate(`/seller/product/${product._id}`)}}
                                    key={product._id} className="group cursor-pointer">

                                        {/* Image */}
                                        <div className="aspect-[4/5] overflow-hidden mb-6 bg-[#f5f3f0]">
                                            <img
                                                src={imageUrl}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition duration-700 group-hover:scale-[1.03]"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col gap-2">

                                            <h3
                                                className="text-xl leading-snug transition-colors duration-300 group-hover:text-[#F97316]"
                                                style={{
                                                    fontFamily: "'Cormorant Garamond', serif",
                                                    color: '#1b1c1a'
                                                }}
                                            >
                                                {product.title}
                                            </h3>

                                            <p
                                                className="text-[13px] leading-relaxed line-clamp-2"
                                                style={{ color: '#7A6E63' }}
                                            >
                                                {product.description}
                                            </p>

                                            <span
                                                className="text-[10px] uppercase tracking-[0.2em]"
                                                style={{ color: '#1b1c1a' }}
                                            >
                                                {product.price?.currency} {product.price?.amount?.toLocaleString()}
                                            </span>

                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    ) : (
                        <div className="py-28 text-center flex flex-col items-center">

                            <span
                                className="text-[10px] uppercase tracking-[0.3em] mb-6"
                                style={{ color: '#F97316' }}
                            >
                                Empty Vault
                            </span>

                            <p
                                className="max-w-md text-lg leading-relaxed"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    color: '#7A6E63'
                                }}
                            >
                                Your curated space is waiting. Begin by adding your first piece.
                            </p>

                            {/* 🔥 SECONDARY BUTTON */}
                            <button
                                onClick={() => navigate('/seller/create-product')}
                                className="mt-8 px-8 py-3 text-[11px] uppercase tracking-[0.3em] transition"
                                style={{
                                    border: '1px solid #FDBA74',
                                    color: '#EA580C',
                                    backgroundColor: 'transparent'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#FFF7ED';
                                    e.currentTarget.style.borderColor = '#F97316';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.borderColor = '#FDBA74';
                                }}
                            >
                                Create Listing
                            </button>

                        </div>
                    )}

                </div>
            </div>
        </>
    );
};

export default Dashboard;