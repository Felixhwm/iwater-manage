import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from '@/components/modal'
import Organization from '@/components/organizationSelect'
import StationSelect from '@/components/stationSelect'
import { common } from '@/api'
import { getTime } from '@/utils'
import { baseUrl } from '@/api/request.js'
import { Form, Input, DatePicker, Upload, message, Row, Col, Icon } from 'antd'

class Alert extends Component {
  state = {
    loading: false
  }
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('只能上传图片！');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传的图片大小不能超过2M！');
    }
    return isJPG && isLt2M;
  }
  handleChange = (info) => {
    function getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }
    
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
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
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <Modal
        title={ data.fPid ? '编辑' :'添加 '}
        visible={this.props.visible}
        onOk={this.submitHandle}
        onCancel={this.onCancel}
        width="800px"
        bodyStyle={{ height: !isMobile && 600, overflowY: !isMobile && 'auto'}}>
        <Form className="form">
          <Row gutter={20}>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="站点编号:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPid', {
                  initialValue: data.fPid,
                  rules: [{ required: true, whitespace: true, message: '请输入站点编号！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="站点名称:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fName', {
                  initialValue: data.fName,
                  rules: [{ required: true, whitespace: true, message: '请输入站点名称！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="所属机构:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBranchid', {
                  initialValue: data.fBranchid,
                  rules: [{ required: true, whitespace: true, message: '请选择所属机构！' }],
                })(<Organization type="select" treeDefaultExpandAll/>)}
              </Form.Item>
              <Form.Item label="所属区域:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAreaid', {
                  initialValue: data.fAreaid && { label: data.areaname, value: data.fAreaid },
                  rules: [{ required: true, whitespace: true, message: '请选择所属机构！' }],
                })(<StationSelect type="select"/>)}
              </Form.Item>
              <Form.Item label="建设单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBuildCompany', {
                  initialValue: data.fBuildCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入建设单位！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="设计单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fDesignCompany', {
                  initialValue: data.fDesignCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="监管单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSuperviseCompany', {
                  initialValue: data.fSuperviseCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="养护单位:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintainCompany', {
                  initialValue: data.fMaintainCompany,
                  rules: [{ required: true, whitespace: true, message: '请输入设计单位！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="站点地址:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddress', {
                  initialValue: data.fAddress,
                  rules: [{ required: true, whitespace: true, message: '请输入站点地址！' }]
                })(<Input.TextArea autosize maxLength="60"/>)}
              </Form.Item>
              <Form.Item label="经度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddressjd', {
                  initialValue: data.fAddressjd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置经度！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="纬度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fAddresswd', {
                  initialValue: data.fAddresswd,
                  rules: [{ required: true, whitespace: true, message: '请输入位置纬度！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="建设日期:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fBuilddate', {
                  initialValue: data.fBuilddate,
                  rules: [{ required: true, whitespace: true, message: '请输入建设日期！' }]
                })(<DatePicker style={{width: '100%'}}/>)}
              </Form.Item>
              <Form.Item label="负责人:" {...formItemLayout} colon={false}>
                {getFieldDecorator('contname', {
                  initialValue: data.contname,
                  rules: [{ required: true, whitespace: true, message: '请输入负责人！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="负责人电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fConttel', {
                  initialValue: data.fConttel,
                  rules: [{ required: true, whitespace: true, message: '请输入负责人电话！' }]
                })(<Input maxLength="20"/>)}
              </Form.Item>
              <Form.Item label="维护人:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintainid', {
                  initialValue: data.fMaintainid,
                  rules: [{ required: true, whitespace: true, message: '请选择维护人！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="维护人电话:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fMaintaintel', {
                  initialValue: data.fMaintaintel,
                  rules: [{ required: true, whitespace: true, message: '请输入维护人电话！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
            </Col>
            <Col span={isMobile ? 24 : 12}>
              <Form.Item label="服务户数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSerFamily', {
                  initialValue: data.fSerFamily,
                  rules: [{ required: true, whitespace: true, message: '请输入服务户数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="服务人数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fSerPeople', {
                  initialValue: data.fSerPeople,
                  rules: [{ required: true, whitespace: true, message: '请输入服务人数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="工艺类型:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fTtype', {
                  initialValue: data.fTtype,
                  rules: [{ required: true, whitespace: true, message: '请选择工艺类型！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="处理水量:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWcount', {
                  initialValue: data.fWcount,
                  rules: [{ required: true, whitespace: true, message: '请输入处理水量！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="管网长度:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fClength', {
                  initialValue: data.fClength,
                  rules: [{ required: true, whitespace: true, message: '请输入管网长度！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="窖井个数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWellcount', {
                  initialValue: data.fWellcount,
                  rules: [{ required: true, whitespace: true, message: '请输入窖井个数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="提升井数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPwcount', {
                  initialValue: data.fPwcount,
                  rules: [{ required: true, whitespace: true, message: '请输入提升井数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="湿地个数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fWetlandarea', {
                  initialValue: data.fWetlandarea,
                  rules: [{ required: true, whitespace: true, message: '请输入湿地个数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="提升井数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPwcount', {
                  initialValue: data.fPwcount,
                  rules: [{ required: true, whitespace: true, message: '请输入提升井数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="出水标准:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fEffluent', {
                  initialValue: data.fEffluent,
                  rules: [{ required: true, whitespace: true, message: '请输入出水标准！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="化粪池数:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fCesspool', {
                  initialValue: data.fCesspool,
                  rules: [{ required: true, whitespace: true, message: '请输入化粪池数！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="站点二维码:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fCesspool', {
                  initialValue: data.fCesspool,
                  rules: [{ required: true, whitespace: true, message: '请选择站点二维码！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="关联通讯设备:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fComDeviceid', {
                  initialValue: data.fComDeviceid,
                  rules: [{ required: true, whitespace: true, message: '请选择关联通讯设备！' }]
                })(<Input maxLength="16"/>)}
              </Form.Item>
              <Form.Item label="站点图片:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fPhotoOne', {
                  initialValue: data.fPhotoOne,
                  rules: [{ required: true, whitespace: true, message: '请选择站点图片！' }]
                })(
                  <Upload
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={baseUrl+'//file/upload'}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                  >
                    {this.state.imageUrl ? <img src={this.state.imageUrl} alt="" /> : uploadButton}
                  </Upload>
                )}
              </Form.Item>
              <Form.Item label="备注:" {...formItemLayout} colon={false}>
                {getFieldDecorator('fRemark', {
                  initialValue: data.fRemark,
                  rules: [{ required: true, whitespace: true, message: '请输入备注！' }]
                })(<Input.TextArea autosize maxLength="60"/>)}
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