import React, { useState, useEffect } from "react";
import "./Menu.css";
import Navbar from "./../../components/Navbar/Navbar";
import Footer from "./../../components/Footer/Footer";
import Product from "./../../components/Product/Product";
import Error404 from "./../../components/Error404/Error404";
import Loading from "../../components/Loading/Loading";
import ReactPaginate from "react-paginate";
import axios from "axios";
import _ from 'lodash';
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "./../../service/actions/actions";
const API = process.env.REACT_APP_BACKEND_API;

function Items({ currentItems }) {
	return (
		<>
			{
				currentItems && currentItems.map(function (product, i) {
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

const Menu = () => {
	
	const params = useParams();

	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.products)
	const isLoading = useSelector((state) => state.products.isLoading)
	
	const getData = async () => {
		
		try {

			const response = await axios.get(`${API}/products`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			if (response.data.products) {
				dispatch(setProducts(response.data.products))
			}

		} catch (error) {
			return console.log(error);
		}
	};

	useEffect(() => {

		getData();
		
  	});

	// Pagination
	const [currentItems, setCurrentItems] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 6;

	useEffect(() => {

		const setData = () => {

			const endOffset = itemOffset + itemsPerPage;

			if (params.category === 'all') {
				setCurrentItems(products.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(products.length / itemsPerPage));
			}else{
				setCurrentItems([])
				let filteredProducts = _.filter(products, { 'category': { 'name' : params.category } })
				setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
				setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
			}
		}
		
		setData()
	
	}, [itemOffset, itemsPerPage, products, params]);

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % products.length;
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
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Q.F.C
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/burger"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Burger
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/pizza"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Pizza
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/south indian"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						South Indian
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/chinese"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Chinese
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/indian main course"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Indian Main Course
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/indian breads"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Indian Breads
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/desserts"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Desserts
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/beverages"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Beverages
						</NavLink>
					</li>
					<li>
						<NavLink
						to="/menu/speaciality tea"
						onClick={() => {
							// setLoading(true);
							setItemOffset(0);
						}}
						>
						Speaciality Tea
						</NavLink>
					</li>
					</ul>
				</nav>
				</div>

				<div className="row prod-row" style={{ backgroundColor: "var(--lightblack)" }}>
					{
						isLoading 	? 	(<Loading />) 	
									: 	!products.error && products.length !== 0 ? (
											<>
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
									) 	: 	(<Error404 />)
					}
				</div>
			</div>

			<Footer />
		</>
	);
};

export default Menu;
