import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import util from 'core/util';
import styles from './DepPicker.scss';

const cx = classNames.bind(styles);
const urlParams = util.url.parse(location.search) || {};
const corpId = urlParams.corpId;

const propTypes = {
  className: PropTypes.string,
  deptName: PropTypes.string,
  deptId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};
class DepPicker extends Component {

  constructor() {
    super();
    this.openPicker = this.openPicker.bind(this);
    this.selectTop = this.selectTop.bind(this);
  }

  selectTop() {
    this.props.onChange({
      name: '全公司',
      id: 1,
    });
  }

  openPicker() {
    const { onChange } = this.props;
    dd.biz.contact.complexChoose({
      corpId,
      startWithDepartmentId: 0,
      selectedUsers: [],
      onSuccess(result) {
        if (result.departments.length > 0) {
          onChange(result.departments[0]);
        } else {
          dd.device.notification.alert({
            title: '提示',
            message: '请选择部门',
          });
        }
      },
    });
  }

  render() {
    const { deptId, deptName } = this.props;
    const isTop = deptId === 1;
    return (
      <div className="row">
        <div className="col-xs-6">
          <div onClick={this.selectTop} className={cx({ btn: true, 'btn-primary': isTop })}>
            全公司
          </div>
        </div>
        <div className="col-xs-6">
          <div onClick={this.openPicker} className={cx({ btn: true, 'btn-primary': !isTop })}>
            {isTop ? '选择部门' : deptName}
          </div>
        </div>
      </div>

    );
  }
}

DepPicker.propTypes = propTypes;

export default DepPicker;
