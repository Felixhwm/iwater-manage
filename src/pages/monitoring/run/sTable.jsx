import React from 'react'
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="###">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


export default class STable extends React.Component {
  render() {
    return <div>
        <span style={{display: 'block', color: '#333', fontSize: '15px', fontWeight: 'bold', marginBottom: '10px'}}>表格</span>
        <Table style={{width: '98%'}} rowSelection={rowSelection} size="small" columns={columns} dataSource={data} />
      </div>
  }
} 