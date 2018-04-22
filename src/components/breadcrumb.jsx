import React from 'react'
import { Breadcrumb } from 'antd'

export default class App extends React.Component {
  render() {
    const { first, second } = this.props
    return (
      <div className="flex_ca breadcrumb-container">
        <Breadcrumb>
          <Breadcrumb.Item className="first">{first}</Breadcrumb.Item>
          <Breadcrumb.Item className="last">{second}</Breadcrumb.Item>
        </Breadcrumb>
        {this.props.children}
        <style lang="scss" scoped>{`
          .breadcrumb-container {
            height: 64px;
            line-height: 64px;
            background-color: rgb(242, 248, 252);
            padding: 0 20px;
            margin: 0 -20px 15px -20px;
            font-weight: bold; 
          }
          .first { color: #333; font-size: 18px; }
          .last { color: #333; font-size: 16px; }
        `}</style>
      </div>
    )
  }
}