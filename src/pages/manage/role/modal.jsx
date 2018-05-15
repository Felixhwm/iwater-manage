import React, { Component } from 'react'
import { Form ,Input, Tree, message, Select } from 'antd'
import Modal from '@/components/modal'
import { getStore } from '@/utils'
import { common } from '@/api'

class App extends Component {
  state = {
    title: '添加',
    checkedKeys: []
  }
  shouldComponentUpdate = () => true
  componentWillReceiveProps(nextProps) {
    this.initCheckedKeys(nextProps);
  }
  initCheckedKeys = (props) => {
    const hasData = Object.keys(props.data).length !== 0;
    const menuid = props.data.menuid ? props.data.menuid.split(',') : null
    this.setState({
      checkedKeys: hasData ? menuid : [],
      mode: hasData ? '编辑' : '添加'
    })
  }
  onCheck = (checkedKeys, e) => {
    let keys = checkedKeys.checked;
    let childList = e.node.getNodeChildren().map(item => item.key) || [];
    if(e.checked) {
      keys = keys.concat(childList)
    }else {
      childList.forEach(item => {
        keys.indexOf(item) >= 0 && keys.splice(keys.indexOf(item),1);
      });
    }
    this.setState({ 
      checkedKeys: keys
    });
  }
  handleCancel = () => {
    this.props.trigger('close')
  }
  handleSubmit = () => {
    const { checkedKeys, mode } = this.state;
    const { data } = this.props;
    const fRoleMenu = checkedKeys.length === 0 ? '' : checkedKeys.reduce((total, num) => 
      total + ',' + num
    )
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if(mode === '添加') {
          const res = await common({
            tradeCodeList: 'userrole.insertSelective,userrolemenu.insertRoleMenu',
            toList: 'fRoleMenu',
            fRoleMenu,
            ...values
          });
          if (res.rspCode === '99'){
            return message.error('该角色名称已存在！');
          }
        }else {
          await common({
            tradeCodeList: 'userrole.updateByPrimaryKeySelective,userrolemenu.deleteByPrimaryKey,userrolemenu.insertRoleMenu',
            toList: 'fRoleMenu',
            fRoleid: data.fRoleid,
            fRoleMenu,
            ...values
          });
        }
        message.success(`${mode}成功!`);
        this.props.trigger('submit')
      }
    })
  }
  render() {
    const {  mode } = this.state;
    const { visible, data } = this.props;
    const { fName, fType } = data;
    const allMenu = getStore('allMenu', true);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 ,offset: 1},
      wrapperCol: { span: 16 ,offset: 1},
    };
    return (
      <Modal 
        destroyOnClose={true}
        title={mode}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        width="750px">
        <Form className="form">
          <ul>
            <li style={{width:'50%'}}>
              <Form.Item label="角色名称" {...formItemLayout}>
              {getFieldDecorator('fName', {
                initialValue: fName,
                rules: [{ required: true, message: '请输入角色名称！', whitespace: true }],
              })(
                <Input/>
              )}
              </Form.Item>
            </li>
            <li style={{width:'50%'}}>
            <Form.Item label="角色类型" {...formItemLayout}>
              {getFieldDecorator('fType', {
                initialValue: fType,
                rules: [{ required: true, message: '请选择角色类型！', whitespace: true }],
              })(
                <Select placeholder="请选择">
                  <Select.Option value="0">直营</Select.Option>
                  <Select.Option value="1">加盟</Select.Option>
                </Select>
              )}
            </Form.Item>
            </li>
          </ul>
        </Form>
        <Tree
          className="tree"
          checkable
          checkStrictly
          defaultExpandAll
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}>
          {
            allMenu && allMenu.map(parent => 
              <Tree.TreeNode title={parent.menuName} key={parent.menuId}>
                {
                  parent.child && parent.child.map(child => 
                    <Tree.TreeNode title={child.menuName} key={child.menuId}/>
                  )
                }
              </Tree.TreeNode>
            )
          }
        </Tree>
      </Modal>
    )
  }
}

export default Form.create()(App)
