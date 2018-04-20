import React from 'react'
import { Table } from 'antd';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}


export default class EditableTable extends React.Component {
  render() {
    const columns = [
      { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
      { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
      { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
      { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
      { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
      { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
      { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a href="###">详情</a>,
      },
    ];
    
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    return (
      <div style={{margin: '20px auto 10px 20px'}}>
        <span style={{display: 'block', color: '#333', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px'}}>污水站设备总览表</span>
        <Table size="small" bordered dataSource={data} columns={columns} />
        <style>{`
        .ant-table-small.ant-table-bordered {
          border-right: 1px solid #e8e8e8;
        }
        `}</style>
      </div>
    )
  }
}