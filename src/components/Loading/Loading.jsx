import React, {
  Component,
  PropTypes,
} from 'react';
import classNames from 'classnames/bind';
import loadingImg from './assets/loading.gif';
import styles from './Loading.scss';

const cx = classNames.bind(styles);

class Loading extends Component {

  static propTypes = {
    /* height: PropTypes.number,*/
    /* width: PropTypes.number,*/
    show: PropTypes.bool,
  }

  static defaultProps = {
    /* height: document.body.scrollHeight,*/
    /* width: document.body.scrollWidth,*/
    show: false,
  }

  render() {
    const {
      /* height,*/
      /* width,*/
      show,
    } = this.props;
    const style = {
      /* height: `${height}px`,*/
      /* width: `${width}px`,*/
      display: show ? 'inline' : 'none',
    };
    return (
      <div style={style} className={cx('loading')}>
        <img src={loadingImg} className={cx('img')} />
      </div>
    );
  }
}

export default Loading;
