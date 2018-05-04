import React, { Component } from 'react'
import { getRoleList } from '@api'

export default class Role extends Component {
  initData = async() => {
    const res = await getRoleList({
      pageNum: 1
    });
  }
  componentDidMount() {
    this.initData();
  }
  render() {
    return (
      <div>
        role
      </div>
    )
  }
}
