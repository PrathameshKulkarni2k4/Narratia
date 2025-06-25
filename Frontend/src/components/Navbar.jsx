import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
    const { pathname } = useLocation();
    const showNav = ["/", "/about", "/contact"].includes(pathname);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!showNav) return null;

    return (
        <>
            <nav
                className={`${isScrolled ? "bg-[#010409]" : "bg-slate-900"
                    } transition-colors duration-300 text-white px-4 py-3 flex justify-between items-center md:px-6 shadow-md fixed top-0 left-0 w-full z-50`}
            >
                {/* Hamburger Icon (Mobile Only) */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(true)}>
                        <FaBars size={22} />
                    </button>
                </div>

                {/* Centered Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-white absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
                >
                    Narratia
                </Link>

                {/* Right Side (Desktop) */}
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/about" className="hover:text-gray-400">About</Link>
                    <Link to="/contact" className="hover:text-gray-400">Contact</Link>
                    <Link to="/login" className="text-sm hover:text-gray-400">Sign In</Link>
                    <Link
                        to="/register"
                        className="border border-white text-white px-3 py-1 text-sm rounded hover:bg-white/10 transition"
                    >
                        Sign Up
                    </Link>
                </div>

                {/* Mobile: Sign In button */}
                <Link
                    to="/login"
                    className="md:hidden text-sm hover:text-gray-400"
                >
                    Sign In
                </Link>
            </nav>

            {/* Push content down to avoid overlap */}


            {/* Mobile Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-[#161b22] shadow-lg z-50 transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex justify-end items-center p-4 border-b border-slate-700">
                    <button onClick={() => setIsOpen(false)} className="text-white">
                        <IoClose size={24} />
                    </button>
                </div>

                <div className="flex flex-col space-y-4 p-4 text-white">
                    <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
                        About
                    </Link>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400">
                        Contact
                    </Link>
                </div>

                {/* Sign Up Button in Sidebar Bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4">
                    <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center border border-white text-white px-4 py-2 rounded hover:bg-white/10 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export { Navbar };
