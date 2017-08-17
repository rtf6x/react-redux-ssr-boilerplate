import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setLocale } from 'react-redux-i18n';
import { connect } from 'react-redux';
import logger from 'services/logger';
// import cookieStorage from 'services/cookieStorage';

@connect(
  state => {
    return {
      locale: state.i18n.locale,
    };
  },
  dispatch => ({ dispatch }),
)
class LanguageSelect extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    listIsVisible: false,
  };

  handleChange(key) {
    logger.info('LanguageSelect:', key);
    cookieStorage.set('react-intl-locale', key);
    this.props.dispatch(setLocale(key, true));
  }

  showList = e => {
    // logger.info('showList');
    this.setState({ listIsVisible: true });
  };

  hideList = e => {
    // logger.info('hideList');
    this.setState({ listIsVisible: false });
  };

  render() {
    const languages = [{ id: 'en', name: 'En' }, { id: 'ru', name: 'Ru' }];

    const { locale } = this.props;
    const { listIsVisible } = this.state;

    return (
      <nav className='languageSelect' onMouseEnter={this.showList} onMouseLeave={this.hideList}>
        <div className='container'>
          <ul className='languageSelect__list'>
            <li className='languageSelect__list_item'>{locale}</li>
            {listIsVisible ? languages.map(e =>
              e.id !== locale ? <li
                onClick={() => this.handleChange(e.id)}
                className='languageSelect__list_item pointer'
                key={e.id}>
                {e.name}
              </li> : null,
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}

export default LanguageSelect;
