import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProduct } from '../hooks/useProduct';
import { Link, Navigate,useNavigate} from 'react-router';

const Home = () => {
    const products = useSelector(state => state.product.products);
    const user = useSelector(state => state.auth.user);
    const { handleGetAllProducts } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetAllProducts();
    }, []);
    
    return (
        
        <div className="min-h-screen bg-[#fafafa] text-[#111]">

            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-6 border-b border-gray-200 bg-white">

                <Link
                    to="/"
                    className="text-xl font-bold tracking-widest text-[#FF8C00]"
                >
                    SNITCH.
                </Link>

                <div className="flex items-center gap-6 text-sm">

                    {user ? (
                        <>
                            <span className="text-gray-700 font-medium">
                                {user.fullname}
                            </span>

                            {user.role === 'seller' && (
                                <Link
                                    to="/seller/dashboard"
                                    className="text-gray-600 hover:text-[#FF8C00] transition"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-gray-600 hover:text-[#FF8C00] transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-[#FF8C00] text-white px-4 py-2 rounded-md hover:bg-[#e67700] transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* HERO */}
            <div className="text-center py-20 px-6">

                <p className="text-sm tracking-[0.3em] text-[#FF8C00] uppercase">
                    Premium Collection
                </p>

                <h1 className="text-4xl sm:text-5xl font-bold mt-4 text-[#111]">
                    Curated Fashion Archive
                </h1>

                <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                    Discover modern streetwear and premium pieces designed for everyday style.
                </p>
            </div>

            {/* PRODUCTS */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pb-20">

                {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {products.map(product => {
                            const imageUrl =
                                product.images?.[0]?.url || '/placeholder.jpg';

                            return (
                                <div
                                onClick={()=> navigate(`/product/${product._id}`)}
                                    key={product._id}
                                    className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                                >

                                    {/* IMAGE */}
                                    <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                                        <img
                                            src={imageUrl}
                                            alt={product.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>

                                    {/* DETAILS */}
                                    <div className="p-4">

                                        <h3 className="text-lg font-semibold text-[#111] group-hover:text-[#FF8C00] transition">
                                            {product.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {product.description}
                                        </p>

                                        <div className="mt-3 font-medium text-[#111]">
                                            {product.price?.currency} {product.price?.amount}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No products found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            New collection is coming soon.
                        </p>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <footer className="border-t border-gray-200 py-10 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} SNITCH. All rights reserved.
            </footer>

        </div>
    );
};

export default Home;