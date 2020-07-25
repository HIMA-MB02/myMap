import React, { useEffect, useState, useRef } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { routeData } from '../resources/routeData'
import { sendGeneratedRoute } from '../api/api'

export const myIcon = new L.icon({
	iconUrl: process.env.PUBLIC_URL + '/images/circle.png',
	iconSize: [40, 40],
	iconAnchor: [20, 20],
});

const CreateRoute = () => {

	const myMapRef = useRef(null);
	const [mapPosition, setMapPosition] = useState([0, 0])
	const [mapZoom, setMapZoom] = useState(18)
	const [markerPosition, setMarkerPosition] = useState([0, 0])
	const [updateIntervalRef, setUpdateIntervalRef] = useState({})
	const [counter, setCounter] = useState(0)
	const [markerPath, setMarkerPath] = useState([])

	useEffect(() => {
		initialState();
	}, [])
	useEffect(() => {
		if (counter === routeData.length - 1) {
			stopRoute();
			let choice = window.confirm('You have reached the destination, do you want to save this track?')
			if(choice) {
				generateRoute();
			}
		}
	}, [counter])

	const initialState = () => {
		setMapPosition([routeData[0][1], routeData[0][0]])
		setMarkerPosition([routeData[0][1], routeData[0][0]])
		setMarkerPath([])
	}
	const updateCarLocation = () => {
		var newLocation;
		setCounter(prevState => {
			newLocation = [routeData[prevState][1], routeData[prevState][0]];
			return prevState + 1
		})
		setMapPosition(newLocation)
		setMarkerPosition(newLocation)
		setMarkerPath(oldPath => [...oldPath, newLocation])
	}

	const startRoute = () => {
		let updateInterval = setInterval(updateCarLocation, 800)
		setUpdateIntervalRef(updateInterval)
	}

	const stopRoute = () => {
		clearInterval(updateIntervalRef);
	}

	const resetRoute = () => {
		setCounter(0);
		initialState();
		stopRoute();
	}

	const generateRoute = () => {
		if(markerPath.length <= 0) {
			alert('Please start the journey first!')
		} else {
			sendGeneratedRoute(markerPath).then(res => {
				if(res.status === 200) {
					alert(res.data.message)
					resetRoute();
				} else {
					alert('Something went wrong!')
					console.log(res)
				}
			})
		}
	}
	const onMapChange = (viewport) => {
		setMapZoom(viewport.zoom)
	}
	return (
		<div className="map-container">
			<div className="container">
				<div className="row text-center">
					<h3>BANER TO CHINCHWAD</h3>
				</div>
			</div>
			<Map center={mapPosition} zoom={mapZoom} ref={myMapRef} onViewportChanged={onMapChange}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
				/>
				<Marker position={markerPosition} icon={myIcon}></Marker>
			</Map>
			<br />
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6">
						<button onClick={stopRoute} className="btn btn-danger btn-lg btn-block">
							STOP
						</button>
					</div>
					<div className="col-md-6">
						<button onClick={startRoute} className="btn btn-success btn-lg btn-block">
							START
						</button>
					</div>
				</div>
				<br />
				<div className="row">
					<div className="col-md-6">
						<button onClick={resetRoute} className="btn btn-primary btn-lg btn-block">
							RESET ROUTE
						</button>
					</div>
					<div className="col-md-6">
						<button onClick={generateRoute} className="btn btn-primary btn-lg btn-block">
							GENERATE ROUTE
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateRoute;