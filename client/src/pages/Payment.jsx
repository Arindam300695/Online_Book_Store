/** @format */

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import chipset from "../assets/chipset.png";
import { useDispatch } from "react-redux";
import { emptyCart } from "../store/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [creditCardData, setCreditCardData] = useState("");
    const [cvvData, setCVVData] = useState("");
    const [user, setUser] = useState({});
    const [isChecked, setIsChecked] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const changeHandler = (event) => {
        const { value } = event.target;

        // Remove non-digit characters and limit to 16 digits
        const sanitizedValue = value.replace(/\D/g, "").slice(0, 16);
        // const formattedValue = sanitizedValue.replace(/(\d{4})/g, "$1 ");

        setCreditCardData(sanitizedValue);
    };

    const changeCVVHandler = (event) => {
        const { value } = event.target;

        // Remove non-digit characters and limit to 16 digits
        const sanitizedValue = value.replace(/\D/g, "").slice(0, 3);
        // const formattedValue = sanitizedValue.replace(/(\d{3})/g);

        setCVVData(sanitizedValue);
    };

    useEffect(() => {
        const localStorageUser = JSON.parse(localStorage.getItem("user"));
        setUser(localStorageUser);
        const token = localStorage.getItem("token");
        if (token === null) navigate("/");

        return () => {};
    }, [navigate]);

    // payment handler
    const paymentHandler = () => {
        if (creditCardData === "" || cvvData === "")
            return toast.warning("Please enter your credit card no and CVV");
        if (!isPaid) toast.success("Payment done successfully");
        setIsPaid(true);
        dispatch(emptyCart());
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div>
            <Navbar />
            <div className="m-auto mt-48 w-[300px]">
                {/* card section */}
                <div className="p-6 m-auto transition-transform duration-300 transform text-[#a69b8d] bg-[#0c0c0e] rounded-lg shadow-lg w-[300px] hover:scale-105 grid grid-cols-1">
                    <div className="flex items-center justify-between mb-6">
                        <div className="text-2xl font-bold">
                            American Express
                        </div>
                        <div className="w-16 h-14 bg-[#948679] rounded-md flex justify-center items-center">
                            <img
                                src={chipset}
                                alt="chipset"
                                className="h-[80%]"
                            />
                        </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-600">
                        <h1 className="text-[#a69b8d]">Enter Your Card NO</h1>
                        {`${creditCardData.slice(0, 4)} ${creditCardData.slice(
                            4,
                            8
                        )} ${creditCardData.slice(
                            8,
                            12
                        )} ${creditCardData.slice(12, 16)} `}
                    </div>
                    <div className="mb-4 text-lg">
                        <div className="font-bold">Cardholder Name</div>
                        <div>
                            {user.userName ? (
                                <span className="font-semibold">
                                    {user.userName}
                                </span>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="font-bold">Expiration Date</div>
                            <div className="font-semibold">12/30</div>
                        </div>
                        <div>
                            <div className="font-bold">CVV</div>
                            <div className="font-semibold text-gray-600">
                                {cvvData}
                            </div>
                        </div>
                    </div>
                </div>

                {/* inputs section */}
                <div className="grid grid-cols-1 p-4 sm:grid-cols-2">
                    <input
                        type="text"
                        maxLength={19}
                        className="p-3 m-5 text-center border-b border-black focus:outline-none"
                        value={creditCardData}
                        onChange={changeHandler}
                    />
                    <input
                        type="password"
                        maxLength={19}
                        className="p-3 m-5 text-center border-b border-black focus:outline-none"
                        value={cvvData}
                        onChange={changeCVVHandler}
                    />
                </div>
                <input
                    type="checkbox"
                    className="m-2"
                    onChange={() => {
                        setIsChecked(!isChecked);
                    }}
                />
                <button
                    className={`p-3 transition-all duration-300 border border-black rounded-lg m-3 ${
                        isChecked &&
                        "hover:bg-slate-900 hover:text-white hover:font-semibold"
                    }`}
                    disabled={!isChecked}
                    onClick={paymentHandler}
                >
                    {!isChecked ? <>disabled</> : <>Confirm Payment</>}
                </button>
            </div>
        </div>
    );
};

export default Payment;
