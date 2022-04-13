import React from "react";
import "./Carousal.css";
import Carousel from "react-elastic-carousel";
import { useSelector } from "react-redux";

const Carousal = () => {
	
	const offers = useSelector((state) => state.offers.offers);

	const breakPoints = [
		{ width: 1, itemsToShow: 1 },
		{ width: 768, itemsToShow: 2 },
		{ width: 1200, itemsToShow: 3 },
	];

	const carouselAttributes = {
		breakPoints:breakPoints,
		disableArrowsOnEnd:true, 
		pagination:true, 
		showArrows:true, 
		enableAutoPlay:true,
		autoPlaySpeed:6000, 
		enableSwipe:false
	}
		
  	return (
		<div className="bodyy">
			<div className="py-4">
				<h2 className="text-center text-uppercase pb-4" style={{color:"var(--darkyellow)"}}>Deals of the day</h2>
				<div className="carousel">
				<Carousel {...carouselAttributes}>
						{
							offers && offers.map( function(offer, i){

								const { name, feature, isActive, offerImage } = offer;

								return 	isActive 	? 	<div key={i}>
															<div className="p-3 m-2 rounded border carousalDiv">
																<div>
																	<div>
																		<img src={offerImage} alt="offerImg" style={{ width: "350px", height: "150px", padding: "10px", borderRadius: "6px", }} />
																	</div>
																	<div className="pl-3">
																		<h5 className="text-center heading py-2">{name}</h5>
																		<ul className="pl-3 lists ">
																			<li>{feature[0]}</li>
																			<li>{feature[1]}</li>
																			<li>{feature[2]}</li>
																		</ul>
																	</div>
																</div>
															</div>
														</div> 
													: 	null
								
							})
						}
					</Carousel>
				</div>
			</div>
		</div>
	);
};

export default Carousal;