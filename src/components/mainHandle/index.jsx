import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { Row, Col, Button, Input } from 'antd'

class MainHandle extends Component {
  render() {
    const { width , isSmallScreen } = this.props.size
    return (
      <Row className="main-handle" type="flex" justify="space-between">
        <Col xxl={10} xl={10}lg={12} md={12} sm={24} xs={24}>
          <Button type="primary" onClick={this.props.onAdd} style={{width: 80}}>
            <i style={{backgroundImage: `url(${require('@/style/imgs/add.png')})`}}/> 添加
          </Button>
          <Button type="primary" onClick={this.props.onDelete} style={{ marginLeft: 20, width: 80 }}>
            <i style={{backgroundImage: `url(${require('@/style/imgs/del.png')})`}}/> 删除
            </Button>
          <Button type="primary" style={{ marginLeft: 20, width: 80 }}>
            <i style={{backgroundImage: `url(${require('@/style/imgs/export.png')})`}}/>导出
          </Button>
        </Col>
        <Col xxl={10} xl={10}lg={12} md={12} sm={24} xs={24} style={{textAlign: width >768 && 'right'}}>
          <Input.Search 
            placeholder="输入内容以搜索"
            style={{ height: '100%', width: isSmallScreen ? '100%' : 270 }}/>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(MainHandle)