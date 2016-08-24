import React, {
  Component,
  PropTypes,
} from 'react';
import classNames from 'classnames/bind';
import {
  Link,
} from 'react-router';
import styles from './Guide.scss';
import guideImg from './assets/guide.png';

const cx = classNames.bind(styles);

class Guide extends Component {
  static propTypes = {
    targetSize: PropTypes.number,
    show: PropTypes.bool,
  };

  static defaultProps = {
    targetSize: 0,
    show: false,
  };

  hide() {
    this.guideRef.style.display = 'none';
  }

  renderBody() {
    const {
      targetSize,
    } = this.props;
    if (targetSize > 0) {
      return (
        <div className={cx('content')}>
          <div className={cx('header')}>
            已为您关注
            <span className={cx('target-size')}>{targetSize}</span>
            个关键指标
          </div>
          <div className={cx('body')}>
            每天为您推送相关数据，随时随地掌握企业动态！
          </div>
          <div className={cx('action')} onClick={this.hide.bind(this)}>
            立即查看
          </div>
        </div>
      );
    }
    return (
      <div className={cx('content')}>
        <div className={cx('header')}>
          您未关注数据指标
        </div>
        <div className={cx('body')}>
          关注后，每天可为您推送相关数据，随时随地掌握企业动态！
        </div>
        <div className={cx('action')}>
        <Link to={{ pathname: '/more' }}>
          查看更多指标
        </Link>
        </div>
      </div>
    );
  }

  render() {
    const {
      show,
    } = this.props;
    const style = {
      display: show ? 'block' : 'none',
    };

    return (
      <div style={style} className={cx('guide')} ref={(ref) => this.guideRef = ref}>
        <div className={cx('card')}>
          <img src={guideImg} className={cx('img')} />
          {
            this.renderBody()
          }
        </div>
      </div>
    );
  }
}

export default Guide;
