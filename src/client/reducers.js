import { i18nReducer as i18n } from 'react-redux-i18n';
import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  i18n,
  form,
  router: routerReducer,
});
