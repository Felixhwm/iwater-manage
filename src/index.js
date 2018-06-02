import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import '@/style/index.scss';
import 'antd/dist/antd.less'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'

import fastclick from 'fastclick'
fastclick.attach(document.body)

const render = Component => {
  ReactDOM.render(
  	<LocaleProvider locale={zhCN}>
	    <AppContainer>
        <Provider store={store}>
	        <Component/>
        </Provider>
	    </AppContainer>
	  </LocaleProvider>,
    document.getElementById('root')
  )
}

render(App);

if(module.hot) {
  module.hot.accept('./App.jsx',() => {
    render(App);
  });
}
registerServiceWorker();

