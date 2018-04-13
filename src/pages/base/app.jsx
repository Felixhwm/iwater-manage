import React from 'react'
import Routes from '@/route'
import '@style/pages/app.scss'
import Logo from '@style/imgs/log_app.png'
import SideMenu from '@components/menu'
import TopHeader from '@components/header'
import { Layout, Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			breadcrumb: {
				firstName: '',
				lastName: ''
			}
		}
	}
	componentWillMount() {

  }
  changeHandle = (breadcrumb) => {
  	this.setState({
			breadcrumb
		})
  }
  render() {
  	return (
  		<Layout className="app" style={{height: '100%'}}>
	      <Sider className="sidebar" width={160}>
	      	<img src={Logo} alt="logo" className="logo-menu"/>
	      	<SideMenu onChange={this.changeHandle}/>
	      </Sider>
	      <Layout>
	        <Header className="header">
	        	<TopHeader/>
	        	<Breadcrumb className="breadcrumb">
    	        <Breadcrumb.Item className="fisrt">{this.state.breadcrumb.firstName}</Breadcrumb.Item>
    	        <Breadcrumb.Item className="last">{this.state.breadcrumb.lastName}</Breadcrumb.Item>
    	      </Breadcrumb>
	        </Header>
	        <Content>
	        	<Routes/> 
	        </Content>
	      </Layout>
	    </Layout>
  	)
  }
}

export default App