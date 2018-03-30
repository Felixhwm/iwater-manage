import React from 'react'

class Login extends React.Component {
	handleLogin = () => {
		this.props.history.push('/app');
	}
	render() {
		return (
			<div>
				<button onClick={this.handleLogin}>登录</button>
			</div>
		)
	}
}
export default Login