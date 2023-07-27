/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";

const baseUrl = "http://localhost:8080";

const EachBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bookData, setBookData] = useState([]);
    const [token, setToken] = useState([]);
    const [isVisible, setIsvisible] = useState(false);
    const [dataToBeUpdated, setDataToBeUpdated] = useState({
        title: "",
        description: "",
        author: "",
        price: 0,
        bookImageUrl: "",
    });

    const changeHandler = (event) => {
        setDataToBeUpdated({
            ...dataToBeUpdated,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        const localStorageToken = JSON.parse(localStorage.getItem("token"));
        setToken(localStorageToken);
        if (localStorageToken === null) navigate("/");
        const fetchSingleBook = async (id) => {
            try {
                const res = await axios.get(`${baseUrl}/book/getBook/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorageToken,
                    },
                });
                setBookData([res.data]);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchSingleBook(id);
    }, [id, navigate]);

    // editHandler funtion
    const editHandler = () => {
        setIsvisible(true);
    };

    // confirmedEditHandler funtion
    const confirmedEditHandler = async (bookId) => {
        if (
            dataToBeUpdated.title === "" ||
            dataToBeUpdated.description === "" ||
            dataToBeUpdated.author === "" ||
            dataToBeUpdated.price === 0 ||
            dataToBeUpdated.bookImageUrl === ""
        )
            return toast.error("All the fields are required");
        else {
            try {
                const res = await axios.put(
                    `${baseUrl}/book/updateBook/${bookId}`,
                    dataToBeUpdated,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    }
                );
                if (res.data.error) return toast.error(res.data.error);
                else {
                    setBookData([res.data.updatedBook]);
                    return toast.success(res.data.message);
                }
            } catch (error) {
                return toast.error(error.message);
            }
        }
    };

    // deleteHandler funtion
    const deleteHandler = async (bookId) => {
        try {
            const res = await axios.delete(
                `${baseUrl}/book/deleteBook/${bookId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            if (res.data.error) return toast.error(res.data.error);
            else {
                setTimeout(() => {
                    navigate("/");
                }, 2000);
                return toast.success(res.data.message);
            }
        } catch (error) {
            return toast.error(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div
                className={`${
                    isVisible ? "grid grid-cols-1 md:grid-cols-2" : ""
                }`}
            >
                {bookData.map((book) => (
                    <div
                        key={book._id}
                        className="w-64 mb-10 p-3 shadow-md shadow-[#0C134F] m-auto mt-24 text-2xl md:text-base transition-all duration-300 hover:scale-[1.05] hover:bg-slate-700 hover:text-slate-300 flex flex-col justify-center"
                    >
                        <img
                            src={book.bookImageUrl}
                            alt="book"
                            className="mb-4"
                        />
                        <h1 className="mb-2">
                            title:{" "}
                            <span className="font-bold">{book.title}</span>
                        </h1>
                        <hr className="mb-4" />
                        <h1 className="mb-4">
                            description:{" "}
                            <span className="font-semibold">
                                {book.description}
                            </span>
                        </h1>
                        <h1 className="mb-4">
                            written by:{" "}
                            <span className="font-semibold">{book.author}</span>
                        </h1>
                        <h1 className="mb-4">
                            price:{" "}
                            <span className="font-semibold">${book.price}</span>
                        </h1>
                        {/* edit button */}
                        <button
                            className="p-2 mb-3 transition-all duration-300 border-2 border-purple-400 rounded-md hover:translate-x-2 hover:bg-white hover:text-slate-950 hover:border-teal-950 hover:font-bold"
                            onClick={() => {
                                editHandler(book._id);
                            }}
                        >
                            Edit
                        </button>
                        {/* delete button */}
                        <button
                            className="p-2 mb-3 transition-all duration-300 border-2 border-purple-400 rounded-md hover:translate-x-2 hover:bg-white hover:text-slate-950 hover:border-teal-950 hover:font-bold"
                            onClick={() => {
                                deleteHandler(book._id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}

                {isVisible && (
                    <div className="mt-20 m-auto w-64 shadow-md shadow-[#0C134F] p-4 rounded-md">
                        {/* title field */}
                        <input
                            type="text"
                            placeholder="title"
                            name="title"
                            value={dataToBeUpdated.title}
                            onChange={changeHandler}
                            className="p-3 mb-5 border-b-2 focus:outline-none border-b-slate-900"
                        />
                        {/* description field */}
                        <input
                            type="text"
                            placeholder="description"
                            name="description"
                            value={dataToBeUpdated.description}
                            onChange={changeHandler}
                            className="p-3 mb-5 border-b-2 focus:outline-none border-b-slate-900"
                        />
                        {/* author field */}
                        <input
                            type="text"
                            placeholder="author"
                            name="author"
                            value={dataToBeUpdated.author}
                            onChange={changeHandler}
                            className="p-3 mb-5 border-b-2 focus:outline-none border-b-slate-900"
                        />
                        {/* price field*/}
                        <input
                            type="number"
                            placeholder="price"
                            name="price"
                            value={dataToBeUpdated.price}
                            onChange={changeHandler}
                            className="p-3 mb-5 border-b-2 focus:outline-none border-b-slate-900"
                        />
                        {/* book image url field */}
                        <input
                            type="text"
                            placeholder="bookImageUrl"
                            name="bookImageUrl"
                            value={dataToBeUpdated.bookImageUrl}
                            onChange={changeHandler}
                            className="p-3 mb-5 border-b-2 focus:outline-none border-b-slate-900"
                        />
                        <button
                            className="border border-teal-950"
                            onClick={() => {
                                confirmedEditHandler(id);
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EachBook;
