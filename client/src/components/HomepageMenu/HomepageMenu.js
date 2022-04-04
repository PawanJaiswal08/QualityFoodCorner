import React from "react";
import { NavLink } from "react-router-dom";
import "./HomepageMenu.css";

const HomepageMenu = () => {
	let menus = [
		{
			name: "Pizza",
			url: "pizza",
			img: "https://st.depositphotos.com/1900347/4146/i/600/depositphotos_41466555-stock-photo-image-of-slice-of-pizza.jpg",
		},
		{
			name: "Burger",
			url: "burger",
			img: "https://orderserv-kfc-assets.yum.com/15895bb59f7b4bb588ee933f8cd5344a/images/categories/CAT99.jpg?ver=4.79",
		},
		{
			name: "Chinese",
			url: "chinese",
			img: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/02/07/15/chinese.jpg?width=1200",
		},
		{
			name: "South Indian",
			url: "south indian",
			img: "https://www.culturalindia.net/iliimages/South%20Indian%20Food_1.jpg",
		},
		{
			name: "Meal",
			url: "indian main course",
			img: "https://thumbs.dreamstime.com/b/collection-take-away-foil-boxes-healthy-food-set-containers-meals-top-view-free-copy-space-164637874.jpg",
		},
		
		{
			name: "beverages",
			url: "beverages",
			img: "https://static.businessworld.in/article/article_extra_large_image/1568619105_c4kY7g_F_b.jpg",
		},
		{
			name: "All Menu",
			url: "all",
			img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOu45kprVVZx7Cdcg7ur__5XSU73W-YCu6ng&usqp=CAU",
		},
	];

  return (
		<div className="caaards">
			<div className="headline">Food Categories :</div>

			<div className="container">
					{menus.map((menu, i) => (
						<div key={i} className="card-outer">
							<NavLink to={`/menu/${menu.url}`} className="custom-card">
								<div className="mycard h-100">
									<div className="inner">
										<img src={menu.img} className="card-img-top" style={{ height: "170px" }} alt="{menu.name}" />
									</div>
									<div className="card-body text-center">
										<h5 className="card-title">{menu.name}</h5>
									</div>
								</div>
							</NavLink>
						</div>
					))}
			</div>
		</div>
  );
};

export default HomepageMenu;
