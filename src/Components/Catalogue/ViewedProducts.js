import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class ViewedProducts extends Component {
  position = 0;
  length = this.props.viewedProducts.length >= 5 ? 5 : this.props.viewedProducts.length;
  state = {
    visArr: this.props.viewedProducts.filter((item, i) => i < this.length)
  };

  arrowHandler = (e) => {
    const list = this.props.viewedProducts;
    if (list.length <= 5) {
      return;
    }
    const dir = e.currentTarget.classList.contains('overlooked-slider__arrow_left') ? -1 : 1;
    let shift = this.position + dir;
    const newArr = this.state.visArr;
    if (shift < 0) {
      shift = list.length - 1;
    } else if (shift >= list.length) {
      shift = 0;
    }
    if (dir === -1) {
      newArr.shift();
      newArr.push(list[shift])
    } else {
      newArr.pop();
      newArr.unshift(list[list.length - (shift || list.length)])
    }
    this.position = shift;
    console.log(shift);
    this.setState({
      visArr: newArr
    })
  };

  render() {
    if(!this.length) {
      return null;
    }
    return (
      <section className="product-card__overlooked-slider">
        <h3>Вы смотрели:</h3>
        <div className="overlooked-slider">
          <div className="overlooked-slider__arrow overlooked-slider__arrow_left arrow" onClick={this.arrowHandler}/>
          {(this.state.visArr || []).map((prod) => {
            return (
              <div key={prod.id}
                className="overlooked-slider__item"
                style={{backgroundImage: `url(${prod.images[0]})`}}
              >
                <Link to={`/category/${prod.categoryId}/product/${prod.id}`}
                />
              </div>
            )
          })}
          <div className="overlooked-slider__arrow overlooked-slider__arrow_right arrow" onClick={this.arrowHandler}/>
        </div>
      </section>
    )
  }
}
