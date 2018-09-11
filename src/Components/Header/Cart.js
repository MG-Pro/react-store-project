import React, {Component} from 'react';
import {Link} from "react-router-dom";

export default class Cart extends Component {
  removeProduct = (e, item) => {
    e.preventDefault();
    this.props.cartAction({
      prod: {id: item.id},
      size: item.size,
      quantity: 0
    });
  };

  render() {
    const title = `${this.props.cartList.length ? 'В вашей корзине:' :
      'В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!'}`;
    return (
      <div className="basket-dropped hidden-panel__basket_visible">
        <div className="basket-dropped__title">
          {title}
        </div>
        <div className="basket-dropped__product-list product-list">
          {this.props.cartList.map((item, i) => {
            return (
              <div key={i} className="product-list__item">
                <Link className="product-list__pic"
                  to={`/category/${item.prod.categoryId}/product/${item.prod.id}`}
                >
                  <img src={item.prod.images[0]} alt={item.prod.title}/>
                </Link>
                <Link className="product-list__product"
                  to={`/category/${item.prod.categoryId}/product/${item.prod.id}`}
                >{item.prod.title}</Link>
                <div className="product-list__fill"/>
                <div className="product-list__price">{item.countPrice}
                  <i className="fa fa-rub"/>
                </div>
                <div className="product-list__delete" onClick={(e) => this.removeProduct(e, item)}>
                  <i className="fa fa-times"/>
                </div>
              </div>
            )
          })}
        </div>
        <Link
          className={`basket-dropped__order-button ${this.props.cartList.length ? 'active' : ''}`}
          to='/order'
          onClick={this.props.orderBtnHandler}
        >Оформить заказ</Link>
      </div>
    );
  }
}
