import axios from 'axios'
import { getStore } from '../utils'
import { message } from 'antd'

axios.defaults.timeout = 10000;

//请求拦截
axios.interceptors.request.use((config) => {
  var CancelToken = axios.CancelToken;
  var source = CancelToken.source();
  config.cancelToken = source.token;
  
  if (config.url.includes("login")) {
    return config;
  }
  if (config.method === 'post') {
    config.data.Authorization = 'Bearer '+getStore('token');
    config.data.userid = getStore('userid');
  }else if(config.method === 'get') {
    config.url +=  ('&Authorization=Bearer '+getStore('token')+'&fUserid='+getStore('userid'))
  }
  
  return config;
}, (err) => {
  message.error('身份失效，请重新登录！');
  return Promise.reject(err);
});
//响应拦截//
axios.interceptors.response.use((res) => {
  return res
  /*if(res.data.result === '10000'){
    return res;
  }else if(res.data.result === '00001'||res.data[0]==='00001'){
    this.$alert('用户信息已失效，请重新登录！', {
        confirmButtonText: '确定',
        callback: action => {
            this.$router.push('login');
        }
    });
  }else{
    this.$message.error('服务器繁忙，请稍后再试！');
  }*/
}, (err) => {
  return Promise.reject(err);
});

export default axios