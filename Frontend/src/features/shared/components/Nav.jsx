import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user)
    const cartItems = useSelector(state => state.cart.items)



  return (
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

                            <Link to="/cart" className="relative text-gray-600 hover:text-[#FF8C00] transition flex items-center ml-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                {cartItems?.length > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-[#FF8C00] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
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
  )
}

export default Nav