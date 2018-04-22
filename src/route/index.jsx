import React from 'react'
import { 
  Redirect, 
  Switch, 
  Route 
} from 'react-router-dom'

import Index from '../pages/index/'
import Map from '../pages/monitoring/map/'
import Error from '../pages/monitoring/error/'
import Run from '../pages/monitoring/run/'
import Statistics from '../pages/monitoring/statistics/'
import Cost from '../pages/expense/cost'
import Repository from '../pages/service/repository/';
import Faq from '../pages/service/faq/';

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/app/index" component={Index}/>
		    <Route exact path="/app/monitoring/map" component={Map}/>
		    <Route exact path="/app/monitoring/error" component={Error} data={{name: '站点信息'}}/>
		    <Route exact path="/app/monitoring/run" component={Run}/>
		    <Route exact path="/app/monitoring/videoWatch" render={()=><h1>视频监控</h1>}/>
		    <Route exact path="/app/monitoring/statistics" component={Statistics}/>
		    <Route exact path="/app/monitoring/instantWatch" render={()=><h1>实时监测</h1>}/>
				<Route exact path="/app/expense/cost" component={Cost}/>
				<Route exact path="/app/service/faqs" component={Faq}/>
				<Route path="/app/service/respository" component={Repository}/>
				
		    <Redirect from="/app" to="/app/index"/>
		  </Switch>
		)
	}
}