import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/base/login';
import App from './pages/base/app'

export default () => (
    <Router>
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" push />} />     
            <Route path="/login" component={Login} />   
            <Route path="/app" component={App} />
        </Switch>
    </Router>
)