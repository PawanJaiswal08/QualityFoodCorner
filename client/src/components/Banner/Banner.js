import React from "react";
import "./Banner.css";
import { arrayBufferToBase64 } from "../../assets/BufferToBase64";
import { useSelector } from "react-redux";

const Banner = () => {

	const banner = useSelector((state) => state.banner.banner);

	const { title, sinceYear, description, bannerImage } = banner
	
	var img, binarystring;

	if(bannerImage !== undefined){
		binarystring = arrayBufferToBase64(bannerImage.data.data)
		img = `data:image/jpeg;base64, ${binarystring}`;
	}

  	return (
		<div className="backgroundColor">
			{
				banner 	&&	<header id="header" className="header">
					<div className="header-content">
						{/* <img src="https://quality-food-corner.s3.ap-south-1.amazonaws.com/8ad730907f079419c79000df298e9214" alt="" /> */}
						<div className="container" style={{margin:"auto"}}>
							<div className="row" style={{margin:0}}>
								<div className="col-lg-6 col-xl-5">
									<div className="text-container">
										<h1>{title}</h1>
										<p className="p-large">{sinceYear}</p>
										<p className="p-large-long ">{description}</p>
									</div>
								</div>
								<div className="col-lg-6 col-xl-7">
									<div className="image-container">
										<div className="img-wrapper">
											<img className="img-fluid" src={img} alt="alternative" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
			}
		</div>
  	);
};

export default Banner;