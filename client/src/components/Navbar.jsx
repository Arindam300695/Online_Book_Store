/** @format */

import { useEffect, useState } from "react";
import { GiTripleScratches } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cartReducer);
    const [clicked, setclicked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) setIsLoggedIn(true);
        return () => {};
    }, []);

    // logoutHandler function
    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        toast.success("Logged out");
        setIsLoggedIn(false);
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="flex items-center h-20 text-2xl bg-teal-500 md:text-base">
            {/* TODO: normal navbar */}
            <h4 className="ms-5 md:ms-32">
                <NavLink to="/" className="ms-2 me-2">
                    <SiHomeassistantcommunitystore className="text-[2rem]  text-[#0C134F]" />
                </NavLink>
            </h4>
            <ul className="hidden ms-auto me-4 sm:inline">
                {!isLoggedIn ? (
                    <>
                        <NavLink
                            to="/signup"
                            className="p-2 font-bold text-white transition-all duration-150 border-r-2 ms-2 me-2 hover:border-b-4 hover:border-b-black hover:p-1 border-r-orange-700"
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="p-2 font-bold text-white transition-all duration-150 border-r-2 ms-2 me-2 hover:border-b-4 hover:border-b-black hover:p-1 border-r-orange-700"
                        >
                            Login
                        </NavLink>
                    </>
                ) : (
                    <NavLink
                        className="p-2 font-bold text-white transition-all duration-150 border-r-2 ms-2 me-2 hover:border-b-4 hover:border-b-black hover:p-1 border-r-orange-700"
                        onClick={logoutHandler}
                    >
                        Logout
                    </NavLink>
                )}
                {isLoggedIn && (
                    <>
                        <NavLink
                            to="/addBook"
                            className="p-2 font-bold text-white transition-all duration-150 border-r-2 ms-2 me-2 hover:border-b-4 hover:border-b-black hover:p-1 border-r-orange-700"
                        >
                            Add Book
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className="p-2 font-bold text-white transition-all duration-150 border-r-2 ms-2 me-2 hover:border-b-4 hover:border-b-black hover:p-1 border-r-orange-700"
                        >
                            Cart
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white shadow m-2">
                                {cartItems.length}
                            </span>
                        </NavLink>
                    </>
                )}
            </ul>

            {/* TODO: mobile navbar */}
            <GiTripleScratches
                className="ms-auto me-10 text-[2rem] sm:hidden"
                onClick={() => {
                    setclicked(!clicked);
                }}
            />
            <ul
                className={` transition-all duration-700 ease-in-out ${
                    !clicked
                        ? "h-screen w-screen bg-slate-600 text-white absolute top-20 right-[-300%] p-5 flex flex-col"
                        : "h-screen w-screen text-white absolute top-20 right-0 p-5 flex flex-col bg-slate-600"
                }`}
            >
                {!isLoggedIn ? (
                    <>
                        <NavLink
                            to="/signup"
                            className="p-1 mt-10 transition-all duration-150 ms-2 me-2 focus:border-b-4 border-b-black"
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="p-1 mt-10 transition-all duration-150 ms-2 me-2 focus:border-b-4 border-b-black"
                        >
                            Login
                        </NavLink>
                    </>
                ) : (
                    <NavLink
                        className="p-1 mt-10 transition-all duration-150 ms-2 me-2 focus:border-b-4 border-b-black"
                        onClick={logoutHandler}
                    >
                        Logout
                    </NavLink>
                )}
                {isLoggedIn && (
                    <>
                        <NavLink
                            to="/addBook"
                            className="p-1 mt-10 transition-all duration-150 ms-2 me-2 focus:border-b-4 border-b-black"
                        >
                            Add Book
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className="p-1 mt-10 transition-all duration-150 ms-2 me-2 focus:border-b-4 border-b-black"
                        >
                            Cart
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-blue-500 text-white shadow m-2">
                                {cartItems.length}
                            </span>
                        </NavLink>
                    </>
                )}
            </ul>
            <ToastContainer position="top-left" />
        </div>
    );
};

export default Navbar;
