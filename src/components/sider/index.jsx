import React from 'react'
import { withRouter } from 'react-router-dom';
import './index.scss'
import { getMenu } from '@/api';
import { setStore } from '@/utils'
import Menu from './menu'
import { Layout } from 'antd';
const {  Sider } = Layout;

class app extends React.Component {
  constructor () {
    super()
    this.state = {
      menuList: [],
      openKeys: [],
      selectedKeys: [],
      collapsed: false,
      firstHide: false,
    }
  }
  find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
  }
  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location;
    if (pathname.split('/').length  > 4) {
      pathname = pathname.substring(0, this.find(pathname, '/', 3))
    }
    let { collapsed } = nextProps;
    this.setState({
      openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))],
      selectedKeys: [pathname],
      collapsed,
      firstHide: collapsed
    });
  }
	componentDidMount() {
    this.initData();
  }
  async initData() {
    const res = await getMenu();
    this.setState({
      menuList: res.data
    });
    setStore('allMenu', res.data)

  }
  onOpenChange = (v) => {
    this.setState({
      openKeys: [v.pop()],
      firstHide: false
    })
  }
  menuClickHandle = (item) => {
    const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();
  	this.setState({
  		selectedKeys: [item.key],
  	},() => {
      this.props.history.replace(item.key)
    });
  }
  gotoIndex = () => {
    const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
    popoverHide && popoverHide();
    this.setState({
      selectedKeys: [],
      openKeys: []
  	}, () => {
      this.props.history.replace('/app/index')
    })
  }
  render() {
    const { path } = this.props.match;
    return(
      <Sider
        className="sider"
        breakpoint="lg"
        width={160}
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}>
          <Menu
            data={this.state.menuList}
            rootPath={path}
            mode="inline"
            theme="dark"
            openKeys={this.state.firstHide ? null : this.state.openKeys}
            selectedKeys={this.state.selectedKeys}
            inlineCollapsed={this.state.collapsed}
            onOpenChange={this.onOpenChange}
            onClick={this.menuClickHandle}
          />
      </Sider>
    )
  }
}

export default withRouter(app)