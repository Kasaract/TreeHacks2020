import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			{/* <Route exact path="/TreeHacks2020/" component={Home} />
			<Route exact path="/TreeHacks2020/login" component={Home} /> */}
			<Route exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/settings" component={Settings} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
