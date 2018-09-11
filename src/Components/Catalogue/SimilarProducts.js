import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class SimilarProducts extends Component {
  position = 0;
  length = 3;
  state = {
    visArr: []
  };

  componentDidMount() {
    this.getList({
      type: this.props.product.type,
      color: this.props.product.color,
      category: this.props.product.categoryId
    })
  }

  componentWillReceiveProps(nextProps) {
    this.getList({
      type: nextProps.product.type,
      color: nextProps.product.color,
      category: nextProps.product.categoryId
    })
  }


  getList = (params = {}) => {
    let paramsStr = '?';
    for (let param in params) {
      paramsStr += `${param}=${params[param]}&`;
    }

    fetch(`https://neto-api.herokuapp.com/bosa-noga/products/${paramsStr}`)
      .then(res => res.json()).then(products => {
      this.length = products.data.length >= 3 ? 3 : products.data.length;
      this.setState({
        products: products.data,
        visArr: products.data.filter((item, i) => i < this.length)
      });

    }).catch(err => console.log(err));
  };

  arrowHandler = (e) => {
    const list = this.state.products;
    if (list.length <= 5) {
      return;
    }
    const dir = e.currentTarget.classList.contains('similar-products-slider__arrow_right') ? 1 : -1;
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
    if (!this.state.visArr.length) {
      return null
    }
    return (
      <section className="product-card__similar-products-slider">
        <h3>Похожие товары:</h3>
        <div className="similar-products-slider">
          <div className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"
            onClick={this.arrowHandler}/>
          {this.state.visArr.map((prod, i) => {
            return (
              <div key={i} className="similar-products-slider__item-list__item-card item">
                <div className="similar-products-slider__item">
                  <Link to={`/category/${prod.categoryId}/product/${prod.id}`}>
                    <img src={prod.images[0]} className="similar-products-slider__item-pic" alt={prod.title}/>
                  </Link>
                </div>
                <div className="similar-products-slider__item-desc">
                  <h4 className="similar-products-slider__item-name">{prod.title}</h4>
                  <p className="similar-products-slider__item-producer">Производитель:                       <span className="producer">{prod.brand}</span>
                  </p>
                  <p className="similar-products-slider__item-price">{prod.price}</p>
                </div>
              </div>
            )
          })}
          <div className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"
            onClick={this.arrowHandler}/>
        </div>
      </section>
    )
  }
}
