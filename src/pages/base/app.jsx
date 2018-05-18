import React from 'react'
import { connect } from 'react-redux'
import Routes from '@/route'
import '@/style/pages/app.scss'
import Sider from '@/components/sider/index.jsx'
import Header from '@/components/header/'
import { Layout, BackTop } from 'antd';
const { Content } = Layout;

class App extends React.Component {
	state = {
		collapsed: false
	}
	toggle = () => {
		this.setState({
				collapsed: !this.state.collapsed,
		});
	}
	componentDidMount() {
		if (!!window.Notification) {
			Notification.requestPermission();
			this.sendMessage();
		}else {
			console.log('不支持Notification');
		}
	}
	sendMessage = async() => {
		if (Notification.permission === "granted") {
			new Notification("winme", {
					body: '欢迎浏览~',
					icon: require('@/style/imgs/winme.jpg')
			});
		}
	}
  render() {
		const { isSmallScreen, isMobile } = this.props.size;
  	return (
  		<Layout style={{'flexDirection': isSmallScreen && 'column', height: '100%'}}>
				<Header toggle={this.toggle} collapsed={this.state.collapsed} style={{padding: isSmallScreen && '10px 0'}}/>
				<Layout>
					{!isMobile && <Sider collapsed={this.state.collapsed}/>}
					<Layout>
						<Content style={{padding: isSmallScreen && 0}}>
								<Routes/> 
							<BackTop/>
						</Content>
					</Layout>
				</Layout>
				{
					isMobile && (   // 手机端对滚动很慢的处理 //flex布局模式改变
						<style>
						{`
							#root{
								height: auto!important;
							}
							.main-container {
								padding: 10px!important;
							}
						`}
						</style>
					)
				}
	    </Layout>
  	)
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)