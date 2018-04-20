import React, { Component } from 'react';
import { Menu, Layout, Icon, Popover } from 'antd';
import { withRouter } from 'react-router-dom';
import Sider from '@components/sider/index.jsx'
import defaultAvator from '@imgs/default.png'
const SubMenu = Menu.SubMenu;
const Header = Layout.Header;

class TopHeader extends Component {
  state = {
    visible: false
  }
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible
    })
  }
  popoverHide = () => {
    this.setState({
      visible: false
    })
  }
  menuClick = (item) => {
    console.log(item.key)
    const { key } = item;
    switch(key) {
      case 'logout':
        this.props.history.replace('/login');
        return
      default :
      return
    }
  }
  render() {
    const { visible } = this.state;
    const { isMobile } = this.props;
    return (
      <Header className="header">
        { 
          isMobile ? (
          <Popover 
            trigger="click" placement="bottomLeft" visible={visible} onVisibleChange={this.handleVisibleChange}
            content={ <Sider popoverHide={this.popoverHide}/> }>
              <Icon type="bars" className="trigger custom-trigger" />
          </Popover>
          ) : <Icon
            className="trigger custom-trigger"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.props.toggle}
          />
        }
        <Menu
          mode="horizontal"
          onClick={this.menuClick}
          style={{ float: 'right', height: '100%', lineHeight: '50px', borderBottom: 'none', color: '#333'}}>
          <Menu.Item key="1">
              工单
          </Menu.Item>
          <Menu.Item key="2">
              帮助
          </Menu.Item>
          <SubMenu title={<span className="avatar"><img src={defaultAvator} className="avator" alt="头像" width="40" height="40"/></span>}>
                  <Menu.Item key="setting:1">你好 - </Menu.Item>
                  <Menu.Item key="setting:2">个人信息</Menu.Item>
                  <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
          </SubMenu>
        </Menu>
        <style>{`
          .custom-trigger {
            vertical-align: top;
            font-size: 18px;
            line-height: 50px;
            padding: 0 16px;
            cursor: pointer;
            -webkit-transition: color .3s;
            -o-transition: color .3s;
            transition: color .3s;
          }
        `}</style>
      </Header>
    );
  }
}

export default withRouter(TopHeader);