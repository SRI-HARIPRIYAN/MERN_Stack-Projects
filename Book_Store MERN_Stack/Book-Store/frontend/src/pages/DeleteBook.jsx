import React, { useState } from "react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const DeleteBook = () => {
	const [loadin, setLoading] = useState(false);
	const { id } = useParams();
	const navigate = useNavigate();
	const handleDelete = () => {
		setLoading(true);
		axios
			.delete(`http://localhost:5000/books/${id}`)
			.then((res) => {
				setLoading(false);
				navigate("/");
				console.log(res.data.message);
			})
			.catch((error) => {
				setLoading(false);
				alert("Error: Please check console");
				console.log(error);
			});
	};
	return (
		<div className="p-4">
			<h1 className="text-3xl">Delete book</h1>
			<div className=" text-xl p-4 flex flex-col border-2 border-gray-600 w-72 m-auto ">
				<h1 className="w-full text-center">
					Are you sure to want to delete?
				</h1>
				<button className=" bg-red-400 m-4 r" onClick={handleDelete}>
					Yes
				</button>
			</div>
		</div>
	);
};

export default DeleteBook;
