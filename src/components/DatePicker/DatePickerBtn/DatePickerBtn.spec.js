import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import moment from 'moment';
import DatePickerBtn from './DatePickerBtn.jsx';

describe('<DatePickerBtn />', () => {
  it('render correctly without props', () => {
    const wrapper = shallow(
      <DatePickerBtn text="昨日" />
    );
    expect(wrapper.hasClass('btn')).to.equal(true);
    expect(wrapper.hasClass('active')).to.equal(false);
    expect(wrapper.is('div')).to.equal(true);
    expect(wrapper.text()).to.equal('昨日');
  });

  it('render className correctly with props', () => {
    const wrapper = shallow(
      <DatePickerBtn active className="customeClz" />
    );
    expect(wrapper.hasClass('btn')).to.equal(true);
    expect(wrapper.hasClass('active')).to.equal(true);
    expect(wrapper.hasClass('customeClz')).to.equal(true);
  });

  describe('click and then callback correctly', () => {
    const assertCallback = (spy, expectMode, expectStartDate, expectEndDate) => {
      expect(spy.calledOnce).to.equal(true);
      const dateOptions = spy.args[0][0];
      expect(dateOptions.mode).to.equal(expectMode);
      expect(dateOptions.startDate.isSame(expectStartDate, expectMode)).to.equal(true);
      expect(dateOptions.startDate.isSame(expectEndDate, expectMode)).to.equal(true);
    };
    it('click when props using default mode and value', () => {
      const spies = {};
      spies.onSelect = sinon.spy();
      const wrapper = shallow(
        <DatePickerBtn onSelect={spies.onSelect} />
      );
      wrapper.simulate('click');
      expect(spies.onSelect.calledOnce).to.equal(true);
      const dateOptions = spies.onSelect.args[0][0];
      expect(dateOptions.mode).to.equal('day');
      expect(dateOptions.startDate).to.equal(dateOptions.endDate);
      expect(dateOptions.startDate.isSame(moment(), 'day')).to.equal(true);
    });

    it('click with mode equal day callback', () => {
      const spies = {};
      spies.onSelect = sinon.spy();
      const mode = 'day';
      const diffDay = -1;
      const wrapper = shallow(
        <DatePickerBtn mode={mode} value={diffDay} onSelect={spies.onSelect} />
      );
      wrapper.simulate('click');
      assertCallback(spies.onSelect, mode,
        moment().add(diffDay, mode),
        moment().add(diffDay, mode));
    });

    it('click with mode equal week callback', () => {
      const spies = {};
      spies.onSelect = sinon.spy();
      const mode = 'week';
      const diffDay = 6;
      const wrapper = shallow(
        <DatePickerBtn mode={mode} value={diffDay} onSelect={spies.onSelect} />
      );
      wrapper.simulate('click');
      assertCallback(spies.onSelect, mode,
        moment().add(diffDay, mode),
        moment().add(diffDay, mode));
    });

    it('click with mode equal week callback', () => {
      const spies = {};
      spies.onSelect = sinon.spy();
      const mode = 'month';
      const diffDay = -8;
      const wrapper = shallow(
        <DatePickerBtn mode={mode} value={diffDay} onSelect={spies.onSelect} />
      );
      wrapper.simulate('click');
      assertCallback(spies.onSelect, mode,
        moment().add(diffDay, mode),
        moment().add(diffDay, mode));
    });
  });
});
