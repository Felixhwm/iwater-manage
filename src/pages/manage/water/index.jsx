import React, { Component } from 'react'
import { connect } from 'react-redux'
import Breadcrumb from '@/components/breadcrumb'
import { Form, Row, Col, Input } from 'antd'

class Water extends Component {
  render() {
    const { isMobile } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    return (
      <div className="main">
        <Breadcrumb first="管理平台" second="水质数据录入"/>
        <div className="main-container">
          <Form>
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="设备编号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDeviceid', {
                  rules: [{ required: true, whitespace: true, message: '请输入设备编号！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
            </Col>
          </Row>
          </Form>  
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Form.create()(Water))