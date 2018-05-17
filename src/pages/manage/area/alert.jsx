import React, { Component } from 'react'
import Modal from '@/components/modal'
import StationSelect from '@/components/stationSelect/'
import { common } from '@/api'
import { Form, Input, message } from 'antd'

class Alert extends Component {
  onCancel = () => {
    this.props.trigger(false)
  }
  submitHandle = () => {
    const { data } = this.props;
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.id ? 'user.updateByPrimaryKeySelective' : 'area.insertSelective',
        ...values,
        fUpbrno: values.fUpbrno.value,
        id: data.id
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else if(res.rspCode === '99') {
        message.error('区域名已存在！');
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  render() {
    const { data } = this.props
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
        width="500px">
        <Form className="form">
              <Form.Item label="区域名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('label', {
                  initialValue: data.label,
                  rules: [{ required: true, whitespace: true, message: '请输入区域名称！' }]
                })(<Input maxLength="10"/>)}
              </Form.Item>
              <Form.Item label="区域等级:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fLevel', {
                  initialValue: data.fLevel,
                  rules: [{ required: true, whitespace: true, message: '请输入区域等级！' }]
                })(<Input maxLength="10"/>)}
              </Form.Item>
              <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fUpbrno', {
                  initialValue: data.fUpbrno && { label: data.showname, value: data.fUpbrno },
                  rules: [{ required: true, whitespace: true, message: '请选择所属区域！', type: 'object' }]
                })(
                  <StationSelect type="select"/>
                )}
              </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Alert)