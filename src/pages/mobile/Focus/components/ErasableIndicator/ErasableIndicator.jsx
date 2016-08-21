import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import Indicator from 'components/Indicator';
import Swiper from 'components/Swiper';

const propTypes = {
  chartGroupId: PropTypes.number,
  name: PropTypes.string.isRequired,
  cnName: PropTypes.string,
  value: PropTypes.number,
  data: PropTypes.array,
  onDelete: PropTypes.func,
  currentDateOptions: PropTypes.object,
};
const defaultProps = {
  onDelete() {},
};
const ErasableIndicator = (props) => {
  const { name, chartGroupId, cnName, value, data = [], onDelete, currentDateOptions } = props;
  const right = [{
    text: '取消关注',
    onPress() {
      onDelete(name);
    },
    style: {
      backgroundColor: '#FF3B30',
      color: 'white',
      fontSize: '16px',
    },
  }];
  let query = {
    chartGroupId,
    yField: name,
  };
  if (currentDateOptions && currentDateOptions.mode) {
    query = _.assign({}, query, {
      mode: currentDateOptions.mode,
      startDate: moment(currentDateOptions.startDate).format('YYYY-MM-DD'),
      endDate: moment(currentDateOptions.endDate).format('YYYY-MM-DD'),
    });
  }
  const toPath = {
    pathname: '/detail',
    query,
  };
  return (
    <Swiper right={right}>
      <Link to={toPath}>
        <Indicator cnName={cnName} value={value} contrast={data[0]} />
      </Link>
    </Swiper>
  );
};
ErasableIndicator.propTypes = propTypes;
ErasableIndicator.defaultProps = defaultProps;

export default ErasableIndicator;
