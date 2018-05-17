import React from 'react'
import { 
  Redirect, 
  Switch, 
  Route 
} from 'react-router-dom'

import Index from '@/pages/index/'
import Map from '@/pages/monitoring/map/'
import Error from '@/pages/monitoring/error/'
import Run from '@/pages/monitoring/run/'
import Statistics from '@/pages/monitoring/statistics/'
import Cost from '@/pages/expense/cost'
import Repository from '@/pages/service/repository/'
import Faq from '@/pages/service/faq/'
import Role from '@/pages/manage/role/'
import Person from '@/pages/manage/person/'
import Area from '@/pages/manage/area'
import Branch from '@/pages/manage/branch'
import Station from '@/pages/manage/station'

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
				<Route path="/app/service/faqs" component={Faq}/>
				<Route path="/app/service/respository" component={Repository}/>
				<Route exact path="/app/manage/role" component={Role}/>
				<Route exact path="/app/manage/person" component={Person}/>
				<Route exact path="/app/manage/area" component={Area}/>
				<Route exact path="/app/manage/branch" component={Branch}/>
				<Route exact path="/app/manage/station" component={Station}/>
		    <Redirect from="/app" to="/app/index"/>
		  </Switch>
		)
	}
}