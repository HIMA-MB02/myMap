/******************************************
*	Name : ViewRoutes  
*	Parent : App.jsx
*	Children: DrawRoute.jsx
*	Description : This components get's the list of all routes from backend, and maps it to DrawRoute.jsc
*******************************************/
import React, { useEffect, useState } from 'react';
import { getListOfRoutes } from '../api/api'
import DrawRoute from './DrawRoute'
import { useHistory } from "react-router-dom"
import { ROUTES } from "../resources/constants"

const ViewRoutes = () => {
	const history = useHistory();
	const [differentRoutes, setDifferentRoutes] = useState([])
	const [displayNone, setDisplay] = useState('d-none')
	useEffect(() => {
		getListOfRoutes().then(res => {
			if (res.status === 200) {
				setDifferentRoutes(res.data.routes)
				if(res.data.routes.length <= 0) {
					setDisplay('')
				}
			} else {
				alert('Something went wrong!')
				history.push(ROUTES.CREATEROUTE)
			}
		})
	}, [])

	return (
		<div className="container">
			<div className={`row view-container ${displayNone}`}>
				<div className="col-md-12 text-danger text-center">
					<h3>Please add a route first.</h3>
				</div>
			</div>
			{
				differentRoutes.map((routes, i) => (
					<div className="row" key={i}>
						<div className="col-md-12">
							<DrawRoute indexValue={i + 1} track={routes} />
						</div>
					</div>
				))
			}
		</div >
	);
};

export default ViewRoutes;