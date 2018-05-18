import React, { Component } from 'react'
import { getDeviceTypeList } from '@/api'
import { Select } from 'antd'

class deviceType extends Component {
  state = {
    deviceTypeList: []
  }
  componentDidMount() {
    this.initData()
  }
  initData = async() => {
    const res =  await getDeviceTypeList()
    this.setState({
      deviceTypeList: res.listInfo
    })
  }
  
  render() {
    const { deviceTypeList } = this.state
    return (
      <Select {...this.props}>
        {deviceTypeList.map( item => 
            <Select.Option key={item.fId} value={item.fId}>{item.fName}</Select.Option>
        )}
      </Select>
    )
  }
}
export default deviceType