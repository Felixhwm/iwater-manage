import React, { Component } from 'react'
import { Col, Row, Button, Slider, Icon, Popover, Tooltip } from 'antd'
import { sectToTime } from '@utils'
import Breadcrumb from '@components/breadcrumb'
import { getStore, launchFullscreen } from '@utils'

export default class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      video: '',
      controlShow: true,
      isFullScreen: false,
      videoInfo: {},
      controlInfo: {
        playing: false, 
        value: 0,
        tipFormatter: '',
        duration: null,
        totalTime: '',
        nowTime: '',
        volume: 100
      },
      controlToolShow: {
        soundShow: false,
        setting: false
      }
    }
  }
  componentDidMount() {
    const video = document.getElementById('video');
    const { controlInfo, isFullScreen } = this.state;
    this.setState({
      video,
      videoInfo: getStore('data', true)
    })
    video.addEventListener('canplaythrough',() => {
      controlInfo.duration = Math.floor(video.duration);
      controlInfo.totalTime = sectToTime(controlInfo.duration);
      this.setState({
        controlInfo
      })
    });
    video.addEventListener('timeupdate', () => {
      const { controlInfo } = this.state;
      controlInfo.value = video.currentTime;
      controlInfo.nowTime = sectToTime(controlInfo.value);
      if ( video.currentTime === video.duration ) {
        controlInfo.value = 0;
      }
      this.setState({
        controlInfo
      });
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.setState({
        isFullScreen: !this.state.isFullScreen,
        controlShow: true
      });
    });
    
    
  }
  triggerControl(type, e) {
    const { controlShow, isFullScreen } = this.state;
    if (type === 'enter') {
      this.setState({
        controlShow: true
      });
    } else if(type === 'move' && isFullScreen) {
      console.log(1)
      clearTimeout(this.timer);
      this.setState({
        controlShow: true
      }, () => {
        this.timer = setTimeout(() => {
          this.setState({
            controlShow: false
          })
        }, 3000);
      }) 
    }else if(type === 'leave'){
      this.setState({
        controlShow: false
      });
    }
  }
  changeStatus = () => {
    const { video } = this.state;
    if (video.paused) 
      return video.play();
    return video.pause();
  }
  changeProgress = (value) => {
    const { video } = this.state;
    video.currentTime = value;
  }
  setVolume = (volume) => {
    const { controlInfo, video } = this.state;
    video.volume = Math.floor(volume/100);
    controlInfo.volume = volume;
    this.setState({
      controlInfo
    })
  }
  
  fullScreen = () => {
    const videoBox = document.getElementsByClassName('video-container')[0];
    if(this.state.isFullScreen) {
      launchFullscreen();
    }else {
      launchFullscreen(videoBox);
    }
  }
  back = () => {
    this.props.history.replace('/app/service/respository')
  }
  render() {
    const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    const { video, isFullScreen, controlShow } = this.state;
    const { readPath, fileName, picName } = this.state.videoInfo;
    const { playing, value, tipFormatter, duration, totalTime, nowTime, volume } = this.state.controlInfo;
    return (
      <div>
        <Breadcrumb first="服务中心" second="知识库">
          <Button type="primary" onClick={this.back}>返回</Button>
        </Breadcrumb>
        <Row type="flex" justify="center">
          <Col xxl={18} xl={18 }lg={18} md={18} sm={24} xs={24}>
            <div 
              className="video-container" 
              style={{backgroundColor: isFullScreen ? '#000' : '#fff'}}
              onMouseOver={this.triggerControl.bind(this, 'enter')}
              onMouseMove={this.triggerControl.bind(this, 'move')}
              onMouseLeave={this.triggerControl.bind(this, 'leave')}>
              <video  
                //playsInline={true} 
                src={ readPath+fileName  || ''}
                id="video" 
                className="video"
                preload="load"
                poster={readPath+picName || ''}
                autoPlay={playing} 
                currenttime={value}
                controls={isMobile}
                width="100%">
              </video>
              {
                !isMobile && controlShow &&
                <div className="control-bar">
                  <Slider defaultValue={0} value={value} tipFormatter={tipFormatter} max={duration} onChange={this.changeProgress}/>
                  <div className="control flex_ca">
                    <div>
                      <Icon 
                        style={{fontSize: 30,cursor: 'pointer'}} 
                        type={video.paused ? 'play-circle-o' : 'pause-circle-o'} 
                        onClick={this.changeStatus}/>
                      <span style={{marginLeft: 20}}>{nowTime} / {totalTime}</span>
                    </div>
                    <div>
                      <Popover trigger="click" content={(
                        <Slider vertical defaultValue={volume} style={{height: 100}} onChange={this.setVolume}/>
                      )}>
                        <Icon type="sound" style={{cursor: 'pointer', fontSize: 20}}/>
                      </Popover>
                      <Icon type="setting" style={{cursor: 'pointer', fontSize: 20, marginLeft: 20}}/>
                      <Tooltip title="全屏">
                        <Icon 
                          type={isFullScreen ? 'shrink' : 'arrows-alt'} 
                          style={{cursor: 'pointer', fontSize: 20, marginLeft: 20}} 
                          onClick={this.fullScreen}/>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              }
            </div>
          </Col>
        </Row>
        
      </div>
    )
  }
}
