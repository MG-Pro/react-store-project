import React, {Component} from 'react';


class PriceFilter extends Component {
  minPrice = 0;
  maxPrice = 100000;
  contWidth = 211;

  getPositionFromPrice = (price) => {
    return (price / this.maxPrice) * this.contWidth;
  };

  getPriceFromPosition = (pos) => {
    const a = pos / this.contWidth * this.maxPrice / 100;
    return Math.round(a) * 100;
  };

  state = {
    start: this.getPositionFromPrice(this.minPrice),
    end: this.getPositionFromPrice(this.maxPrice),
    minPrice: this.minPrice,
    maxPrice: this.maxPrice,
  };

  componentDidMount() {
    this.drag = false;
    this.min = parseInt(getComputedStyle(this.thumbMin).left);
    this.max = parseInt(getComputedStyle(this.thumbMax).left);
    this.sliderCoords = PriceFilter.getCoords(this.sliderElem);
    this.contWidth = this.sliderElem.offsetWidth - this.thumbMin.offsetWidth;

    this.thumbMin.addEventListener('mousedown', this.mouseDownHandler);
    this.thumbMax.addEventListener('mousedown', this.mouseDownHandler);
    document.addEventListener('mouseup', this.mouseUpHendler);
    document.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    this.thumbMin.ondragstart = () => false;
    this.thumbMax.ondragstart = () => false;
  }

  mouseDownHandler = (e) => {
    this.thumb = e.currentTarget;
    this.shiftX = e.pageX - PriceFilter.getCoords(this.thumb).left;
    this.drag = true;
  };

  mouseMoveHandler = (e) => {
    if (!this.drag) {
      return;
    }
    const thumb = this.thumb;
    let newLeft = e.pageX - this.shiftX - this.sliderCoords.left;
    if (thumb.classList.contains('circle-1')) {
      if (newLeft < 0) {
        newLeft = 0;
      }
      if (newLeft > this.max - thumb.offsetWidth / 2) {
        newLeft = this.max - thumb.offsetWidth / 2;
      }
      this.min = newLeft;
      this.setState({
        start: newLeft,
        minPrice: this.getPriceFromPosition(newLeft),
      });
    } else {
      if (newLeft < this.min + thumb.offsetWidth / 2) {
        newLeft = this.min + thumb.offsetWidth / 2;
      }
      if (newLeft > this.contWidth) {
        newLeft = this.contWidth;
      }
      this.max = newLeft;
      this.setState({
        end: newLeft,
        maxPrice: this.getPriceFromPosition(newLeft),
      });
    }
  };

  mouseUpHendler = () => {
    if(!this.drag) {
      return;
    }
    this.props.filterHandler({
      minPrice: this.getPriceFromPosition(this.state.start),
      maxPrice: this.getPriceFromPosition(this.state.end)
    });
    this.drag = false;
  };

  static getCoords = (elem) => {
    const box = elem.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
      left: box.left + window.pageXOffset
    };
  };

  getLinePosition = (start, end) => {
    const x1 = start + 5;
    const x2 = end + 5;
    return {
      left: x1 + 'px',
      width: (x2 - x1) + 'px'
    };
  };

  inputHandler = () => {
    let x1 = this.inputMin.value;
    let x2 = this.inputMax.value;
    if(x1 < this.minPrice) {
      x1 = this.minPrice;
    }
    if(x2 > this.maxPrice) {
      x2 = this.maxPrice;
    }
    this.setState({
      start: this.getPositionFromPrice(x1),
      end: this.getPositionFromPrice(x2),
      minPrice: x1,
      maxPrice: x2,
    });
    this.props.filterHandler({
      minPrice: x1,
      maxPrice: x2,
    })
  };

  componentWillUnmount() {
    this.thumbMin.removeEventListener('mousedown', this.mouseDownHandler);
    this.thumbMax.removeEventListener('mousedown', this.mouseDownHandler);
    document.removeEventListener('mouseup', this.mouseUpHendler);
    document.onmousemove = false;
  }

  render() {
    return (
      <section className="sidebar__division">
        <div className="sidebar__price">
          <div className="sidebar__division-title">
            <h3>Цена</h3>
          </div>
          <div className="price-slider">
            <div className="circle-container">
              <div className="line-white" ref={el => this.sliderElem = el}>
                <div
                  className="circle-1"
                  ref={el => this.thumbMin = el}
                  style={{left: this.state.start + 'px'}}
                />
                <div
                  className="line-colored"
                  style={this.getLinePosition(this.state.start, this.state.end)}
                />
                <div
                  className="circle-2"
                  ref={el => this.thumbMax = el}
                  style={{left: this.state.end + 'px'}}
                />
              </div>
            </div>
            <div className="counter">
              <input
                type="text"
                className="input-1"
                ref={el => this.inputMin = el}
                value={this.state.minPrice}
                onChange={this.inputHandler}
              />
              <div className="input-separator"/>
              <input
                type="text"
                className="input-2"
                ref={el => this.inputMax = el}
                value={this.state.maxPrice}
                onChange={this.inputHandler}
              />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PriceFilter;

