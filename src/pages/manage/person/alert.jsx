import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import StationSelect from '@/components/stationSelect/'
import Organization from '@/components/organizationSelect'
import { common } from '@/api'
import md5 from 'js-md5'
import { Row, Col, Form, Input, Radio, Switch, Select, message } from 'antd'

 class Alert extends Component {
  state = {
     roleList: [],
     disabled: true,
     title: '详情',
     okText: '编辑'
  }
  initData = async() => {
    const res = await common({
      tradeCode: 'userrole.selectByPrimaryKeyNickname'
    })
    this.setState({
      roleList: res.listInfo
    })
  }
  componentDidMount() {
    this.initData()
    this.props.data.isAdd && this.setState({
      disabled: false, title: '添加', okText: '确定'
    })
  }
  onCancel = (e) => {
    if(this.state.title === '编辑' && e.currentTarget.className === 'ant-btn') {
      this.setState({ 
        disabled: true, title: '详情', okText: '编辑' 
      })
      return this.props.form.resetFields()
    }
    this.props.trigger(false)
  }
  submitHandle = () => {
    const { state: { disabled }, props: { data } } = this
    if(disabled) {
      this.setState({ disabled: false, title: '编辑', okText: '确定' })
      return
    }
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: data.isAdd ? 'user.insertSelective' : 'user.updateByPrimaryKeySelective',
        ...values,
        fState: values.fState ? 0 : 1,
        fPassword: md5(values.fPassword),
        areas: values.areas.map(k => k.value).toString(),
        fPid: values.fPid || data.fPid
      })
      if(res.rspCode === '00') {
        message.success('操作成功！');
        this.props.trigger(true);
      }else if(res.rspCode === '99') {
        message.error('登录名已存在！');
      }else {
        message.error('系统繁忙，请稍后再试！');
      }
    })
  }
  render() {
    const { roleList, disabled, title, okText } = this.state
    const { data, size: { isMobile }, form: { getFieldDecorator } } = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Modal
        title={title}
        okText={okText}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={e => this.onCancel(e)}
        width="800px">
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="姓名:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fName', {
                  initialValue: data.fName,
                  rules: [{ required: true, whitespace: true, message: '请输入姓名！' }],
                })(
                  <Input maxLength="10" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="登陆账号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPid', {
                  initialValue: data.fPid,
                  rules: [{ required: true, whitespace: true, message: '请输入登陆账号！' }],
                })(
                  <Input maxLength="16" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="密码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPassword', {
                  initialValue: data.fPassword,
                  rules: [{ required: true, whitespace: true, message: '请输入登陆密码！' }],
                })(
                  <Input type="password" maxLength="16" disabled={disabled}/>
                )}
              </Form.Item>
              <Form.Item label="所在机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBrno', {
                  initialValue: data.fBrno,
                  rules: [{ required: true, whitespace: true, message: '请选择所在机构！' }],
                })(<Organization type="select" treeDefaultExpandAll disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="权限角色:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fRoleid', {
                  initialValue: data.fRoleid && Number(data.fRoleid),
                  rules: [
                    { required: true, whitespace: true, message: '请选择权限角色！', type: 'number' }
                  ],
                })(<Select disabled={disabled}>
                    {roleList && roleList.map(item =>
                        <Select.Option value={item.fId} key={item.fId}>{item.fName}</Select.Option>
                    )}
                </Select>)}
              </Form.Item>
              <Form.Item label="责任区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('areas', {
                  initialValue: data.area_id && data.area_id.split(',').map((k, i) => ({value: k, label: data.area_name.split(',')[i]}))
                })(
                    <StationSelect type="select" allowClear multiple disabled={disabled}/>
                )}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="联系手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone1', {
                  initialValue: data.fTelephone1,
                  rules: [{ required: true, whitespace: true, message: '请输入联系手机！' }]
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="备用手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone2',{
                  initialValue: data.fTelephone2,
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="座机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fGddh',{
                  initialValue: data.fGddh,
                })(<Input maxLength="20" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPad',{
                  initialValue: data.fPad,
                })(<Input.TextArea autosize maxLength="50" disabled={disabled}/>)}
              </Form.Item>
              <Form.Item label="服务标志:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fFlag', {
                  initialValue: data.fFlag || '0',
                  rules: [
                    { required: true, whitespace: true, message: '请选择服务标志！' }
                  ],
                })(
                  <Radio.Group disabled={disabled}>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">请假</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="是否有效:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fState', {
                  valuePropName: 'checked',
                  initialValue: data.fState ? (data.fState === '0' ? true : false) : true,
                  rules: [{ required: true, message: '请选择有效性！' }],
                })(<Switch disabled={disabled}/>)}
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
