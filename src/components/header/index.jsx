import React, { Component } from 'react';
import { connect } from 'react-redux'
import './index.scss'
import { Menu, Layout, Icon, Popover, Divider, Dropdown } from 'antd';
import Sider from '@components/sider/index.jsx'
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
    const { isMobile, isSmallScreen } = this.props.size;
    return (
      <Header className="header">
        { 
          isSmallScreen && 
          <Popover 
            trigger="click" placement="bottomLeft" visible={visible} onVisibleChange={this.handleVisibleChange}
            content={ <Sider popoverHide={this.popoverHide}/> }>
              <Icon type="bars" className="trigger custom-trigger" />
          </Popover>
        }
        {
          !isMobile  && 
          <div className="header-logo">
            <img src={require('@/style/imgs/logo.png')} alt="logo"/>
            { !isSmallScreen && <img src={require('@/style/imgs/zi.png')} alt="zi"/> }
          </div>
        }
        {
          !isMobile ? 
          <div>公告XXXXXXXXXXXXX</div> : 
          <div>公告</div>
        }
        <div>
          <a href="###">帮助</a>
          <Divider type="vertical"/>
          <a href="###">使用说明</a>
          <Divider type="vertical"/>
          <Dropdown overlay={
            <Menu>
              <Menu.Item key="setting:1">你好 - </Menu.Item>
              <Menu.Item key="setting:2">个人信息</Menu.Item>
              <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
            </Menu>
          }>
            <span>
              <a href="###">admin</a>
              <Icon type="caret-down"/>
            </span>
          </Dropdown>
        </div>
        <style>{`
          .header {
            padding: ${isSmallScreen ? '0 10px' : '0 30px 0 26px'}!important
          }
        `}</style>
      </Header>
    );
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(TopHeader);