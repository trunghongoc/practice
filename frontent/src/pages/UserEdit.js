import React, { Component } from 'react';
import { Button, message } from 'antd';
import { Link } from 'react-router-dom';
import * as Constants from '../constants/var'
import axios from 'axios';

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import User from './../form/User'


function mapStateToProps(state: Object): Object {
  return {
    userRedux: state.userRedux.user
  }
}

function mapDispatchToProps(dispatch: Function): Object {
  return {
  }
}

class UserEdit extends Component {

  state = {
      mail: '',
      user_password: '',
      user_name: '',
      position: '',
      user_id: ''
  }

  reset = () => {
      const state = {
        mail: '',
        user_password: '',
        user_name: '',
        position: '',
        user_id: ''
      }
      this.setState({...state})
  }

  render() {
    const { user_id } = this.state
    const { userRedux } = this.props
    // if (!userRedux.loged) {
    //   return <Redirect to="/login"/>
    // }

    return (
      <div>
        <User typeForm="edit" {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)
