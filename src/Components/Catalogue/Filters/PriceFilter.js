import React, {Component} from 'react';
import rangeSlider from './rangeSlider';

class PriceFilter extends Component {
  sliderElem;
  thumbMin;
  thumbMax;
  colorLine;

  componentDidMount() {
    rangeSlider(this.sliderElem, this.thumbMin, this.thumbMax, this.colorLine)
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
                <div className="circle-1" ref={el => this.thumbMin = el}/>
                <div className="line-colored" ref={el => this.colorLine = el}/>
                <div className="circle-2" ref={el => this.thumbMax = el}/>
              </div>
            </div>
            <div className="counter">
              <input type="text" className="input-1" defaultValue="1000"/>
              <div className="input-separator"/>
              <input type="text" className="input-2" defaultValue="30 000"/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PriceFilter;

