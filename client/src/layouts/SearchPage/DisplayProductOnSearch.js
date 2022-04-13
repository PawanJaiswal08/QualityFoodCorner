import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
// import { getProductByName } from "../../admin/Helper/Product";
import Navbar from "./../../components/Navbar/Navbar";
import Product from "./../../components/Product/Product";
import Error404 from "./../../components/Error404/Error404";
import Loading from "../../components/Loading/Loading";
import "./../MenuPage/Menu.css";
import ReactPaginate from "react-paginate";
const API = process.env.REACT_APP_BACKEND_API;

function Items({ currentItems }) {
  return (
    <>
		{currentItems &&
			currentItems.map(function (product, i) {
			const productProps = {
				_id: product._id,
				name: product.name,
				description: product.description,
				price: product.price,
				sold: product.sold,
				stock: product.stock,
				photo: product.photo,
				photoUrl: product.photoUrl,
			};

			return <Product key={i} {...productProps} />;
			})
		}
    </>
  );
}

const DisplayProductOnSearch = () => {
	let params = useParams();

	const { productName } = params;

	const [data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const getProductproduct = async () => {
		try {
			const response = await axios.get(
			`${API}/product/search/${productName}`,
			{
				headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				},
			}
			);

			//   console.log(response.data.error);
			if (response && !response.data.error) {
			var datanow = response.data;
			!datanow.error ? setData(datanow) : setData([]);
			setLoading(false);
			}

			if (response.data.error) {
			setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
		};

		getProductproduct();
	}, [productName]);

	// Pagination
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 6;

	useEffect(() => {
		// Fetch items from another resources.
		const endOffset = itemOffset + itemsPerPage;
		console.log(data);
		// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
		setCurrentItems(data.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(data.length / itemsPerPage));
	}, [itemOffset, itemsPerPage, data]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % data.length;
		setItemOffset(newOffset);
	};

	const reactPaginateProps = {
		breakClassName:"page-item",
		breakLinkClassName:"page-link",
		containerClassName:"pagination",
		pageClassName:"page-item",
		pageLinkClassName:"page-link",
		previousClassName:"page-item",
		previousLinkClassName:"page-link",
		nextClassName:"page-item",
		nextLinkClassName:"page-link",
		activeClassName:"active",
	}

	return (
		<>
			<Navbar />
			<div className="menubody" style={{ display: "flex" }}>
				<div className="sidebar">
					<nav className="navv">
						<ul>
						<li>
							<NavLink
							to="/"
							className="sidebar-heading"
							onClick={() => {
								setLoading(true);
							}}
							>
							Q.F.C
							</NavLink>
						</li>
						<li>
							<NavLink
							to="/menu/south indian"
							onClick={() => {
								setLoading(true);
							}}
							>
							South Indian
							</NavLink>
						</li>
						<li>
							<NavLink
							to="/menu/indian main course"
							onClick={() => {
								setLoading(true);
							}}
							>
							Indian Main Course
							</NavLink>
						</li>
						<li>
							<NavLink
							to="/menu/indian breads"
							onClick={() => {
								setLoading(true);
							}}
							>
							Indian Breads
							</NavLink>
						</li>
						<li>
							<NavLink
							to="/menu/desserts"
							onClick={() => {
								setLoading(true);
							}}
							>
							Desserts
							</NavLink>
						</li>
						<li>
							<NavLink
							to="/menu/beverages"
							onClick={() => {
								setLoading(true);
							}}
							>
							Beverages
							</NavLink>
						</li>
						</ul>
					</nav>
				</div>
				<div className="row prod-row" style={{ backgroundColor: "var(--lightblack)" }}>
				{
					isLoading 	? 	(<Loading />) 
								: 	!data.error && data.length !== 0 	? 	<>
																				<Items currentItems={currentItems} />
																				<ReactPaginate
																					{...reactPaginateProps}
																					breakLabel="..."
																					nextLabel="Next >"
																					onPageChange={handlePageClick}
																					pageRangeDisplayed={5}
																					pageCount={pageCount}
																					previousLabel="< Previous"
																					renderOnZeroPageCount={null}
																					
																				/>
																			</>
																		: 	(<Error404 />)
				}
				</div>
			</div>
		</>
	);
};

export default DisplayProductOnSearch;
