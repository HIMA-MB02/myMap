import React from 'react';
import CreateRoute from './components/CreateRoute'
import ViewRoutes from './components/ViewRoutes'
import { Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom'
import { ROUTES } from './resources/constants'
import './App.css';

function App() {
	return (
		<Router>
			<div className="container-fluid">
				<div className="row app-container">
					<div className="col-md-3 nav-style">
						<Link to={ROUTES.CREATEROUTE} className="btn btn-primary btn-lg btn-block">Create Route</Link> <br />
						<Link to={ROUTES.VIEWROUTES} className="btn btn-primary btn-lg btn-block">View Route</Link>
					</div>
					<div className="col-md-9">
						<Switch>
							<Route exact path={ROUTES.HOME} component={CreateRoute} />
							<Route exact path={ROUTES.CREATEROUTE} component={CreateRoute} />
							<Route path={ROUTES.VIEWROUTES} component={ViewRoutes} />
						</Switch>
					</div>
				</div>
			</div>

		</Router>
	);
}

export default App;
