import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Modal } from 'antd'

class CustomModal extends Component {
  render() {
    const { isMobile } = this.props.size
    return (
      <Modal 
        className="custom-modal"
        width={this.props.width}
        maskClosable={false}
        {...this.props}>
        {this.props.children}
        {
          isMobile && <style>{`
            .ant-modal {
              margin: 0;
              padding: 0;
              top: 0;
              width: 100%!important;
            }
            .ant-modal div {
              border-radius: 0!important;
              box-shadow: none!important;
            }
            .ant-modal-mask {
              background-color: #fff;
            }
          `}</style>
        }
      </Modal>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(CustomModal)