import React from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {logout} from '../../redux/actions/auth';


class Logout extends React.Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <Redirect to={'/'} />
    );
  }
}

function mapDistatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapDistatchToProps)(Logout);
