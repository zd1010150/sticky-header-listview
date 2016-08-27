import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import classNames from 'classnames/bind';
import Spinner from './Spinner.jsx';
import styles from './Spinner.scss';

const cx = classNames.bind(styles);

describe('<Spinner />', () => {
  it('render correctly with props', () => {
    const wrapper = shallow(
      <Spinner text="2016年" number={2016} />
    );
    const classes = cx('spinner');
    expect(wrapper.hasClass(classes)).to.equal(true);
    expect(wrapper.is('div')).to.equal(true);
    expect(wrapper.html()).to.equal(
      `<div class="${classes}"><i class="bi-icon bi-icon-left">` +
      '</i><span>2016年</span><i class="bi-icon bi-icon-right"></i></div>'
    );
    expect(wrapper.find('span').text()).to.equal('2016年');
  });

  describe('click and then callback correctly', () => {
    it('click inc and then add by one', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Spinner text="7月" number={7} onChange={onChange} />
      );
      wrapper.find('.bi-icon-right').simulate('click');
      expect(onChange.calledOnce).to.equal(true);
      expect(onChange.calledWith(8)).to.equal(true);
    });
    it('click dec and then sub by one', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(
        <Spinner text="7月" number={7} onChange={onChange} />
      );
      wrapper.find('.bi-icon-left').simulate('click');
      expect(onChange.calledOnce).to.equal(true);
      expect(onChange.calledWith(6)).to.equal(true);
    });
  });
});
