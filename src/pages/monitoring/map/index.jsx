import React from 'react'
import Breadcrumb from '@/components/breadcrumb/'

class Maps extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}

	render() {
		return (
			<div className="main">
				<Breadcrumb first="监控平台" second="地图监控"/>
				<div className="main-container">
				</div>
			</div>
		)
	}
}

export default Maps
