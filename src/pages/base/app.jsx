import React from 'react'
import Routes from '@/route'
import '@style/pages/app.scss'
import Sider from '@components/sider/index.jsx'
import Header from '@components/header'
import { Layout } from 'antd';
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
  		<Layout className="app" >
				{!isMobile && <Sider collapsed={this.state.collapsed}/>}
	      <Layout style={{flexDirection: 'column'}}>
	        <Header toggle={this.toggle} collapsed={this.state.collapsed} isMobile={isMobile}/>
	        <Content>
	        	<Routes/> 
	        </Content>
	      </Layout>
	    </Layout>
  	)
  }
}

export default App