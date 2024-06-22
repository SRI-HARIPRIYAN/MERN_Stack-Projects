import express from "express";
import { MONDO_DB_URI, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js";
import cors from "cors";
const app = express();
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type"],
	})
);
app.use(express.json());
app.get("/", (req, res) => {
	res.send("hello world");
});
app.use("/books", booksRoute);
mongoose
	.connect(MONDO_DB_URI)
	.then(() => {
		console.log("mongo_DB connected");
		app.listen(PORT, () => console.log("server running at " + PORT));
	})
	.catch(() => {
		console.log("error in mongo db connection");
	});
