import React from 'react';
import '../../style/pages/login.scss'
import Logo from '../../style/imgs/login_logo.png'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


class LoginForm extends React.Component {
	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //this.props.history.push('/app');
      }
    });
  }
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="bg">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<img src={Logo} className="logo"></img>
					<FormItem>
	          {getFieldDecorator('userName', {
	            rules: [{ required: true, message: '请输入用户名！' }],
	          })(
	            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('password', {
	            rules: [{ required: true, message: 'Please input your Password!' }],
	          })(
	            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
	          )}
	        </FormItem>
	        <FormItem>
	          {getFieldDecorator('remember', {
	            valuePropName: 'checked',
	            initialValue: true,
	          })(
	            <Checkbox>记住用户</Checkbox>
	          )}
	          <Button type="primary" htmlType="submit" className="login-form-button">
	            登录
	          </Button>
	        </FormItem>
				</Form>
			</div>
		)
	}
}
const Login = Form.create()(LoginForm);

export default Login