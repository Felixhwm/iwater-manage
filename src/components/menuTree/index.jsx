import React, { Component } from 'react'
import { getStore } from '@/utils'
import { Tree } from 'antd'

export default class MenuTree extends Component {
  state = {
    checkedKeys: [],
    allMenu: getStore('allMenu', true)
  }
  // shouldComponentUpdate = () => true
  // componentWillReceiveProps(nextProps) {
  //   this.initCheckedKeys(nextProps);
  // }
  // initCheckedKeys = (props) => {
  //   this.setState({
  //     checkedKeys: props.checkedKeys,
  //   })
  // }
  onCheck = (checkedKeys, e) => {
    let keys = checkedKeys.checked;
    let childList = e.node.getNodeChildren().map(item => item.key) || [];
    if(e.checked) {
      keys = keys.concat(childList)
    }else {
      childList.forEach(item => {
        keys.indexOf(item) > -1 && keys.splice(keys.indexOf(item),1);
      });
    }
    this.props.onChecked(keys)
  }
  render() {
    const { checkedKeys, allMenu } = this.state
    return (
      <Tree
        className="tree"
        checkable
        checkStrictly
        defaultExpandAll
        onCheck={this.onCheck}
        checkedKeys={checkedKeys}
        {...this.props}>
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
    )
  }
}
