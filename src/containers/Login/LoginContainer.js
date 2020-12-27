import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginComponent from '../../components/Login/LoginComponent';

export class LoginContainer extends Component {
  render() {
    return <LoginComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};
import moduleName from '../../components/Login/LoginComponent';

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
