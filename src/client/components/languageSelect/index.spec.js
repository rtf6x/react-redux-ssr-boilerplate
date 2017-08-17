import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import expect from 'expect';
import LanguageSelect from './index';
import expectJSX from 'expect-jsx';
import en from '../../i18n/en';
expect.extend(expectJSX);

describe('LanguageSelect', () => {
  it('should render the LanguageSelect component', () => {
    const store = {
      getState() {
        return this.state;
      },
      dispatch() {
        return this.state;
      },
      subscribe() {
        return true;
      },
      state: {
        i18n: {
          translations: en,
        },
        locale: 'en',
      },
    };

    const component = ReactTestUtils.renderIntoDocument(
      <LanguageSelect store={store}/>,
    );

    expect(ReactTestUtils.isElement(<LanguageSelect/>)).toEqual(true);
    expect(ReactTestUtils.isCompositeComponent(component)).toEqual(true);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'li').length).toEqual(4);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span').length).toEqual(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span')[0].innerHTML).toEqual('Hello');
  });
});
