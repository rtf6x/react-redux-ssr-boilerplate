import React from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import { Helmet } from 'react-helmet';
import renderRoutes from '../../common/renderRoutes';

const AppView = props => {
  return (
    <div className='global'>
      <Helmet>
        <title>Test</title>
        <meta charSet="utf8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no"/>
      </Helmet>

      {renderRoutes(props.route.routes)}
    </div>
  );
};

AppView.propTypes = {
  children: PropTypes.object,
};

export default pureRender(AppView);
