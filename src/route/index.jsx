import React from 'react'
import { 
  Redirect, 
  Switch, 
  Route 
} from 'react-router-dom'

import Map from '../pages/monitoring/map'
import Error from '../pages/monitoring/error'

export default class Routes extends React.Component {
	render() {
		return (
			<Switch>
		    <Route exact path="/app/monitoring/map" component={Map}/>
		    <Route exact path="/app/monitoring/error" component={Error} params={{name: '站点信息'}}/>
		    <Route exact path="/app/monitoring/stationInfo" render={()=><h1>站点信息</h1>}/>
		    <Route exact path="/app/monitoring/videoWatch" render={()=><h1>视频监控</h1>}/>
		    <Route exact path="/app/monitoring/statistics" render={()=><h1>统计报表</h1>}/>
		    <Route exact path="/app/monitoring/instantWatch" render={()=><h1>实时监测</h1>}/>
		    <Redirect from="/app" to="/app/monitoring/map"/>
		  </Switch>
		)
	}
}