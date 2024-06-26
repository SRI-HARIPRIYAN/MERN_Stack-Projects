import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton.jsx";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { useNavigate, useParams } from "react-router-dom";
const EditBook = () => {
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5000/books/${id}`)
			.then((res) => {
				setTitle(res.data.title);
				setAuthor(res.data.author);
				setPublishYear(res.data.publishYear);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				alert("Unexpected error please check console");
				console.log(error);
			});
	}, []);
	const handleEditBook = () => {
		const data = {
			title,
			author,
			publishYear,
		};
		axios
			.put(`http://localhost:5000/books/${id}`, data)
			.then(() => {
				setLoading(false);
				navigate("/");
			})
			.catch((error) => {
				setLoading(false);
				alert("An error occured. Please check console");
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{loading ? (
				<Spinner />
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
					<div className="my-4">
						<label
							htmlFor="title"
							className="text-xl mr-4 text-gray-500"
						>
							Title
						</label>
						<input
							type="text"
							name="title"
							id="title"
							className="border-2 border-gray-500 px-4 py-2 w-full"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="my-4">
						<label
							htmlFor="author"
							className="text-xl mr-4 text-gray-500"
						>
							Author
						</label>
						<input
							type="text"
							name="author"
							id="author"
							className="border-2 border-gray-500 px-4 py-2 w-full"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
						/>
					</div>
					<div className="my-4">
						<label
							htmlFor="publishYear"
							className="text-xl mr-4 text-gray-500"
						>
							Publish Year
						</label>
						<input
							type="text"
							name="publishYear"
							id="publishYear"
							className="border-2 border-gray-500 px-4 py-2 w-full"
							value={publishYear}
							onChange={(e) => setPublishYear(e.target.value)}
						/>
						<div
							className="p-2 bg-sky-300 m-8 text-center"
							onClick={handleEditBook}
						>
							Save
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditBook;
