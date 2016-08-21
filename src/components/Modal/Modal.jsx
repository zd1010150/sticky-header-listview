import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.scss';

const cx = classNames.bind(styles);

const propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func,
  closeBtn: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onCancel: PropTypes.func,
  onOK: PropTypes.func,
};
const defaultProps = {
  visible: false,
  onClose() {},
  onCancel() {},
  onOK() {},
  closeBtn: (<i className="bi-icon bi-icon-close" />),
};

const Modal = (props) => {
  const { visible, title, children, onClose, onOK, onCancel, closeBtn } = props;
  return (
    <div className={cx({ 'modal-mask': true, active: visible })}>
      <div className={cx('modal')}>
        <div className={cx('close-btn')} onClick={onClose}>
          {closeBtn}
        </div>
        <div className={cx('header')}>{title}</div>
        <div className={cx('body')}>
          {children}
        </div>
        <div className={cx('footer', 'row')}>
          <div className="col-xs-6" onClick={onCancel}>取消</div>
          <div className="col-xs-6 text-primary" onClick={onOK}>确定</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
