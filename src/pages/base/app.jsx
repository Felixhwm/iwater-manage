import React from 'react'
import Routes from '@/route'
import '@style/pages/app.scss'
import Sider from '@components/sider/index.jsx'
import Header from '@components/header'
import { Layout, BackTop } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
const { Content } = Layout;

class App extends React.Component {
	state = {
		collapsed: false,
		clientWidth: document.body.clientWidth
	}
	componentDidMount() {
		window.onresize = () => {
      this.setState({
        clientWidth: document.body.clientWidth
      })
    }
	}
	toggle = () => {
		this.setState({
				collapsed: !this.state.collapsed,
		});
	}
  render() {
		const isMobile = this.state.clientWidth <= 992;
  	return (
  		<Layout style={{height: '100%'}}>
				{!isMobile && <Sider collapsed={this.state.collapsed}/>}
	      <Layout style={{flexDirection: 'column'}}>
	        <Header toggle={this.toggle} collapsed={this.state.collapsed} isMobile={isMobile}/>
	        <Content>
						<Scrollbars style={{height: 'calc( 100vh - 50px)'}}>
							<Routes/> 
						</Scrollbars>
						<BackTop/>
	        </Content>
	      </Layout>
				{
					isMobile && (   // 手机端对滚动很慢的处理
						<style>
						{`
							#root{
								height: auto;
							}
						`}
						</style>
					)
				}
	    </Layout>
  	)
  }
}

export default App