import React, {Component} from 'react';

export default class ImagesSlider extends Component {
  state = {
    position: 0,
  };

  setImg = (e, index) => {
    e.preventDefault();
    this.props.handler(index);
  };

  arrowHandler = (e) => {
    const dir = e.currentTarget.classList.contains('favourite-product-slider__arrow_up') ? -1 : 1;
    const shift = this.state.position + dir;
    if (shift < 0 || shift > this.props.images.length - 3) {
      return false;
    } else {
      this.setState({
        position: shift,
      })
    }
  };

  render() {
    return (
      <section className="main-screen__favourite-product-slider">
        <div className="favourite-product-slider">
          <div
            className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"
            onClick={this.arrowHandler}/>
          {this.props.images.map((item, i, images) => {
            if(i >= 3) {
              return null;
            }
            return (
              <div
                key={i}
                className="favourite-product-slider__item"
                style={{backgroundImage: `url(${images[i + this.state.position]})`}}
              >
                <a href="" onClick={(e) => this.setImg(e, i)}/>
              </div>
            )
          })}
          <div
            className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"
            onClick={this.arrowHandler}/>
        </div>
      </section>
    )
  }
}
