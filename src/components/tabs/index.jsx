import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.scss'

class Tabs extends Component {
  state = {
    curIndex: this.props.location.pathname
  }
  clickHandle = (item, index) => {
    this.setState({
      curIndex: item.path
    })
    this.props.history.replace(item.path)
  }
  render() {
    const { curIndex } = this.state
    const { data } = this.props
    return (
      <ul className="tabs">
      {
        data.map((item, index) => 
          <li 
            key={index}
            className={item.path === curIndex ? 'this' : ''}
            onClick={() => this.clickHandle(item, index)}>
            <span>{item.name}</span>
          </li>
        )
      }
      </ul>
    )
  }
}

export default withRouter(Tabs)
