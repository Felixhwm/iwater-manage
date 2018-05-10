import React from 'react'
import { Breadcrumb } from 'antd'
import './index.scss'

export default class App extends React.Component {
  render() {
    const { first, second } = this.props
    return (
      <div className="flex_ca breadcrumb-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item className="first">{first}</Breadcrumb.Item>
          <Breadcrumb.Item className="last">{second}</Breadcrumb.Item>
        </Breadcrumb>
        {this.props.children}
      </div>
    )
  }
}