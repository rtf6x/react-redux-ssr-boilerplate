import React, { Component } from 'react';
import { StaticRouter } from 'react-router-dom';
import Wrapper from 'wrappers/wrapper';
// import { fetchGamesJson } from './pages/games/actions';

import routes from './routes';
import renderRoutes from '../common/renderRoutes';

require('../../assets/styles/index.scss');
require('isomorphic-fetch');

export default class App extends Component {
  render() {
    return (
      <Wrapper store={this.props.store}>
        <StaticRouter location={this.props.url} context={this.props.context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Wrapper>
    );
  }
}
