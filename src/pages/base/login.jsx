import React from 'react';
import md5 from 'js-md5';
import { login } from '../../api'
import { setCookie } from '../../utils'
import '../../style/pages/login.scss'
import Logo1 from '../../style/imgs/logo.png'
import Logo2 from '../../style/imgs/logo_text.jpg'
import Logo3 from '../../style/imgs/logo_name.jpg'
import { Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component {
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
        	setCookie('token', res.token, 1);
        	setCookie('fRoleid', res.user.fRoleid, 1);
        	setCookie('userid', res.user.fPid, 1);
        	setCookie('username', res.user.fName, 1);
        	setCookie('rolename', res.user.rolename, 1);
        	setCookie('areaids', res.areaids, 1);
        	setCookie('fBrno', res.user.fBrno, 1);
        	this.props.history.push('/app');
        }else {
        	message.error('用户名或密码错误！');
        }
      }
    });
  }
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="bg">
				<img src={Logo3} className="logo-name" alt="logo"/>
				<Form onSubmit={this.handleSubmit} className="login-form">
					<img src={Logo1} className="logo1" alt="logo"></img>
					<img src={Logo2} className="logo2" alt="logo"></img>
					<FormItem>
	          {getFieldDecorator('name', {
	            rules: [{ required: true, message: '请输入用户名！' }],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: '请输入密码！' }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
	          )}
	        </FormItem>
	        <FormItem>
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
				<span className="text">版权所有 Copyright(C)2017 沪ICP备14022390号 上海碧兰环保技术开发有限公司</span>
			</div>
		)
	}
}
const Login = Form.create()(LoginForm);

export default Login