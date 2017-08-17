import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import Wrapper from 'wrappers/wrapper';

import routes from './routes';
import renderRoutes from '../common/renderRoutes';

require('../../assets/styles/index.scss');
require('isomorphic-fetch');

export default class App extends Component {
  render() {
    return (
      <Wrapper store={this.props.store}>
        <ConnectedRouter basename="/" history={this.props.history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Wrapper>
    );
  }
}
