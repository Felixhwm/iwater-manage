import React from 'react'
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

class TreeNav extends React.Component {
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  }
  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  }
  render() {
    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.key}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.key} />;
    });
    return (
      <div className="tt">
        <span style={{color: '#333', fontSize: '15px', fontWeight: 'bold'}}>站点导航</span>  
        <Tree
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
        >
        <TreeNode title="全部" key="0-0">
          <TreeNode title="上海市" key="0-0-0">
            <TreeNode title="嘉定区" key="0-0-0-0" />
            <TreeNode title="松江区" key="0-0-0-1" />
            <TreeNode title="青浦区" key="0-0-0-2" />
            <TreeNode title="宝山区" key="0-0-0-3" />
          </TreeNode>
          <TreeNode title="浙江省" key="0-0-1">
            <TreeNode title="杭州市" key="0-0-1-0" />
          </TreeNode>
          <TreeNode title="江苏省" key="0-0-2">
            <TreeNode title="徐州市" key="0-1-0-0" />
            <TreeNode title="常州市" key="0-2-0-0" />
            <TreeNode title="扬州市" key="0-3-0-0" />
            <TreeNode title="苏州市" key="0-4-0-0" />
            <TreeNode title="泰州市" key="0-5-0-0" />
            <TreeNode title="南京市" key="0-6-0-0" />
          </TreeNode>
        </TreeNode>
        <style>{`
        * {font-size: 12px} 
        .tt {
          width: 140px;
          height: 100%;
          border-right: 2px solid #ccc;
          float: left;
        }
        .ant-tree {
          
        }
        .ant-tree li .ant-tree-node-content-wrapper{
          height: 16px;
          line-height: 16px;
          padding: 0 2px;
        }
        .ant-tree li span.ant-tree-switcher{
          height: 16px;
          width: 16px;
          line-height: 10px;
        }
        `}</style>
      </Tree>
      </div> 
    );
  }
}

export default TreeNav