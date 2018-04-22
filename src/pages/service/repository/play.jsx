import React, { Component } from 'react'
import { Col, Row, Button, Slider } from 'antd'
import Breadcrumb from '@components/breadcrumb'
import { getStore } from '@utils'

export default class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: '',
      videoInfo: {},
      controlInfo: {
        value: 0,
        tipFormatter: ''
      }
    }
  }
  
  componentDidMount() {
    const video = document.getElementById('video');
    this.setState({
      video,
      videoInfo: getStore('data', true)
    })
  }
  back = () => {
    this.props.history.replace('/app/service/respository')
  }
  render() {
    const { readPath, fileName } = this.state.videoInfo;
    const { value, tipFormatter } = this.state.controlInfo;
    return (
      <div>
        <Breadcrumb first="服务中心" second="知识库">
          <Button type="primary" onClick={this.back}>返回</Button>
        </Breadcrumb>
        <Row type="flex" justify="center">
          <Col span={22}>
            <video src={ readPath+fileName  || ''} id="video" className="video"></video>
            <div className="control-bar">
              <Slider defaultValue={value} tipFormatter={tipFormatter}/>
            </div>
            <style>{`
              .video {
                width: 100%;
                background-color: #000;
              }
            `}</style>
          </Col>
        </Row>
        
      </div>
    )
  }
}
