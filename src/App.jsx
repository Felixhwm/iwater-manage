import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { windowResize } from '@/store/actions'
import Login from './pages/base/login';
import App from './pages/base/app';
import './App.css'

class component extends React.Component {
  componentDidMount() {
		window.onresize = () => {
			this.getClientData();
    }
	}
	getClientData = () => {    // 获取当前浏览器宽度并设置responsive管理响应式 
		const data = {
      isMobile: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
      width: document.body.clientWidth,
      isSmallScreen:  document.body.clientWidth <= 992
    };
    this.props.windowResize(data);
	}
  render() {
    return ( 
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" push />} />     
          <Route path="/login" component={Login} />   
          <Route path="/app" component={App} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  windowResize: bindActionCreators(windowResize, dispatch),
})

export default connect(mapStateToProps,mapDispatchToProps)(component)