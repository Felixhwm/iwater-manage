import React from 'react'
import './index.scss'
import { Row, Col } from 'antd'
import { Map, Marker, InfoWindow } from 'react-amap'
import { getStationList, getStationStatu } from '@api'
import { getCookie } from '@utils'

class Index extends React.Component {
	constructor() {
		super();
		this.state = {
			position: {
				longitude: 121.388821,
				latitude: 30.799945
			},
			stationList: [],
			statuList: [],
			infoData: {},
			infoVisible: false
		};
	}
	componentDidMount() {
    //this.initData();
  }
	async initData() {
		let deviceId = '';
		const res = await getStationList({
			tradeCode : 'station.selectByPrimaryKey',
      fUserid : getCookie('userid')
		});
		const stationList = res.listInfo;
		stationList.forEach(item => {
			if (item.fComDeviceid) {
				deviceId += item.fComDeviceid + ',';
			}
			item.infoShow = false;
			item.position = {
				longitude: item.fAddressjd || -1000, 
				latitude: item.fAddresswd || -1000
			}
		});
		const status = await getStationStatu({
			deviceId,
			toList: 'deviceId'
		});
		stationList.forEach(item => {
			let id = item.fComDeviceid
			if (id) {
				item.statu = status.data.filter(key => toString(key.deviceId) === toString(id))[0] || { deviceState: '暂无信息' }
			}else {
				item.statu = { deviceState: '暂无信息' }
			}
		});
		this.setState({
			stationList,
			statuList: status.data
		})
	}
	clickHandle = (infoData) => {
		this.setState({
			infoData,
			infoVisible: true
		})
	}
	closeHandle = () => {
		this.setState({
			infoVisible: false
		})
	}
	getIcon = (item) => {
		let deviceState = item.statu.deviceState;
		if(deviceState === '暂无信息') {
			return require('@imgs/station_normal.png')	
		}else if(deviceState === '全部正常') {
			return require('@imgs/station_ok.png')
		}else {
			return require('@imgs/station_nook.png')
		}
		
	}
	render() {
    const loadingStyle = {
      position: 'relative',
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const Loading = <div style={loadingStyle}>Loading Map...</div>;
    const { infoData } = this.state;
		return (
			<div>
				<Row gutter={16} className="station-record">
          <Col md={4}>
						污水站总数 <span>1111</span> 座
					</Col>
					<Col md={4}>
						已安装监控 <span>233</span> 座
					</Col>
					<Col md={4}>
						监控在线 <span>233</span >座
					</Col>
					<Col md={4}>
						监控离线<span>233</span>座
					</Col>
					<Col md={4}>
						在线率<span>233</span>座
					</Col>
					<Col md={4}>
						故障站点<span>233</span>座
					</Col>
				</Row>
				<div className="map-box">
					<Map
						plugins={['MapType','ToolBar']}
						loading={Loading}
						amapkey={'1dcf1cf6a824292676aba58a05ce853d'}
						zoom={13.9} 
						center={this.state.position}>
						{this.state.stationList.map((item, index) => 
							<Marker 
								key={item.fPid}
								events={{click:() => this.clickHandle(item)}}
								position={item.position}>
								<img src={this.getIcon(item)} alt="logo"/>
							</Marker>
						)}
						<InfoWindow
							position={infoData.position}
							visible={this.state.infoVisible}
							autoMove={true}
							events={{close: this.closeHandle}}>
							<p>{infoData.areaname}</p>
							<p>{infoData.fMaintainCompany}</p>
							<p>{infoData.maintainname}</p>
							<p>{infoData.fPid}</p>
						</InfoWindow>
					</Map>
				</div>
			</div>
		)
	}
}

export default Index
