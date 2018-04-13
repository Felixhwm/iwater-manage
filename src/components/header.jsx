import React, { Component } from 'react';
import { Menu } from 'antd';
import { withRouter } from 'react-router-dom';
import defaultAvator from '@imgs/default.png'
const SubMenu = Menu.SubMenu;

class TopHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  menuClick = () => {

  }
  render() {
    return (
      <div className="top-header">
        <Menu
          mode="horizontal"
          style={{ lineHeight: '60px', float: 'right' }}
          onClick={this.menuClick}>
          <Menu.Item key="1">
              工单
          </Menu.Item>
          <Menu.Item key="2">
              帮助
          </Menu.Item>
          <SubMenu title={<span className="avatar"><img src={defaultAvator} className="avator" alt="头像" /></span>}>
                  <Menu.Item key="setting:1">你好 - </Menu.Item>
                  <Menu.Item key="setting:2">个人信息</Menu.Item>
                  <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
          </SubMenu>
        </Menu>
        <style lang="scss" scoped>{`
          .top-header > .ant-menu > .ant-menu-item {
            color: #333;
            &:hover {
              color: #333;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default withRouter(TopHeader);