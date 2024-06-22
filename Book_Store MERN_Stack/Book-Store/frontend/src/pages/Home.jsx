import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable.jsx";
import BooksCards from "../components/home/BooksCards.jsx";
const Home = () => {
	const [loading, setLoading] = useState(false);
	const [books, setBooks] = useState([]);
	const [toShow, setToShow] = useState("table");
	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:5000/books")
			.then((res) => {
				setBooks(res.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<>
			<div className="p-4">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl my-8">Books List</h1>
					<div className="flex justify-center gap-x-4">
						<button
							onClick={() => setToShow("table")}
							className="bg-sky-400 rounded-md px-2"
						>
							Table
						</button>
						<button
							onClick={() => setToShow("cards")}
							className="bg-sky-400 rounded-md px-2"
						>
							Cards
						</button>
					</div>
					<Link to="/books/create">
						<MdOutlineAddBox className="text-sky-800 text-4xl" />
					</Link>
				</div>
				<div>
					{loading ? (
						<Spinner />
					) : toShow === "table" ? (
						<BooksTable books={books} />
					) : (
						<BooksCards books={books} />
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
