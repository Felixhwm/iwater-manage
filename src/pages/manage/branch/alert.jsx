import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import Organization from '@/components/organizationSelect'
import { common } from '@/api'
import { Form, Input, Radio, message, Row, Col } from 'antd'

class Alert extends Component {
  onCancel = () => {
    this.props.trigger(false)
  }
  submitHandle = () => {
    const { data } = this.props;
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.id ? 'branch.updateByPrimaryKeySelective' : 'branch.insertSelective',
        ...values,
        id: data.id || ''
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else if(res.rspCode === '99') {
        message.error('机构名已存在！');
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  render() {
    const { data } = this.props
    console.log(data)
    const { isMobile } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Modal
        title={ data.fPid ? '编辑' :'添加 '}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={this.onCancel}
        width="700px">
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="机构名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('label', {
                  initialValue: data.label,
                  rules: [{ required: true, whitespace: true, message: '请输入机构名称！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="所属机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBranchid', {
                  initialValue: data.fBranchid,
                  rules: [{ required: true, whitespace: true, message: '请选择所属机构！' }],
                })(<Organization type="select" treeDefaultExpandAll/>)}
              </Form.Item>
              <Form.Item label="机构性质:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPropty', {
                  initialValue: data.fPropty,
                  rules: [{ required: true, whitespace: true, message: '请选择机构性质！' }]
                })(
                  <Radio.Group>
                    <Radio value="0">直营</Radio>
                    <Radio value="1">加盟</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="状态:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fState', {
                  initialValue: data.fState,
                  rules: [{ required: true, whitespace: true, message: '请选择机构状态！' }]
                })(
                  <Radio.Group>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">维护</Radio>
                    <Radio value="2">无效</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="联系地址:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddress', {
                  initialValue: data.fAddress,
                  rules: [{ required: true, whitespace: true, message: '请输入联系地址！' }]
                })(<Input.TextArea maxLength="50" rows={2}/>)}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="位置经度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddressjd', {
                  initialValue: data.fAddressjd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置经度！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="位置纬度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddresswd', {
                  initialValue: data.fAddresswd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置纬度！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="联系人:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fContnm', {
                  initialValue: data.fContnm,
                  rules: [{ required: true, whitespace: true, message: '请输入联系人！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="联系电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fConttel', {
                  initialValue: data.fConttel,
                  rules: [{ required: true, whitespace: true, message: '请输入联系电话！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>        
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPad', {
                  initialValue: data.fPad
                })(<Input.TextArea maxLength="50" rows={2}/>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Form.create()(Alert))