import React, {
  Component,
  PropTypes,
} from 'react';
import Swipeable from 'react-swipeable';
import classNames from 'classnames/bind';
import styles from './Swiper.scss';

const cx = classNames.bind(styles);

const LOCATION_AUTOMATION = {
  LOCATION_MID: {
    LEFT: 'LOCATION_RIGHT',
    RIGHT: 'LOCATION_LEFT',
  },
  LOCATION_LEFT: {
    LEFT: 'LOCATION_MID',
    RIGHT: 'LOCATION_LEFT',
  },
  LOCATION_RIGHT: {
    LEFT: 'LOCATION_RIGHT',
    RIGHT: 'LOCATION_MID',
  },
};

class Swiper extends Component {

  static propTypes = {
    left: PropTypes.arrayOf(PropTypes.object),
    right: PropTypes.arrayOf(PropTypes.object),
    children: React.PropTypes.element.isRequired,
  };

  static defaultProps = {
    left: [],
    right: [],
  }

  constructor(props) {
    super(props);
    this.location = 'LOCATION_MID';
  }

  onSwipingLeft() {
    if (this.on) {
      return;
    }
    this.on = true;
    this.swip('LEFT');
    return;
  }

  onSwipedLeft() {
    this.on = false;
  }

  onSwipingRight() {
    if (this.on) {
      return;
    }
    this.on = true;
    this.swip('RIGHT');
    return;
  }

  onSwipedRight() {
    this.on = false;
  }

  changeLocation(direction) {
    return LOCATION_AUTOMATION[this.location][direction];
  }

  swip(direction) {
    const {
      left,
      right
    } = this.props;
    const oldLocation = this.location;
    const curLocation = this.changeLocation(direction);
    const width = this.refs.content.offsetWidth;
    let btnWidth;
    if (curLocation === 'LOCATION_MID') {
      if (oldLocation === 'LOCATION_LEFT') {
        if (left.length <= 0)
          return;
        btnWidth = 0;
        this.refs.left.style.width = `0px`;
        this.refs.content.style.left = `0px`;
      } else if (oldLocation === 'LOCATION_RIGHT') {
        if (right.length <= 0)
          return;
        btnWidth = 0;
        this.refs.right.style.width = `0px`;
        this.refs.content.style.left = `0px`;
      }
    } else if (curLocation === 'LOCATION_RIGHT') {
      if (oldLocation === 'LOCATION_MID') {
        if (right.length <= 0)
          return;
        btnWidth = (width / 5) * right.length;
        this.refs.right.style.width = `${btnWidth}px`;
        this.refs.content.style.left = `-${btnWidth}px`;
      }
    } else if (curLocation === 'LOCATION_LEFT') {
      if (oldLocation === 'LOCATION_MID') {
        if (left.length <= 0)
          return;
        btnWidth = (width / 5) * left.length;
        this.refs.left.style.width = `${btnWidth}px`;
        this.refs.content.style.left = `${btnWidth}px`;
      }
    }
    this.location = curLocation;
    return;
  }

  renderBtn(btns, ref) {
    return (
      <div
        ref={ref}
        className = {cx('swiper-actions', `swiper-actions-${ref}`)} >
        {
            btns.map((btn, i) => (
                <div
                    key={i}
                    className={cx('swiper-btn')}
                    style={btn.style}
                    onClick = {btn.onPress.bind(btn)}>
                    <div className={cx('swipter-btn-text')}>
                        {btn.text}
                    </div>

                </div>
            ))
        }
       </div>
    );
  }

  render() {
    const {
      left,
      right,
      children,
    } = this.props;
    return (
      <Swipeable
          onSwipingLeft ={ this.onSwipingLeft.bind(this)}
          onSwipedLeft = { this.onSwipedLeft.bind(this)}
          onSwipingRight = {this.onSwipingRight.bind(this)}
          onSwipedRight = { this.onSwipedRight.bind(this)}
          className = {cx('swiper')}
      >
          <div className = {cx('swiper-content')}
               ref = 'content' >
            {
              children
            }
          </div>
          { this.renderBtn(left, 'left')}
          { this.renderBtn(right, 'right')}
      </Swipeable>
    );
  }
}

export default Swiper;
