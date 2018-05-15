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
     value: null,
     roleList: []
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
  }
  onCancel = () => {
    this.props.trigger(false)
  }
  submitHandle = () => {
    this.props.form.validateFields(async(err, values) => {
      if(err) return;
      const res = await common({
        tradeCode: 'user.insertSelective',
        ...values,
        fState: values.fState ? 0 : 1,
        fPassword: md5(values.fPassword),
        areas: values.areas.toString()
      })
      if(res.rspCode === '00') {
        message.success('添加成功！');
        this.props.trigger(true);
      }
    })
  }
  render() {
    const { roleList } = this.state
    const { data } = this.props;
    console.log(data)
    const { isMobile } = this.props.size
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Modal
        title={ data.title}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={this.onCancel}
        width="700px">
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="姓名:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fName', {
                  initialValue: data.fName,
                  rules: [{ required: true, whitespace: true, message: '请输入姓名！' }],
                })(
                  <Input maxLength="10"/>
                )}
              </Form.Item>
              <Form.Item label="登陆账号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPid', {
                  initialValue: data.fPid,
                  rules: [{ required: true, whitespace: true, message: '请输入登陆账号！' }],
                })(
                  <Input maxLength="16"/>
                )}
              </Form.Item>
              <Form.Item label="密码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPassword', {
                  initialValue: data.fPassword,
                  rules: [{ required: true, whitespace: true, message: '请输入登陆密码！' }],
                })(
                  <Input type="password" maxLength="16"/>
                )}
              </Form.Item>
              <Form.Item label="所在机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBrno', {
                  initialValue: data.fBrno,
                  rules: [{ required: true, whitespace: true, message: '请选择所在机构！' }],
                })(<Organization treeDefaultExpandAll/>)}
              </Form.Item>
              <Form.Item label="权限角色:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fRoleid', {
                  initialValue: data.fBrno,
                  rules: [
                    { required: true, whitespace: true, message: '请选择权限角色！', type: 'number' }
                  ],
                })(<Select>
                    {roleList && roleList.map(item =>
                        <Select.Option value={item.fId} key={item.fId}>{item.fName}</Select.Option>
                    )}
                </Select>)}
              </Form.Item>
              <Form.Item label="责任区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('areas', {
                  initialValue: data.areas && [data.areas],
                  rules: [{ type: 'array' }],
                })(
                  <StationSelect type="select" multiple={true}/>
                )}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="联系手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone1', {
                  initialValue: data.fTelephone1,
                  rules: [{ required: true, whitespace: true, message: '请输入联系手机！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="备用手机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTelephone2',{
                  initialValue: data.fTelephone2,
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="座机:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fGddh',{
                  initialValue: data.fGddh,
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPad',{
                  initialValue: data.fPad,
                })(<Input.TextArea autosize maxLength="50"/>)}
              </Form.Item>
              <Form.Item label="服务标志:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fFlag', {
                  initialValue: data.fFlag || '0',
                  rules: [
                    { required: true, whitespace: true, message: '请选择服务标志！' }
                  ],
                })(
                  <Radio.Group>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">请假</Radio>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label="是否有效:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fState', {
                  valuePropName: 'checked',
                  initialValue: data.fState ? (data.fState === 0 ? true : false) : true,
                  rules: [{ required: true, message: '请选择有效性！' }],
                })(<Switch/>)}
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
