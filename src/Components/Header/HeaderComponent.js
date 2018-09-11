import React, {Component} from 'react';
import Header from './Header';
import {withRouter} from 'react-router-dom';

class HeaderComponent extends Component {
  render() {
    return <Header {...this.props}/>
  }
}

export default withRouter(HeaderComponent);
