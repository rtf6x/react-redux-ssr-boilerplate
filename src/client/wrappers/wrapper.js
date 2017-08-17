import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import NoSSR from 'react-no-ssr';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import DevTools from 'components/devTools';

const translations = {};

export default class Wrapper extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { store } = this.props;
    syncTranslationWithStore(store);
    if (typeof window === 'undefined') {
      store.dispatch(loadTranslations(translations));
      if (!store.getState().i18n.locale) {
        const locale = cookieStorage.get('react-intl-locale');
        cookieStorage.set('react-intl-locale', locale || 'en');
        store.dispatch(setLocale(locale || 'en'));
      }
    }
  }

  renderDevToolsComponent() {
    const { store } = this.props;

    if (_development_ && (typeof window === 'undefined' || (typeof window === 'object' && !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__))) {
      return (<DevTools store={store} />);
    }

    return null;
  }

  // all React property providers go here.
  // e.g. redux Provider, react-intl IntlProvider.
  render() {
    const { store } = this.props;
    return (
      <div>
        <NoSSR>
          {this.renderDevToolsComponent()}
        </NoSSR>
        <Provider store={store}>
          {this.props.children}
        </Provider>
      </div>
    );
  }
}
