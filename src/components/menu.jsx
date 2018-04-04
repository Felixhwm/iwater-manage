import React from 'react'
import { withRouter } from 'react-router-dom'
import '../style/components/menu.scss'
import { getMenu } from '../api'
import { getCookie } from '../utils'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu

class SideMenu extends React.Component {
	constructor () {
    super()
    this.state = {
      menuList: [],
      rootSubmenuKeys: [],
      openKeys: [],
      selectedKeys: []
    }
  }
  async initData() {
  	const res = await getMenu({
      tradeCode : 'menu.getMenuByRole',
      fRoleid: getCookie('fRoleid')
  	});
  	this.setState({
  		menuList: res.menuInfo,
      rootSubmenuKeys: res.menuInfo.map(item => item.menuName)
  	})
  }
  menuClickHandle = (item) => {
    let firstName = this.state.menuList.filter(item => 
      item.menuName === this.state.openKeys[0]
    )[0];
    this.props.onChange({
      firstName: firstName.label,
      lastName: item.item.props.children
    })
  	this.setState({
  		selectedKeys: [item.key],
  	});

    const { path } = this.props.match;
    const { keyPath } = item;
    //this.props.match.params.label = 
    this.props.history.replace(path+'/'+keyPath[1]+'/'+keyPath[0]);
  }
  onOpenChange = (openKeys) => {
  	const latestOpenKey = openKeys.find(key => 
      this.state.openKeys.indexOf(key) === -1
    );
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }
	componentWillMount() {
		this.initData();
    const { pathname } = this.props.location;
    let path = pathname.replace('/app', '');
    let openKeys = [path.substring(1, path.lastIndexOf('/'))];
    let selectedKeys = [pathname.substring(pathname.lastIndexOf('/')+1)];
    this.setState({ 
      openKeys, 
      selectedKeys 
    });
  }
  componentWillReceiveProps(nextProp, prevProp) {

  }
	render() {
		return (
			<Menu 
        style={{ width: '100%' }}  
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={this.state.selectedKeys}
        onOpenChange={this.onOpenChange}
        onClick={this.menuClickHandle}>
        {
        this.state.menuList.map(item => {
          return (
            <SubMenu
              key={item.menuName}
              title={
                <span>
                  <Icon type="mail"/>
                  <span >{item.label}</span>
                </span>
              }
            >
            {
              item.items.map(each => {
                return (
                  <Menu.Item key={each.menuName}>
                  {each.label}
                  </Menu.Item>
                )
              })
            }
            </SubMenu>
          )
        })
        }
      </Menu>
		)
	}
}


export default withRouter(SideMenu)