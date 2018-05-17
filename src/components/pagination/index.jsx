import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class CustomPagination extends Component {
  render() {
    const { total, searchData, onChange } = this.props
    return (
      <Pagination
        {...this.props}
        size="small" 
        showQuickJumper 
        total={total} 
        pageSize={searchData.limit}
        current={searchData.pageNum} 
        showTotal={(total, range) => `共 ${total} 条`}
        onChange={onChange}
      />
    )
  }
}
