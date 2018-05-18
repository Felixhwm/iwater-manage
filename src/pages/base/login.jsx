import React from 'react';
import md5 from 'js-md5';
import { login } from '@/api'
import { setStore } from '@/utils'
import '@/style/pages/login.scss'
import { Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = {
			clientWidth: document.body.clientWidth
		}
	}
	componentDidMount() {
		window.onresize = () => {
      this.setState({
        clientWidth: document.body.clientWidth
      })
    }
	}
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async(err, values) => {
      if (!err) {
      	console.log(values)
        const res = await login({
        	name: values.name,
          password: md5(values.password)
        });
        if (res.rspCode === '00') {
        	setStore('token', res.token);
        	setStore('fRoleid', res.user.fRoleid);
        	setStore('userid', res.user.fPid);
        	setStore('username', res.user.fName);
        	setStore('rolename', res.user.rolename);
        	setStore('areaids', res.areaids);
        	setStore('fBrno', res.user.fBrno);
        	this.props.history.push('/app');
        }else {
        	message.error('用户名或密码错误！');
        }
      }
    });
  }
	render() {
		const isMobile = this.state.clientWidth <= 992;
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="bg">
				{/* <img src={require('@imgs/logo_name.jpg')} className="logo-name" alt="logo" style={{width: isMobile&&'100%'}}/> */}
					<Form onSubmit={this.handleSubmit} className="login-form">
						<img src={require('@/style/imgs/logo.png')} className="logo1" alt="logo"></img>
						<img src={require('@/style/imgs/logo_text.jpg')} className="logo2" alt="logo"></img>
						<FormItem>
							{getFieldDecorator('name', {
								initialValue: 'admin',
								rules: [{ required: true, message: '请输入用户名！' }],
							})(
								<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
								initialValue: '111111',
								rules: [{ required: true, message: '请输入密码！' }],
							})(
								<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
							)}
						</FormItem>
						<FormItem style={{marginBottom: 0}}>
							{/*getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(
								<Checkbox>记住用户</Checkbox>
							)*/}
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</FormItem>
					</Form>
					{
						isMobile ? ( 
						<div className="copy-right">
							<p>版权所有 Copyright(C)2015</p>
							<p>上海碧兰环保技术开发有限公司</p>
						</div>
						) : (<p className="copy-right">版权所有 Copyright(C)2015 上海碧兰环保技术开发有限公司</p>)
					}
				
			</div>
		)
	}
}
const Login = Form.create()(LoginForm);

export default Login
