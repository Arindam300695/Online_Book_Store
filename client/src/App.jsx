import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./pages/Cart";
import EachBook from "./pages/EachBook";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddBook from "./pages/AddBook";
import Payment from "./pages/Payment";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/book/:id" element={<EachBook />} />
				<Route path="/addBook" element={<AddBook />} />
				<Route path="/payment" element={<Payment />} />
			</Routes>
		</>
	);
}

export default App;
