import React, {Component} from 'react';


export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
    this.defStyle = {
      opacity: 0,
      zIndex: 0,
      transition: `${this.props.duration / 1000}s`
    };

    this.activeStyle = {
      opacity: 1,
      zIndex: 1,
      transition: `${this.props.duration / 1000}s`
    };
    this.sliderGo = true;
  }

  mouseEnter = () => {
    this.sliderGo = false;
  };

  mouseLeave = () => {
    this.sliderGo = true;
  };

  slideClick = (e) => {
    e.preventDefault();
  };

  buttonClick = (e) => {
    this.setState({
      activeSlide: +e.currentTarget.value,
    });
  };

  slideToggle = (e) => {
    const dir = e.currentTarget.classList.contains('slider__arrow_right') ? 1 : -1;
    this.slideAction(dir);
  };

  slideAction = (dir) => {
    let position = this.state.activeSlide;
    if (position + dir >= this.props.pics.length) {
      position = -1;
    } else if (position + dir < 0) {
      position = this.props.pics.length;
    }
    this.setState({
      activeSlide: position + dir
    });
  };

  componentDidMount() {
    let start = null;
    const step = (time) => {
      if (start === null) {
        start = time;
      }
      if (time - start > this.props.delay && this.sliderGo) {
        start = null;
        this.slideAction(1);
      }
      requestAnimationFrame(step);
    };
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(step);
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
  }

  render() {
    return (
      <section className="slider">
        <div className="wrapper">
          <div className="slider__pictures">
            {this.props.pics.map((item, i) => {
              return (
                <a
                  key={`item${i}`} className="slider__image" href=""
                  style={this.state.activeSlide === i ? this.activeStyle : this.defStyle}
                  onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}
                  onClick={this.slideClick}
                >
                  <img src={item} alt="slide pic"/>
                </a>
              )
            })}
            <div
              className="arrow slider__arrow slider__arrow_left"
              onClick={this.slideToggle}
            />
            <div
              className="arrow slider__arrow slider__arrow_right"
              onClick={this.slideToggle}
            />
            <div className="slider__circles">
              {this.props.pics.map((item, i) => {
                return (
                  <button
                    key={`item${i}`} className="slider__circle" value={i}
                    style={this.state.activeSlide === i ? {opacity: 1} : {opacity: 0.5}}
                    onClick={this.buttonClick}
                  />
                )
              })}
            </div>
            <h2 className="h2">К весне готовы!</h2>
          </div>
        </div>
      </section>
    );
  }
}
