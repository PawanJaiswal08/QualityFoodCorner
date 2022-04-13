import React, { useEffect } from "react";
import AdminSideBar from "./../../components/AdminSideBar/AdminSideBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./../../../service/actions/actions";
import "./ListProductsCSV.css"
const API = process.env.REACT_APP_BACKEND_API;

const ListProductsCSV = () => {
	const param = useParams();
	const { limit } = param;

	const dispatch = useDispatch();

	// const isLoading = useSelector((state) => state.products.isLoading);
	const products = useSelector((state) => {
		return state.products.products.slice(0, limit);
	});

	const getAllProducts = async () => {
		try {
		const response = await axios.get(`${API}/products?limit=${limit}`, {
			headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			},
		});

		if (response.data) {
			dispatch(setProducts(response.data.products));
		}
		} catch (error) {
		return console.log(error);
		}
	};

	useEffect(() => {
		getAllProducts();
	}, [limit]); // eslint-disable-line react-hooks/exhaustive-deps

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
			<div className="w-100 p-5">
			<table className="wp-table" style={{width: "100%"}}>
				<tr className="CSVHeading" style={{textAlign : "start"}}>
				<th className="py-4">NAME</th>
				<th className="py-4">ID</th>
				<th className="py-4">STOCK</th>
				<th className="py-4">PRICE</th>
				</tr>
				{products &&
				products.map((item) => {
					return ( 
					<tr className="CSVlist" style={{textAlign : "start"}}>
						<th className="py-3">{item.name}</th>
						<th className="py-3">{item._id}</th>
						<th className="py-3">{item.stock}</th>
						<th className="py-3">{item.price}</th>
					</tr>
					);
				})}

			</table>
			</div>
		</div>
		</>
	);
};

export default ListProductsCSV;
