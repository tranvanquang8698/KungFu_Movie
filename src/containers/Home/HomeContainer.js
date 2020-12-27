import React, {Component} from 'react';
import {connect} from 'react-redux';
import HomeComponent from '../../components/Home/HomeComponent';

export class HomeContainer extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
