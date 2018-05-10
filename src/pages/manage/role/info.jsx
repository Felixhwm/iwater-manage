import React, { Component } from 'react'
import { Tree, Form, Input, message } from 'antd'
import { getStore } from '@/utils'
import { common } from '@/api'

class info extends Component {
  state = {
    checkedKeys: [],
    rowData: {}
  }
  componentDidMount() {
    const { rowData } = this.props;
    this.setState({
      rowData,
      checkedKeys: rowData.menuid ? rowData.menuid.split(',') : []
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.submit !== this.props.submit) {
      this.handleSubmit();
      return
    }
    const { rowData } = nextProps;
    this.setState({
      rowData,
      checkedKeys: rowData.menuid ? rowData.menuid.split(',') : []
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
  handleSubmit = () => {
    const { rowData, checkedKeys } = this.state;
    console.log(checkedKeys);
    const fRoleMenu = checkedKeys.reduce((total, num) => 
      total + ',' + num
    )
    console.log(fRoleMenu)
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        common({
          tradeCodeList: 'userrole.updateByPrimaryKeySelective,userrolemenu.deleteByPrimaryKey,userrolemenu.insertRoleMenu',
          toList: 'fRoleMenu',
          fRoleid: rowData.fRoleid,
          fRoleMenu,
          ...values
        });
        message.success('修改成功!');
        this.props.onSuccess();
      }
    })
  }
  render() {
    const { rowData } = this.state;
    const allMenu = getStore('allMenu', true);
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 ,offset: 1},
      wrapperCol: { span: 16 ,offset: 1},
    };
    return (
      <Form >
        <ul className="base">
          <li style={{width:'50%'}}>
            <Form.Item label="角色名称" {...formItemLayout}>
            {getFieldDecorator('fName', {
              initialValue: rowData.fName,
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input/>
            )}
            </Form.Item>
          </li>
          <li style={{width:'50%'}}>
          <Form.Item label="角色类型" {...formItemLayout}>
            {getFieldDecorator('fType', {
              initialValue: rowData.fTypename,
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input/>
            )}
          </Form.Item>
          </li>
        </ul>
        <Tree
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
      </Form>
    )
  }
}


export default Form.create()(info)