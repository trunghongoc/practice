import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import * as Constants from './../constants/var'
import Input from './../components/Input'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userAction from './../actions/user'

import { Redirect } from 'react-router-dom'

function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
      actRedux: bindActionCreators(userAction, dispatch)
  }
}

class LoginForm extends Component {
    state = {
        mail: '',
        user_password: ''
    }

    reset = () => {
        const state = {
            mail: '',
            user_password: ''
        }
        this.setState({...state})
    }

    handleSubmit = (values) => {
        axios.post(Constants.loginRoute, this.state)
        .then(
            (res) => { this.loginSuccess(res); },
            (error) => { Constants.mess.show('error', 'Lỗi'); }
        );
    }

    loginSuccess = (res) => {
        let data = res.data
        if (data.result) {
            let user = {
                loged: true,
                ...data.user
            }
            localStorage.setItem('user', JSON.stringify(user))
            this.props.actRedux.actSetUser(user)
            Constants.mess.show()
        } else {
            Constants.mess.show('error', 'Tài khoản hoặc mật khẩu không chính xác')
        }
    }

    onChangeValue = (name, value) => {
        var obj  = {}
        obj[name] = value
        this.setState({
            ...obj
        })
    }


  render() {
    let { mail, user_password } = this.state

    const { userRedux } = this.props
    if (userRedux.loged) {
      return <Redirect to="/users"/>
    }

    return (
      <div className="login-form">
        <p className="text-center">Let's get started. Please Login.</p>

        <Input onChangeValue={this.onChangeValue} value={mail} kind="input" classList="mr-t-10" label="Email" placeholder="" name="mail" type="email" iconName="mail"/>
        <Input onChangeValue={this.onChangeValue} value={user_password} kind="input" classList="mr-t-10" label="Password" placeholder="" name="user_password" type="password" iconName="key"/>

        <div className="mr-t-20 text-right">
            <Button type="primary" onClick={this.handleSubmit}>Login</Button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
