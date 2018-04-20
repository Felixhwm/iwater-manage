import React from 'react'
import { Menu, Icon } from 'antd'

export default ({ data, rootPath, ...props }) => 
  <Menu {...props}>
  {
    data && data.map(item => 
    <Menu.SubMenu
      key={`${rootPath}/${item.menuUrl}`}
      title={
        <span>
            <Icon type="mail" />
            <span className="nav-text">{item.menuName}</span>
        </span>
      }>
      {
        item.child && item.child.map(each => 
          <Menu.Item
            key={`${rootPath}/${item.menuUrl}/${each.menuUrl}`}>
            <span>{ each.menuName }</span>
        </Menu.Item>)
      }
    </Menu.SubMenu>)
  }
  </Menu>