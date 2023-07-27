/** @format */

import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import readingBook from "../assets/readingBook2.png";
import Navbar from "../components/Navbar";

const baseUrl = "https://online-book-store-wka2.onrender.com";

const Login = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    // loginHandler
    const loginHandler = async () => {
        if (userData.email === "" || userData.password === "")
            return toast.error("All the fields are required");
        try {
            const res = await axios.post(`${baseUrl}/auth/login`, userData);
            if (res.data.error) return toast.error(res.data.error);
            else {
                localStorage.setItem("user", JSON.stringify(res.data.user));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/");
                }, 2500);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <img
                    src={readingBook}
                    alt="book image"
                    className="hidden sm:inline"
                />
                <div className="flex flex-col w-60 p-4 h-96 shadow-md shadow-[#0C134F] mt-32 m-auto justify-center gap-5 text-2xl md:text-base">
                    {/* email field */}
                    <input
                        type="email"
                        className="border-b-2 border-b-gray-500 mb-5 p-2 focus:outline-none"
                        placeholder="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />

                    {/*password field  */}
                    <input
                        type="password"
                        className="border-b-2 border-b-gray-500 p-2 focus:outline-none"
                        placeholder="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <button
                        className="border border-slate-900 p-2 rounded-md transition-all duration-500 hover:bg-slate-900  hover:translate-x-2 hover:text-white"
                        onClick={loginHandler}
                    >
                        Login
                    </button>
                    <h2>
                        <span className="font-bold">Dont have an account?</span>
                        <NavLink
                            to="/signup"
                            className="font-semibold text-blue-600"
                        >
                            Signup
                        </NavLink>
                        <span> here</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Login;
