/** @format */

import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import readingBook from "../assets/readingBook.png";
import Navbar from "../components/Navbar";

const baseUrl = "https://online-book-store-wka2.onrender.com";

const Signup = () => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        password: "",
    });

    const changeHandler = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    // signupHandler fucntion
    const signUpHandler = async () => {
        if (
            userData.firstName === "" ||
            userData.lastName === "" ||
            userData.email === "" ||
            userData.age === 0 ||
            userData.password === ""
        )
            return toast.error("All the fields are required");
        else {
            try {
                const res = await axios.post(
                    `${baseUrl}/auth/register`,
                    userData
                );
                if (res.data.error) return toast.error(res.data.error);
                else {
                    setTimeout(() => {
                        navigate("/login");
                    }, 1500);
                    return toast.success(res.data.message);
                }
            } catch (error) {
                return toast.error(error.message);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2">
                <img
                    src={readingBook}
                    alt="book"
                    className="hidden sm:inline w-[700px]"
                />
                <div className="flex flex-col w-60 p-4 shadow-md shadow-[#0C134F] mt-32 m-auto justify-center gap-5 text-2xl md:text-base">
                    {/* first Name field */}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="first name"
                        className="border-b border-b-slate-900 focus:outline-none p-2 mb-4"
                        onChange={changeHandler}
                    />
                    {/* last name field */}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="last name"
                        className="border-b border-b-slate-900 focus:outline-none p-2 mb-4"
                        onChange={changeHandler}
                    />
                    {/* email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        className="border-b border-b-slate-900 focus:outline-none p-2 mb-4"
                        onChange={changeHandler}
                    />
                    {/* age */}
                    <input
                        type="number"
                        name="age"
                        placeholder="age"
                        className="border-b border-b-slate-900 focus:outline-none p-2 mb-4"
                        onChange={changeHandler}
                    />
                    {/* password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        className="border-b border-b-slate-900 focus:outline-none p-2 mb-4"
                        onChange={changeHandler}
                    />
                    <button
                        className="border border-slate-900 p-2 rounded-md transition-all duration-500 hover:bg-slate-900  hover:translate-x-2 hover:text-white"
                        onClick={signUpHandler}
                    >
                        Signup
                    </button>
                    <h2>
                        <span className="font-bold">
                            Already have an account?
                        </span>
                        <NavLink
                            to="/login"
                            className="font-semibold text-blue-600"
                        >
                            Login
                        </NavLink>
                        <span> here</span>
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Signup;
