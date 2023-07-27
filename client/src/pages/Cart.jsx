/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { deleteFromCart, increaseCount } from "../store/cartSlice";

const Cart = () => {
	const navigate = useNavigate();
	const cartItems = useSelector((state) => state.cartReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		const localStorageToken = localStorage.getItem("token");
		if (localStorageToken === null) navigate("/");

		return () => {};
	}, [navigate]);

	// deleteHandler function
	const deleteHandler = (bookId) => {
		dispatch(deleteFromCart(bookId));
	};

	// increaseCountHandler function
	const increaseCountHandler = (bookId) => {
		dispatch(increaseCount(bookId));
	};

	return (
		<div>
			<Navbar />
			<div>
				{cartItems.length === 0 && (
					<>
						{
							/* TODO: Empty Cart Design */
							<div className="grid w-1/2 grid-cols-1 m-auto mt-40 sm:grid-cols-2">
								<img
									src="https://media.tenor.com/c65rJ5VmUFYAAAAM/love-you-baby.gif"
									alt="crying baby"
								/>
								<h2 className="font-semibold shadow-md shadow-[#0C134F] text-center flex items-center p-2 rounded-md text-2xl sm:text-xl">
									Your Cart is Empty, Please add something
									from the home page
								</h2>
							</div>
						}
					</>
				)}
			</div>

			{/* TODO: table section with all cart items will appear here */}

			{cartItems.length > 0 && (
				<div className="container hidden mx-auto lg:inline">
					<table className="min-w-full bg-white border border-gray-300">
						<thead>
							<tr>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Image
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Title
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Author
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Description
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Price
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Quantity
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Total Price
								</th>
								<th className="px-6 py-3 text-sm font-semibold text-gray-600 uppercase bg-gray-200 border-b border-gray-300">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{cartItems.map((book) => (
								<tr key={book.id}>
									<td className="px-6 py-4 border-b border-gray-300">
										<img
											src={book.bookImageUrl}
											alt="Book Image"
											className="w-20 rounded"
										/>
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.title}
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.author}
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.description}
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.price}
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.quantity}
									</td>
									<td className="px-6 py-4 border-b border-gray-300">
										{book.quantity * book.price}
									</td>
									<td className="flex flex-row px-6 py-4 border-b border-gray-300">
										<button
											className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
											onClick={() => {
												increaseCountHandler(book.id);
											}}
										>
											Add
										</button>
										<button
											className="px-4 py-2 ml-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
											onClick={() => {
												deleteHandler(book.id);
											}}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}

			{/* TODO: grid section with all cart items for mobile version */}

			<div className="grid grid-cols-1 gap-5 m-auto sm:grid-cols-2 lg:hidden">
				{/* TODO: show all cart items section */}
				{cartItems.length > 0 &&
					cartItems.map((item) => (
						<div
							key={item.id}
							className="shadow-md shadow-[#0C134F] p-4 rounded-md w-72 m-auto hover:bg-slate-800 hover:text-white"
						>
							{/* FIXME: tbale section will appear here */}
							<div>
								<img src={item.bookImageUrl} alt="book image" />
								<h1>
									title:{" "}
									<span className="font-semibold">
										{item.title}
									</span>
								</h1>
								<hr className="mb-3" />
								<h2 className="mb-2">
									author:{" "}
									<span className="font-semibold">
										{item.author}
									</span>
								</h2>
								<h1 className="mb-2">
									description:{" "}
									<span className="font-semibold">
										{item.description}
									</span>
								</h1>
								<h1 className="mb-2">
									price:{" "}
									<span className="font-semibold">
										${item.price}
									</span>
								</h1>
								<div className="flex justify-between">
									<button
										className="p-2 transition-all duration-300 border border-black rounded-md hover:translate-x-2 hover:border-white hover:font-bold"
										onClick={() => {
											increaseCountHandler(item.id);
										}}
									>
										Add
									</button>
									<span className="p-2 font-semibold bg-red-400 rounded-lg">
										quantity: {item.quantity}
									</span>
									<button
										className="p-2 transition-all duration-300 border border-black rounded-md hover:translate-x-2 hover:border-white hover:font-bold"
										onClick={() => {
											deleteHandler(item.id);
										}}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
			</div>

			{/* TODO: total price section */}
			{cartItems.length > 0 && (
				<div className="flex items-center justify-center gap-3 p-2 m-auto mt-10 mb-2 w-96">
					<h1 className="p-2 mb-3 rounded-lg w-44 bg-emerald-500">
						total price:{" "}
						<span className="font-semibold">
							$
							{cartItems.reduce((acc, item) => {
								return acc + item.price * item.quantity;
							}, 0)}
						</span>
					</h1>
					<NavLink to="/payment">
						<button className="w-24 p-2 transition-all duration-300 border border-black rounded-lg hover:bg-violet-500 hover:font-semibold hover:text-white hover:translate-x-2">
							Pay
						</button>
					</NavLink>
				</div>
			)}
		</div>
	);
};

export default Cart;
