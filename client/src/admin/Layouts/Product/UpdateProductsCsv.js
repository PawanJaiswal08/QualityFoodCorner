import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSideBar from "./../../components/AdminSideBar/AdminSideBar";

const API = process.env.REACT_APP_BACKEND_API;

const CsvLayout = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState({});

	const handleFile = (name) => (event) => {
		// console.log(event.target.files[0]);
		setValues({ ...values, [name]: event.target.files[0] });
	};

	const updateProductsData = async (file) => {
		try {
		console.log(file.productsCsv, "productsCsv");

		let formData = new FormData();

		formData.append("name", file.productsCsv.name);
		formData.append("productsCsv", file.productsCsv);

		const response = await axios.post(`${API}/csv`, formData, {
			method: "POST",
			headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			},
		});

		if (response) {
			return response;
		}
		} catch (error) {
		console.log(error.response);
		return error.response;
		}
	};

	const onSubmit = async (event) => {
		try {
		event.preventDefault();

		setValues({ ...values });

		const response = await updateProductsData({
			...values,
		});

		console.log(response);

		navigate("/");
		} catch (error) {
		console.log("Error in updating data ...");
		}
	};

	return (
		<>
		<div
			className="ProductsCSV"
			style={{
			overflow: "hidden",
			display: "flex",
			backgroundColor: "var(--lightblack)",
			}}
		>
			<AdminSideBar />
			<div className="w-100 py-5">
			<h2 className="" style={{ color: "white", textAlign: "center" }}>
				Upload a CSV file
			</h2>
			<form className="py-5 w-50" style={{alignItems: "center", margin: "0 auto" }}>
				<div className="form-group">
				<input
					type="file"
					className="form-control-file feedback-input"
					onChange={handleFile("productsCsv")}
					placeholder="CSV file"
					accept=".csv"
				/>
				</div>
				<button type="submit" onClick={onSubmit}>
				Submit
				</button>
			</form>
			</div>
		</div>
		</>
	);
};

export default CsvLayout;