import React, {useEffect} from 'react'
import * as mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import './StoresOnMap.css'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
const API = process.env.REACT_APP_BACKEND_API

mapboxgl.accessToken = 'pk.eyJ1IjoicGF3YW4wODQzIiwiYSI6ImNreGVidnc3czBtaGsyeG40ajJheTV1dWkifQ.OCVhPoYlR_ERVoLRpY4rGw';

const StoresOnMap = () => {

    useEffect(() => {

        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v11",
            zoom: 11,
            center: [ 75.37375265476298, 19.874645788657418]
        });

        const getStores = async () => {

            const res = await fetch(`${API}/stores`);

            const data = await res.json();
            
            if (data.stores) {
                const stores = data.stores.map(store => {
                    return {
                      type: 'Feature',
                      geometry: {
                        type: 'Point',
                        coordinates: [
                          store.location.coordinates[0],
                          store.location.coordinates[1]
                        ]
                      },
                      properties: {
                        storeId: store.storeId,
                        icon: 'shop'
                      }
                    };
                  });
                loadMap(stores);
            }  
        }

        getStores();

        function loadMap(stores) {
            map.on('load', () => {
                // Add a layer to use the image to represent the data.
                map.addLayer({
                    id: 'points',
                    type: 'symbol',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: stores
                        }
                    }, // reference the data source
                    layout: {
                        'icon-image': '{icon}-15',
                        'icon-size': 1.5,
                        'text-field': '{storeId}',
                        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                        'text-offset': [0, 0.9],
                        'text-anchor': 'top'
                    }
                });
            });
        }

        

    }, []);

    return (
        <>
            <Navbar/>
            <div className='mapbody'>
                <div id="map"></div>
            </div>
            <Footer/>
        </>
        
    )
}

export default StoresOnMap
