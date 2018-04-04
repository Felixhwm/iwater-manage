import React from 'react'
import { getWorkOrderList } from '../../api'
import { getCookie } from '../../utils'
import '../../style/pages/error.scss'
import { Table, Pagination } from 'antd';
const { Column } = Table;

export default class Error extends React.Component {
	constructor() {
		super();
		this.state = {
			data: [],
			orderList: [],
			total: null,
			page: 1,
			row: 10
		}
	}
	async initData() {
		const res  = await getWorkOrderList({
			fUserid: getCookie('userid')
		});
		res.data.forEach(item => {
      item.key = item.fEventid
    })
    this.setState({
    	data: res.data,
      orderList: res.data,
      total: res.data.length
    })
	}
	componentWillMount() {
		
		this.initData();
	}
	componentDidMount() {
	}
	render() {
		return (
			<div className="main">
				<Table 
					bordered
					pagination={false}
					size="small"
					dataSource={this.state.orderList}>
					<Column
		        title="工单编号"
		        dataIndex="fEventid"
		        key="fEventid"/>
		      <Column
		        title="报修时间"
		        dataIndex="fRepairtime"
		        key="fRepairtime"/>
		        <Column
		        title="报修地址"
		        dataIndex="fAddress"
		        key="fAddress"/>
		        <Column
		        title="工单描述"
		        dataIndex="fEdesc"
		        key="fEdesc"/>
		        <Column
		        title="运维工程师"
		        dataIndex="fSerperson"
		        key="fSerperson"/>
		        <Column
		        title="工单状态"
		        dataIndex="showstate"
		        key="showstate"/>
				</Table>
				<Pagination 
					size="small" 
					total={this.state.total} 
					current={this.state.page}
					pageSize={this.state.row}
					pageSizeOptions={['4','10','12','14','16','18','20']}
					showSizeChanger 
					showQuickJumper 
					showTotal={(total, range) => `共 ${total} 条`}
          />
			</div>
		)
	}
}