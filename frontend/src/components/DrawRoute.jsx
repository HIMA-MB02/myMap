/******************************************
*	Name : DrawRoute  
*	Parent : ViewRoutes.jsx
*	Children: -
*	Description : This component is responsible to trace the path of the track
*******************************************/
import React, { useEffect, useState, useRef, createRef } from 'react';
import { Map, Marker, TileLayer, FeatureGroup } from 'react-leaflet'
import L from 'leaflet'
import { routeData } from '../resources/routeData'
import { deleteRoute } from '../api/api'
import { useHistory } from "react-router-dom"
import { ROUTES } from "../resources/constants"

export const drawIcon = new L.icon({
	iconUrl: process.env.PUBLIC_URL + '/images/circle.png',
	iconSize: [10, 10],
	iconAnchor: [5, 5],
});

const DrawRoute = ({ indexValue, track }) => {
	const history = useHistory();
	const myMapRef = useRef(null);
	let myGrpRef = createRef();
	const [routes, setRoutes] = useState([])
	
	useEffect(() => {
		setRoutes(track.trck)
	}, [])
	useEffect(() => {
		if (myMapRef.current && myGrpRef.current) {
			let map = myMapRef.current.leafletElement
			const layer = myGrpRef.current.leafletElement
			map.fitBounds(layer.getBounds())
		}
	}, [myGrpRef])

	const deleteRouteFunction = () => {
		deleteRoute(track._id).then(res => {
			if(res.status === 200) {
				alert('Data deleted successfully')
				history.push(ROUTES.CREATEROUTE)
			} else {
				alert('Something went wrong, please try again')
			}
		})
	}

	return (
		<div className="container draw-container">
			<div className="row">
				<div className="col-md-4 text-center draw-map-indice">
					<h1>{indexValue}</h1>
					<button onClick={deleteRouteFunction} className="btn btn-danger btn-lg btn-block">
						DELETE
					</button>
				</div>
				<div className="col-md-8">
					<Map center={[routeData[0][1], routeData[0][0]]} zoom={16} ref={myMapRef} on>
						<FeatureGroup ref={myGrpRef}>
							{
								routes.map((route, i) => (
									<Marker position={[route[0], route[1]]} key={`markers-${i}`} icon={drawIcon}></Marker>
								))
							}
						</FeatureGroup>
						<TileLayer
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						/>
					</Map>
				</div>
			</div>
		</div>
	);
};

export default DrawRoute;