import React, { Component } from 'react';

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

class UserCreate extends Component {

  state = {
      mail: '',
      user_password: '',
      user_name: '',
      position: ''
  }

  reset = () => {
      const state = {
        mail: '',
        user_password: '',
        user_name: '',
        position: ''
      }
      this.setState({...state})
  }

  render() {
    const { userRedux } = this.props
    if (!userRedux.loged) {
      return <Redirect to="/login"/>
    }

    return (
      <div>
        <User typeForm="create"/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate)
