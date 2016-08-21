import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Indicator from './Indicator.jsx';

describe('(Component) Indicator', () => {
  it('test render number', () => {
    const wrapper = shallow(
      <Indicator name="key" />
    );
    expect(wrapper.children()).to.have.length(1);
  });
});
