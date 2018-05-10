import React from 'react'
import { connect } from 'react-redux'
import Routes from '@/route'
import '@style/pages/app.scss'
import Sider from '@components/sider/index.jsx'
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
  render() {
		const { isSmallScreen } = this.props.size;
  	return (
  		<Layout style={{height: '100%'}}>
				<Header toggle={this.toggle} collapsed={this.state.collapsed}/>
					<Layout>
						{!isSmallScreen && <Sider collapsed={this.state.collapsed}/>}
						<Layout>
							<Content>
									<Routes/> 
								<BackTop/>
							</Content>
						</Layout>
					</Layout>
				{
					isSmallScreen && (   // 手机端对滚动很慢的处理 //flex布局模式改变
						<style>
						{`
							#root{
								height: auto;
							}
							.ant-layout.ant-layout-has-sider {
								flex-direction: column;
							}
							.header,
							.ant-layout .ant-layout-content {
								padding: 0;
							}
							.main-container {
								padding: 10px!important;
							}
							.header-logo {
								display: none;
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